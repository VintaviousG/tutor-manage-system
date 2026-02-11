import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/admin/DataTable"
import { columns } from "./columns"
import { getTutors } from "@/lib/actions/tutors"

export default async function TutorsPage() {
  const tutors = await getTutors()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tutors</h2>
        <Button asChild>
          <Link href="/admin/tutors/new">Add Tutor</Link>
        </Button>
      </div>
      <div className="rounded-md border p-4">
        <DataTable columns={columns} data={tutors} />
      </div>
    </div>
  )
}
