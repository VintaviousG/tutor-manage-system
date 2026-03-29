import { Button } from "@/components/ui/button"
import { getSessionById } from "@/lib/actions/sessions"
import { getStudentById } from "@/lib/actions/students"
import { getTutorById } from "@/lib/actions/tutors"
import Link from "next/link"

export default async function ViewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getSessionById(id)
  
  // Safely fetch relation names if possible
  let studentDetails = null
  let tutorDetails = null
  try {
     if(session.student_id) studentDetails = await getStudentById(session.student_id);
     if(session.tutor_id) tutorDetails = await getTutorById(session.tutor_id);
  } catch(e) { /* Ignore fetch errors if IDs are broken */ }

  const studentDisplay = studentDetails ? `${studentDetails.first_name} ${studentDetails.last_name}` : session.student_id
  const tutorDisplay = tutorDetails ? `${tutorDetails.first_name} ${tutorDetails.last_name}` : session.tutor_id
  
  let colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  if (session.status === 'scheduled') colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  if (session.status === 'completed') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  if (session.status === 'cancelled') colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Session Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/sessions/${id}/edit`}>Edit Session</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/sessions">Back</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-6 space-y-6 bg-card">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned Student</h3>
            <p className="text-lg font-medium mt-1">{studentDisplay}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned Tutor</h3>
            <p className="text-lg font-medium mt-1">{tutorDisplay}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
            <p className="text-lg mt-1 whitespace-nowrap">{session.session_date ? new Date(session.session_date).toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
            <p className="text-lg mt-1">{session.duration} minutes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="text-lg mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${colorClass}`}>
                {session.status}
              </span>
            </p>
          </div>
          <div>
             <h3 className="text-sm font-medium text-muted-foreground">Session ID</h3>
             <p className="text-sm text-muted-foreground mt-2 break-all">{session.id}</p>
          </div>
        </div>

        {session.notes && (
           <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="text-md mt-2 whitespace-pre-wrap">{session.notes}</p>
           </div>
        )}

      </div>
    </div>
  )
}
