import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '@/lib/actions/students'
import { mockSupabaseClient } from '../mocks/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

describe('Students Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default setup
    mockSupabaseClient._mocks.mockFrom.mockReturnThis()
    mockSupabaseClient._mocks.mockSelect.mockReturnThis()
    mockSupabaseClient._mocks.mockEq.mockReturnThis()
    mockSupabaseClient._mocks.mockSingle.mockReturnThis()
  })

  describe('getStudents', () => {
    it('returns an array of students', async () => {
      const mockStudents = [{ id: '1', name: 'John' }]
      // Fix our generic mock for just this test where select returns the data directly
      mockSupabaseClient._mocks.mockSelect.mockResolvedValueOnce({ data: mockStudents, error: null })
      
      const result = await getStudents()
      expect(result).toEqual(mockStudents)
      expect(mockSupabaseClient._mocks.mockFrom).toHaveBeenCalledWith('students')
    })

    it('throws error if supabase fails', async () => {
      mockSupabaseClient._mocks.mockSelect.mockResolvedValueOnce({ data: null, error: { message: 'DB Error' } })
      await expect(getStudents()).rejects.toThrow('DB Error')
    })
  })

  describe('getStudentById', () => {
    it('returns a single student by id', async () => {
      const mockStudent = { id: '123', name: 'John' }
      mockSupabaseClient._mocks.mockSingle.mockResolvedValueOnce({ data: mockStudent, error: null })
      
      const result = await getStudentById('123')
      
      expect(mockSupabaseClient._mocks.mockEq).toHaveBeenCalledWith('id', '123')
      expect(result).toEqual(mockStudent)
    })
  })

  describe('createStudent', () => {
    it('inserts a new student and redirects', async () => {
      const formData = new FormData()
      formData.append('first_name', 'Alice')
      formData.append('last_name', 'Smith')
      formData.append('email', 'alice@test.com')
      
      mockSupabaseClient._mocks.mockInsert.mockResolvedValueOnce({ error: null })
      
      await createStudent(formData)
      
      expect(mockSupabaseClient._mocks.mockInsert).toHaveBeenCalledWith([{
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@test.com',
        phone: null,
      }])
      expect(revalidatePath).toHaveBeenCalledWith('/admin/students')
      expect(redirect).toHaveBeenCalledWith('/admin/students')
    })
  })

  describe('updateStudent', () => {
    it('updates existing student and revalidates paths', async () => {
      const formData = new FormData()
      formData.append('first_name', 'Bob')
      
      mockSupabaseClient._mocks.mockUpdate.mockReturnThis()
      mockSupabaseClient._mocks.mockEq.mockResolvedValueOnce({ error: null })
      
      await updateStudent('student-123', formData)
      
      expect(mockSupabaseClient._mocks.mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
        first_name: 'Bob'
      }))
      expect(mockSupabaseClient._mocks.mockEq).toHaveBeenCalledWith('id', 'student-123')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/students')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/students/student-123')
    })
  })

  describe('deleteStudent', () => {
    it('deletes student by id and revalidates', async () => {
      mockSupabaseClient._mocks.mockDelete.mockReturnThis()
      mockSupabaseClient._mocks.mockEq.mockResolvedValueOnce({ error: null })
      
      await deleteStudent('student-456')
      
      expect(mockSupabaseClient._mocks.mockDelete).toHaveBeenCalled()
      expect(mockSupabaseClient._mocks.mockEq).toHaveBeenCalledWith('id', 'student-456')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/students')
    })
  })
})
