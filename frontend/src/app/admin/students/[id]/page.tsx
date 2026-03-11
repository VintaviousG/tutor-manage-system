import { Button } from "@/components/ui/button"
import { getStudentById } from "@/lib/actions/students"
import Link from "next/link"

export default async function ViewStudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const student = await getStudentById(id)
  
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Student Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/students/${id}/edit`}>Edit Student</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/students">Back</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-6 space-y-4 bg-card">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
            <p className="text-lg">{student.first_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
            <p className="text-lg">{student.last_name}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p className="text-lg">{student.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
          <p className="text-lg">{student.phone || "N/A"}</p>
        </div>

      </div>
    </div>
  )
}
