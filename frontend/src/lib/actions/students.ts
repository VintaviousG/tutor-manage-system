'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const API_URL = "http://localhost:4000/students"

export async function getStudents() {
  const res = await fetch(API_URL, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch students')
  }
  return res.json()
}

export async function getStudentById(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch student')
  }
  return res.json()
}

export async function createStudent(formData: FormData) {
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    status: 'active'
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to create student')
  }

  revalidatePath("/admin/students")
  redirect("/admin/students")
}

export async function updateStudent(id: string, formData: FormData) {
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to update student')
  }

  revalidatePath("/admin/students")
  revalidatePath(`/admin/students/${id}`)
  redirect("/admin/students")
}

export async function deleteStudent(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete student')
  }

  revalidatePath("/admin/students")
}
