import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/admin/DataTable"
import { columns } from "./columns"
import { getStudents } from "@/lib/actions/students"

export default async function StudentsPage() {
  const students = await getStudents()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        <Button asChild>
          <Link href="/admin/students/new">Add Student</Link>
        </Button>
      </div>
      <div className="rounded-md border p-4">
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  )
}
