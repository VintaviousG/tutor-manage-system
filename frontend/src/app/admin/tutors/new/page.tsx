import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTutor } from "@/lib/actions/tutors"
import Link from "next/link"

export default function NewTutorPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">New Tutor</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/tutors">Cancel</Link>
        </Button>
      </div>
      <form action={createTutor} className="space-y-4 rounded-md border p-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Jane Smith" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Mathematics" required />
        </div>
        <Button type="submit">Create Tutor</Button>
      </form>
    </div>
  )
}
