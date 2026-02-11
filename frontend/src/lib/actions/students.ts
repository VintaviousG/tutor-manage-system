'use server'

import { redirect } from "next/navigation"

export async function getStudents() {
  // TODO: Fetch from backend API
  const res = await fetch("http://localhost:4000/students")
  const data = await res.json()
  return data
}

export async function createStudent(formData: FormData) {
  // TODO: Post to backend API
  console.log("Creating student", formData)
  redirect("/admin/students")
}

export async function updateStudent(id: string, formData: FormData) {
  // TODO: Patch to backend API
  console.log("Updating student", id, formData)
  redirect("/admin/students")
}
