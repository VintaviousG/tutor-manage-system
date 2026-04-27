import { getStudentById } from "@/lib/actions/students"
import { getSessionsByStudentId } from "@/lib/actions/sessions"
import { getTutors } from "@/lib/actions/tutors"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, User, Mail, Phone, BookOpen, CheckCircle2 } from "lucide-react"
import { logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"

export default async function StudentDashboard({ params }: { params: { id: string } }) {
  // Wait for params to be unpacked in Next.js 15+ async params standard
  const { id } = await Promise.resolve(params);

  const [student, sessions, allTutors] = await Promise.all([
    getStudentById(id),
    getSessionsByStudentId(id),
    getTutors()
  ])

  if (!student) {
    return <div>Student not found.</div>
  }

  // Create a fast lookup map for tutors
  const tutorMap = new Map(allTutors.map((tutor: any) => [tutor.id, tutor]))

  // Separate sessions
  const now = new Date()
  const upcomingSessions = sessions.filter((s: any) => new Date(s.session_date) >= now)
  const pastSessions = sessions.filter((s: any) => new Date(s.session_date) < now)

  const getStatusColor = (status: string) => {
    switch(status.toUpperCase()) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'CANCELED': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }).format(new Date(dateString))
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Overview Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {student.first_name}!</h1>
          <p className="text-muted-foreground mt-1">Here is your tutoring dashboard and upcoming schedule.</p>
        </div>
        <form action={logout}>
          <Button variant="outline" type="submit">Log Out</Button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1 shadow-sm border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Profile Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
               <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-white dark:border-zinc-900 shadow-md flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                  </span>
               </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                 <CheckCircle2 className="h-4 w-4 text-green-500" />
                 <span>Total Sessions: <strong>{sessions.length}</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Listing */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
              <CardDescription>Your next scheduled meetings with tutors.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingSessions.length > 0 ? (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {upcomingSessions.map((session: any) => {
                    const tutor = tutorMap.get(session.tutor_id)
                    return (
                      <div key={session.id} className="p-4 sm:p-6 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div className="flex items-start gap-4">
                           <div className="bg-primary/5 p-3 rounded-xl">
                              <CalendarIcon className="h-6 w-6 text-primary" />
                           </div>
                           <div>
                              <div className="font-semibold text-lg">{tutor ? `${tutor.first_name} ${tutor.last_name}` : 'Unknown Tutor'}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                 <BookOpen className="h-3 w-3" /> {tutor?.subject || 'General'}
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 text-left sm:text-right mt-2 sm:mt-0">
                           <div className="flex items-center gap-1.5 font-medium text-sm">
                             <ClockIcon className="h-4 w-4 text-muted-foreground" />
                             {formatDateTime(session.session_date)}
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="text-xs text-muted-foreground">{session.duration} min</div>
                             <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getStatusColor(session.status)}`}>
                               {session.status}
                             </span>
                           </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                   <CalendarIcon className="h-10 w-10 text-muted-foreground/30 mb-3" />
                   <p>No upcoming sessions scheduled.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Past Sessions List */}
          {pastSessions.length > 0 && (
             <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 opacity-80">
               <CardHeader className="pb-3">
                 <CardTitle className="text-lg">Past Sessions</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {pastSessions.slice(0, 3).map((session: any) => {
                      const tutor = tutorMap.get(session.tutor_id)
                      return (
                        <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                           <div className="flex items-center gap-3">
                              <div className="font-medium text-sm">{tutor ? `${tutor.first_name} ${tutor.last_name}` : 'Unknown'}</div>
                           </div>
                           <div className="text-sm text-muted-foreground flex items-center gap-3">
                              <span>{new Date(session.session_date).toLocaleDateString()}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded border ${getStatusColor(session.status)}`}>
                                 {session.status}
                              </span>
                           </div>
                        </div>
                      )
                    })}
                  </div>
               </CardContent>
             </Card>
          )}

        </div>
      </div>
    </div>
  )
}
