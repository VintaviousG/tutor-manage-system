'use server'

import { redirect } from "next/navigation"

export async function getTutors() {
  // TODO: Fetch from backend API
    const res = await fetch("http://localhost:4000/tutors")
  const data = await res.json()
  return data
}

export async function createTutor(formData: FormData) {
  // TODO: Post to backend API
  console.log("Creating tutor", formData)
  redirect("/admin/tutors")
}

export async function updateTutor(id: string, formData: FormData) {
  // TODO: Patch to backend API
  console.log("Updating tutor", id, formData)
  redirect("/admin/tutors")
}
