import '@testing-library/jest-dom'
import { vi } from 'vitest'

process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

// Mock Next.js caching and navigation
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    getAll: vi.fn(),
    delete: vi.fn(),
  })),
}))

// We need to ensure Supabase client is mocked globally
vi.mock('@/lib/supabase/server', async (importOriginal) => {
  const { mockSupabaseClient } = await import('./__tests__/mocks/supabase')
  return {
    createClient: vi.fn(() => mockSupabaseClient)
  }
})

vi.mock('@/lib/supabase', async (importOriginal) => {
  const { mockSupabaseClient } = await import('./__tests__/mocks/supabase')
  return {
    supabase: mockSupabaseClient
  }
})
