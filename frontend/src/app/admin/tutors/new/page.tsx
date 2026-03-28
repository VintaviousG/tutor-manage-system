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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" name="first_name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" name="last_name" placeholder="Doe" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="(555) 123-4567" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Mathematics" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
            <Input id="hourly_rate" name="hourly_rate" type="number" step="0.01" min="0" placeholder="25.00" required />
          </div>
          <div className="space-y-2 flex flex-col justify-center pt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="is_active" className="w-4 h-4 rounded border-gray-300" defaultChecked />
              <span className="text-sm font-medium">Active Tutor</span>
            </label>
          </div>
        </div>
        <Button type="submit">Create Tutor</Button>
      </form>
    </div>
  )
}
