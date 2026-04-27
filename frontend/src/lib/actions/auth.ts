'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type FormState = {
  error: string | null;
}

export async function login(role: 'student' | 'tutor', prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Find the user's profile by email instead of auth.users.id to support existing pre-auth users
  const table = role === 'student' ? 'students' : 'tutors'
  
  const { data: roleData, error: roleError } = await supabase
    .from(table)
    .select('id')
    .eq('email', email)
    .single()

  if (roleError || !roleData) {
    // Not found in this role, sign them out
    await supabase.auth.signOut()
    return { error: `No ${role} profile found for this email address.` }
  }

  revalidatePath('/', 'layout')
  redirect(`/${role}/${roleData.id}`)
}

export async function signup(role: 'student' | 'tutor', prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string // for tutors
  
  if (!email || !password || !first_name || !last_name) {
    return { error: 'Missing required fields.' }
  }

  const table = role === 'student' ? 'students' : 'tutors'

  // Check if they already exist in the database
  const { data: existingProfile } = await supabase
    .from(table)
    .select('id')
    .eq('email', email)
    .single()
  
  // 1. Sign up the user in auth.users
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user account.' }
  }

  const userId = authData.user.id
  let profileId = existingProfile?.id;

  // 2. Only create the profile record if they don't already exist
  if (!existingProfile) {
    profileId = userId; // use the auth id for new users
    if (role === 'student') {
      const { error: insertError } = await supabase.from('students').insert({
        id: userId,
        email,
        first_name,
        last_name,
        phone
      })
      
      if (insertError) {
        return { error: `Failed to create student profile: ${insertError.message}` }
      }
    } else if (role === 'tutor') {
      const { error: insertError } = await supabase.from('tutors').insert({
        id: userId,
        email,
        first_name,
        last_name,
        phone,
        subject: subject || 'General',
        is_active: true,
        hourly_rate: 0
      })

      if (insertError) {
        return { error: `Failed to create tutor profile: ${insertError.message}` }
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect(`/${role}/${profileId}`)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}
