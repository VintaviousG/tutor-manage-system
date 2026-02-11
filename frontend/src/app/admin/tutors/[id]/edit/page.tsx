import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateTutor } from "@/lib/actions/tutors"
import Link from "next/link"

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Tutor</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/tutors">Cancel</Link>
        </Button>
      </div>
      <form
        action={updateTutor.bind(null, id)}
        className="space-y-4 rounded-md border p-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue="Existing Tutor" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" defaultValue="Physics" required />
        </div>
        <Button type="submit">Update Tutor</Button>
      </form>
    </div>
  )
}
