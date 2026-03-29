"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteSession } from "@/lib/actions/sessions"

export type Session = {
  id: string
  student_id: string
  tutor_id: string
  session_date: string
  duration: number
  status: string
  notes: string
}

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "student_id",
    header: "Student ID",
    cell: ({ row }) => {
      const id = row.getValue("student_id") as string
      return <div className="text-xs text-muted-foreground">{id?.slice(0, 8)}...</div>
    }
  },
  {
    accessorKey: "tutor_id",
    header: "Tutor ID",
    cell: ({ row }) => {
      const id = row.getValue("tutor_id") as string
      return <div className="text-xs text-muted-foreground">{id?.slice(0, 8)}...</div>
    }
  },
  {
    accessorKey: "session_date",
    header: "Date & Time",
    cell: ({ row }) => {
      const dateStr = row.getValue("session_date") as string
      if (!dateStr) return null
      const date = new Date(dateStr)
      return <div className="font-medium whitespace-nowrap">{date.toLocaleString()}</div>
    }
  },
  {
    accessorKey: "duration",
    header: "Duration (min)",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      if (status === 'SCHEDULED') colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      if (status === 'COMPLETED') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      if (status === 'CANCELLED') colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
          {status}
        </span>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const session = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/sessions/${session.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/sessions/${session.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Session
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
               className="text-destructive focus:bg-destructive/10 cursor-pointer"
               onClick={() => {
                 if(confirm("Are you sure you want to delete this session?")) {
                    deleteSession(session.id)
                 }
               }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]