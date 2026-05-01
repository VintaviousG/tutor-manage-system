'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "../supabase/server"

export async function getTutors() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export async function getTutorById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tutors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//get total number of tutors
export async function getTotalTutors() {
  const supabase = await createClient();
  const   {count, error} = await supabase.from('tutors').select('*', {count: 'exact'});
  if (error) {
    throw new Error(error.message);
  }
  return count || 0;
}

export async function createTutor(formData: FormData) {
  const supabase = await createClient();
  const tutorData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    hourly_rate: Number(formData.get('hourly_rate')) || 0,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  }

  const { error } = await supabase
    .from('tutors')
    .insert([tutorData]);

  if (error) {
    throw new Error(`Failed to create tutor: ${error.message}`)
  }

  revalidatePath("/admin/tutors")
  redirect("/admin/tutors")
}

export async function updateTutor(id: string, formData: FormData) {
  const supabase = await createClient();
  const tutorData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    hourly_rate: Number(formData.get('hourly_rate')) || 0,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  }

  const { error } = await supabase
    .from('tutors')
    .update(tutorData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update tutor: ${error.message}`)
  }

  revalidatePath("/admin/tutors")
  revalidatePath(`/admin/tutors/${id}`)
  redirect("/admin/tutors")
}

export async function deleteTutor(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tutors')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete tutor: ${error.message}`)
  }

  revalidatePath("/admin/tutors")
}
