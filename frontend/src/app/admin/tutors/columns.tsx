// app/admin/tutors/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Tutor = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  subject: string
  status: string
}

export const columns: ColumnDef<Tutor>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]