import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateSession } from "@/lib/actions/sessions"
import Link from "next/link"

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Session</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/sessions">Cancel</Link>
        </Button>
      </div>
      <form
        action={updateSession.bind(null, id)}
        className="space-y-4 rounded-md border p-4"
      >
        <div className="space-y-2">
          <Label htmlFor="student">Student Name</Label>
          <Input id="student" name="student" defaultValue="Existing Student" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tutor">Tutor Name</Label>
          <Input id="tutor" name="tutor" defaultValue="Existing Tutor" required />
        </div>
         <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="datetime-local" required />
        </div>
        <Button type="submit">Update Session</Button>
      </form>
    </div>
  )
}
