'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const API_URL = "http://localhost:4000/tutors"

export async function getTutors() {
  const res = await fetch(API_URL, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch tutors')
  }
  return res.json()
}

export async function getTutorById(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch tutor')
  }
  return res.json()
}

export async function createTutor(formData: FormData) {
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    hourly_rate: Number(formData.get('hourly_rate')) || 0,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to create tutor: ${err.error || res.statusText}`)
  }

  revalidatePath("/admin/tutors")
  redirect("/admin/tutors")
}

export async function updateTutor(id: string, formData: FormData) {
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    hourly_rate: Number(formData.get('hourly_rate')) || 0,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to update tutor: ${err.error || res.statusText}`)
  }

  revalidatePath("/admin/tutors")
  revalidatePath(`/admin/tutors/${id}`)
  redirect("/admin/tutors")
}

export async function deleteTutor(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete tutor')
  }

  revalidatePath("/admin/tutors")
}
