'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabase } from "../supabase"

export async function getStudents() {
  const { data, error } = await supabase.from('students').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export async function getStudentById(id: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createStudent(formData: FormData) {
  const studentData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  }

  const { error } = await supabase
    .from('students')
    .insert([studentData]);

  if (error) {
    throw new Error(`Failed to create student: ${error.message}`)
  }

  revalidatePath("/admin/students")
  redirect("/admin/students")
}

export async function updateStudent(id: string, formData: FormData) {
  const studentData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  }

  const { error } = await supabase
    .from('students')
    .update(studentData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update student: ${error.message}`)
  }

  revalidatePath("/admin/students")
  revalidatePath(`/admin/students/${id}`)
  redirect("/admin/students")
}

export async function deleteStudent(id: string) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete student: ${error.message}`)
  }

  revalidatePath("/admin/students")
}
