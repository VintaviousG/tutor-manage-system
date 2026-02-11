// app/admin/sessions/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Session = {
  id: string
  student_id: string
  tutor_id: string
  subject: string
  date: string
  start_time: string
  end_time: string
  status: string
}

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "student_id",
    header: "Student ID",
  },
  {
    accessorKey: "tutor_id",
    header: "Tutor ID",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]