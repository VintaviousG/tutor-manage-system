import { describe, it, expect, beforeEach, vi } from 'vitest'
import { login, signup, logout } from '@/lib/actions/auth'
import { mockSupabaseClient } from '../mocks/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// We need to mock next/cache and next/navigation at the top level
// This is handled by vitest.setup.ts, so we can just assert on them.

describe('Auth Actions', () => {
  let formData: FormData

  beforeEach(() => {
    vi.clearAllMocks()
    formData = new FormData()
    
    // Default chain setup for successful queries
    mockSupabaseClient._mocks.mockSingle.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    mockSupabaseClient._mocks.mockEq.mockReturnThis()
    mockSupabaseClient._mocks.mockSelect.mockReturnThis()
    mockSupabaseClient._mocks.mockFrom.mockReturnThis()
    mockSupabaseClient._mocks.mockInsert.mockResolvedValue({ error: null })
  })

  describe('login', () => {
    it('returns error if email or password are missing', async () => {
      const result = await login('student', { error: null }, formData)
      expect(result).toEqual({ error: 'Email and password are required.' })
    })

    it('returns error if signInWithPassword fails', async () => {
      formData.append('email', 'test@test.com')
      formData.append('password', 'password123')
      
      mockSupabaseClient._mocks.mockSignInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' }
      })

      const result = await login('student', { error: null }, formData)
      expect(result).toEqual({ error: 'Invalid login credentials' })
    })

    it('signs out and returns error if profile is not found', async () => {
      formData.append('email', 'test@test.com')
      formData.append('password', 'password123')
      
      mockSupabaseClient._mocks.mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: 'auth-id' } },
        error: null
      })
      
      mockSupabaseClient._mocks.mockSingle.mockResolvedValue({ data: null, error: { message: 'Not found' } })

      const result = await login('student', { error: null }, formData)
      
      expect(mockSupabaseClient._mocks.mockSignOut).toHaveBeenCalled()
      expect(result).toEqual({ error: 'No student profile found for this email address.' })
    })

    it('redirects to student dashboard on successful login', async () => {
      formData.append('email', 'test@test.com')
      formData.append('password', 'password123')
      
      mockSupabaseClient._mocks.mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: 'auth-id' } },
        error: null
      })
      
      mockSupabaseClient._mocks.mockSingle.mockResolvedValue({ data: { id: 'student-id' }, error: null })

      await login('student', { error: null }, formData)
      
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
      expect(redirect).toHaveBeenCalledWith('/student/student-id')
    })
  })

  describe('signup', () => {
    it('returns error if required fields are missing', async () => {
      const result = await signup('student', { error: null }, formData)
      expect(result).toEqual({ error: 'Missing required fields.' })
    })

    it('creates a new student profile correctly', async () => {
      formData.append('email', 'test@test.com')
      formData.append('password', 'password123')
      formData.append('first_name', 'John')
      formData.append('last_name', 'Doe')
      formData.append('phone', '1234567890')
      
      // existingProfile check returns nothing
      mockSupabaseClient._mocks.mockSingle.mockResolvedValueOnce({ data: null })
      
      mockSupabaseClient._mocks.mockSignUp.mockResolvedValue({
        data: { user: { id: 'new-auth-id' } },
        error: null
      })

      await signup('student', { error: null }, formData)
      
      expect(mockSupabaseClient._mocks.mockFrom).toHaveBeenCalledWith('students')
      expect(mockSupabaseClient._mocks.mockInsert).toHaveBeenCalledWith({
        id: 'new-auth-id',
        email: 'test@test.com',
        first_name: 'John',
        last_name: 'Doe',
        phone: '1234567890'
      })
      expect(redirect).toHaveBeenCalledWith('/student/new-auth-id')
    })

    it('creates a new tutor profile correctly with defaults', async () => {
      formData.append('email', 'tutor@test.com')
      formData.append('password', 'password123')
      formData.append('first_name', 'Jane')
      formData.append('last_name', 'Smith')
      // No subject provided, testing default 'General'
      
      // existingProfile check returns nothing
      mockSupabaseClient._mocks.mockSingle.mockResolvedValueOnce({ data: null })
      
      mockSupabaseClient._mocks.mockSignUp.mockResolvedValue({
        data: { user: { id: 'tutor-auth-id' } },
        error: null
      })

      await signup('tutor', { error: null }, formData)
      
      expect(mockSupabaseClient._mocks.mockFrom).toHaveBeenCalledWith('tutors')
      expect(mockSupabaseClient._mocks.mockInsert).toHaveBeenCalledWith(expect.objectContaining({
        id: 'tutor-auth-id',
        subject: 'General',
        is_active: true,
        hourly_rate: 0
      }))
      expect(redirect).toHaveBeenCalledWith('/tutor/tutor-auth-id')
    })
  })
})
