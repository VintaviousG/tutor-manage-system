'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const API_URL = "http://localhost:4000/sessions"

export async function getSessions() {
  const res = await fetch(API_URL, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch sessions')
  }
  return res.json()
}

export async function getSessionById(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch session')
  }
  return res.json()
}

export async function createSession(formData: FormData) {
  const data = {
    student_id: formData.get('student_id'),
    tutor_id: formData.get('tutor_id'),
    session_date: formData.get('session_date'),
    duration: Number(formData.get('duration')) || 60,
    status: formData.get('status') || 'SCHEDULED',
    notes: formData.get('notes') || '',
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
    throw new Error(`Failed to create session: ${err.error || res.statusText}`)
  }

  revalidatePath("/admin/sessions")
  redirect("/admin/sessions")
}

export async function updateSession(id: string, formData: FormData) {
  const data = {
    student_id: formData.get('student_id'),
    tutor_id: formData.get('tutor_id'),
    session_date: formData.get('session_date'),
    duration: Number(formData.get('duration')) || 60,
    status: formData.get('status') || 'SCHEDULED',
    notes: formData.get('notes') || '',
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
    throw new Error(`Failed to update session: ${err.error || res.statusText}`)
  }

  revalidatePath("/admin/sessions")
  revalidatePath(`/admin/sessions/${id}`)
  redirect("/admin/sessions")
}

export async function deleteSession(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete session')
  }

  revalidatePath("/admin/sessions")
}
