import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateTutor, getTutorById } from "@/lib/actions/tutors"
import Link from "next/link"

export default async function EditTutorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tutor = await getTutorById(id)
  
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" name="first_name" defaultValue={tutor.first_name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" name="last_name" defaultValue={tutor.last_name} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={tutor.email} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={tutor.phone} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" defaultValue={tutor.subject} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
            <Input id="hourly_rate" name="hourly_rate" type="number" step="0.01" min="0" defaultValue={tutor.hourly_rate} required />
          </div>
          <div className="space-y-2 flex flex-col justify-center pt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="is_active" className="w-4 h-4 rounded border-gray-300" defaultChecked={tutor.is_active} />
              <span className="text-sm font-medium">Active Tutor</span>
            </label>
          </div>
        </div>
        <Button type="submit">Update Tutor</Button>
      </form>
    </div>
  )
}
