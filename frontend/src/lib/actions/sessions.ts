'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabase } from "../supabase"

export async function getSessions() {
  const { data, error } = await supabase.from('sessions').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export async function getSessionById(id: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//get total number of sessions
export async function getTotalSessions() {
  const {count, error} = await supabase.from('sessions').select('*', {count: 'exact'});
  if (error) {
    throw new Error(error.message);
  }
  return count || 0;
}

export async function getSessionsByStudentId(studentId: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .order('session_date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export async function getSessionsByTutorId(tutorId: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('session_date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export async function createSession(formData: FormData) {
  const sessionData = {
    student_id: formData.get('student_id'),
    tutor_id: formData.get('tutor_id'),
    session_date: formData.get('session_date'),
    duration: Number(formData.get('duration')) || 60,
    status: formData.get('status') || 'SCHEDULED',
    notes: formData.get('notes') || '',
  }

  const { error } = await supabase
    .from('sessions')
    .insert([sessionData]);

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`)
  }

  revalidatePath("/admin/sessions")
  redirect("/admin/sessions")
}

export async function updateSession(id: string, formData: FormData) {
  const sessionData = {
    student_id: formData.get('student_id'),
    tutor_id: formData.get('tutor_id'),
    session_date: formData.get('session_date'),
    duration: Number(formData.get('duration')) || 60,
    status: formData.get('status') || 'SCHEDULED',
    notes: formData.get('notes') || '',
  }

  const { error } = await supabase
    .from('sessions')
    .update(sessionData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update session: ${error.message}`)
  }

  revalidatePath("/admin/sessions")
  revalidatePath(`/admin/sessions/${id}`)
  redirect("/admin/sessions")
}

export async function deleteSession(id: string) {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete session: ${error.message}`)
  }

  revalidatePath("/admin/sessions")
}
