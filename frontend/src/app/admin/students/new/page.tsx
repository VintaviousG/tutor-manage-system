import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createStudent } from "@/lib/actions/students"
import Link from "next/link"

export default function NewStudentPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">New Student</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/students">Cancel</Link>
        </Button>
      </div>
      <form action={createStudent} className="space-y-4 rounded-md border p-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
        </div>
        <Button type="submit">Create Student</Button>
      </form>
    </div>
  )
}
