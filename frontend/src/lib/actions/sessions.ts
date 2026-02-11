'use server'

import { redirect } from "next/navigation"

export async function getSessions() {
  // TODO: Fetch from backend API
  return []
}

export async function createSession(formData: FormData) {
  // TODO: Post to backend API
  console.log("Creating session", formData)
  redirect("/admin/sessions")
}

export async function updateSession(id: string, formData: FormData) {
  // TODO: Patch to backend API
  console.log("Updating session", id, formData)
  redirect("/admin/sessions")
}
