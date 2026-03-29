import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSession } from "@/lib/actions/sessions"
import { getStudents } from "@/lib/actions/students"
import { getTutors } from "@/lib/actions/tutors"
import Link from "next/link"

export default async function NewSessionPage() {
  const [students, tutors] = await Promise.all([
    getStudents(),
    getTutors(),
  ])

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">New Session</h2>
        <Button variant="outline" asChild>
          <Link href="/admin/sessions">Cancel</Link>
        </Button>
      </div>
      <form action={createSession} className="space-y-4 rounded-md border p-6 bg-card">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="student_id">Assign Student</Label>
            <select
              id="student_id"
              name="student_id"
              required
              defaultValue=""
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select a student...</option>
              {students.map((student: any) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name} ({student.email})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tutor_id">Assign Tutor</Label>
            <select
              id="tutor_id"
              name="tutor_id"
              required
              defaultValue=""
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select a tutor...</option>
              {tutors.map((tutor: any) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.first_name} {tutor.last_name} ({tutor.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="session_date">Date & Time</Label>
            <Input id="session_date" name="session_date" type="datetime-local" required />
          </div>
          <div className="space-y-2">
             <Label htmlFor="duration">Duration (Minutes)</Label>
             <Input id="duration" name="duration" type="number" min="15" step="15" placeholder="60" defaultValue="60" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            required
            defaultValue="SCHEDULED"
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add any session instructions or notes..."
          ></textarea>
        </div>
        
        <Button type="submit">Create Session</Button>
      </form>
    </div>
  )
}
