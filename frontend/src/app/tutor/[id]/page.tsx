import { getTutorById } from "@/lib/actions/tutors"
import { getSessionsByTutorId } from "@/lib/actions/sessions"
import { getStudents } from "@/lib/actions/students"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, User, Mail, Phone, BookOpen, DollarSign, Activity } from "lucide-react"

export default async function TutorDashboard({ params }: { params: { id: string } }) {
  // Wait for params to be unpacked in Next.js 15+ async params standard
  const { id } = await Promise.resolve(params);

  const [tutor, sessions, allStudents] = await Promise.all([
    getTutorById(id),
    getSessionsByTutorId(id),
    getStudents()
  ])

  if (!tutor) {
    return <div>Tutor not found.</div>
  }

  // Create a fast lookup map for students
  const studentMap = new Map(allStudents.map((student: any) => [student.id, student]))

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
          <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your sessions, {tutor.first_name}.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1 shadow-sm border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" /> Tutor Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
               <div className="h-24 w-24 rounded-full bg-green-500/10 border-4 border-white dark:border-zinc-900 shadow-md flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {tutor.first_name.charAt(0)}{tutor.last_name.charAt(0)}
                  </span>
               </div>
            </div>
            
            <div className="text-center pb-4">
               <h3 className="font-semibold text-lg">{tutor.first_name} {tutor.last_name}</h3>
               <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mt-2">
                  <Activity className="w-3 h-3" /> {tutor.is_active ? 'Active' : 'Inactive'}
               </span>
            </div>

            <div className="space-y-3 test-sm pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><BookOpen className="h-4 w-4" /> Subject</div>
                <span className="font-medium">{tutor.subject}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><DollarSign className="h-4 w-4" /> Rate</div>
                <span className="font-medium">${tutor.hourly_rate}/hr</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><Mail className="h-4 w-4" /> Email</div>
                <span className="font-medium truncate max-w-[120px]" title={tutor.email}>{tutor.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Listing */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="text-xl">Student Appointments</CardTitle>
              <CardDescription>Your upcoming tutoring sessions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingSessions.length > 0 ? (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {upcomingSessions.map((session: any) => {
                    const student = studentMap.get(session.student_id)
                    return (
                      <div key={session.id} className="p-4 sm:p-6 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div className="flex items-start gap-4">
                           <div className="bg-green-500/10 p-3 rounded-xl">
                              <User className="h-6 w-6 text-green-600" />
                           </div>
                           <div>
                              <div className="font-semibold text-lg">{student ? `${student.first_name} ${student.last_name}` : 'Unknown Student'}</div>
                              {session.notes && (
                                <div className="text-sm text-muted-foreground mt-1 max-w-sm line-clamp-1">
                                   Notes: {session.notes}
                                </div>
                              )}
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
                 <CardTitle className="text-lg">History</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {pastSessions.slice(0, 3).map((session: any) => {
                      const student = studentMap.get(session.student_id)
                      return (
                        <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                           <div className="flex items-center gap-3">
                              <div className="font-medium text-sm">{student ? `${student.first_name} ${student.last_name}` : 'Unknown'}</div>
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
