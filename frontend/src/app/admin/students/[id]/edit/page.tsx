import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateStudent } from "@/lib/actions/students"
import Link from "next/link"

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Student</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/students">Cancel</Link>
        </Button>
      </div>
      <form
        action={updateStudent.bind(null, id)}
        className="space-y-4 rounded-md border p-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue="Existing Student" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue="student@example.com"
            required
          />
        </div>
        <Button type="submit">Update Student</Button>
      </form>
    </div>
  )
}
