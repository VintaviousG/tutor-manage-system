import { vi } from 'vitest'

// Create a generic mock builder for the supabase client
export const createMockSupabaseClient = () => {
  const mockFrom = vi.fn().mockReturnThis()
  const mockSelect = vi.fn().mockReturnThis()
  const mockInsert = vi.fn().mockReturnThis()
  const mockUpdate = vi.fn().mockReturnThis()
  const mockDelete = vi.fn().mockReturnThis()
  const mockEq = vi.fn().mockReturnThis()
  const mockSingle = vi.fn().mockReturnThis()
  
  const mockSignInWithPassword = vi.fn()
  const mockSignUp = vi.fn()
  const mockSignOut = vi.fn()

  return {
    from: mockFrom,
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    eq: mockEq,
    single: mockSingle,
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
    },
    // We can expose these to make assertions easier in tests
    _mocks: {
      mockFrom,
      mockSelect,
      mockInsert,
      mockUpdate,
      mockDelete,
      mockEq,
      mockSingle,
      mockSignInWithPassword,
      mockSignUp,
      mockSignOut,
    }
  }
}

// A singleton instance we can use for standard client mocking
export const mockSupabaseClient = createMockSupabaseClient()

