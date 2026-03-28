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
import { deleteTutor } from "@/lib/actions/tutors"

export type Tutor = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  subject: string
  hourly_rate: number
  is_active: boolean
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
    accessorKey: "hourly_rate",
    header: "Rate/Hr",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("hourly_rate"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tutor = row.original

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
              <Link href={`/admin/tutors/${tutor.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/tutors/${tutor.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Tutor
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
               className="text-destructive focus:bg-destructive/10 cursor-pointer"
               onClick={() => {
                 if(confirm("Are you sure you want to delete this tutor?")) {
                    deleteTutor(tutor.id)
                 }
               }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete Tutor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]