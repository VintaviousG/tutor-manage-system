import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSession } from "@/lib/actions/sessions"
import Link from "next/link"

export default function NewSessionPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">New Session</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/sessions">Cancel</Link>
        </Button>
      </div>
      <form action={createSession} className="space-y-4 rounded-md border p-4">
        <div className="space-y-2">
          <Label htmlFor="student">Student Name</Label>
          <Input id="student" name="student" placeholder="Student Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tutor">Tutor Name</Label>
          <Input id="tutor" name="tutor" placeholder="Tutor Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="datetime-local" required />
        </div>
        <Button type="submit">Create Session</Button>
      </form>
    </div>
  )
}
