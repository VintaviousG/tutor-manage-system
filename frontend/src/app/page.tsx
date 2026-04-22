import { getStudents } from "@/lib/actions/students"
import { getTutors } from "@/lib/actions/tutors"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, BookOpen, ShieldCheck } from "lucide-react"

export default async function Home() {
  const [students, tutors] = await Promise.all([
    getStudents(),
    getTutors()
  ])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-20 px-4">
      <div className="max-w-4xl w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-900 dark:text-zinc-50">
            Tutor Management Portal
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Select your role to view your dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Admin Role Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Administrator</CardTitle>
              <CardDescription>Manage all users and sessions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="w-full">
                <Link href="/admin">Enter Admin Portal</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Student Role Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-blue-500/10 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <User className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle>Students</CardTitle>
              <CardDescription>Select a student profile</CardDescription>
            </CardHeader>
            <CardContent>
              {students && students.length > 0 ? (
                <div className="flex flex-col space-y-3">
                  {students.slice(0, 5).map((student: any) => (
                    <Button key={student.id} variant="outline" asChild className="justify-start">
                      <Link href={`/student/${student.id}`}>
                        {student.first_name} {student.last_name}
                      </Link>
                    </Button>
                  ))}
                  {students.length > 5 && (
                    <div className="text-xs text-center text-muted-foreground pt-2">
                      + {students.length - 5} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-center text-muted-foreground p-4 bg-muted/50 rounded-md">
                  No students found
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tutor Role Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-green-500/10 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle>Tutors</CardTitle>
              <CardDescription>Select a tutor profile</CardDescription>
            </CardHeader>
            <CardContent>
              {tutors && tutors.length > 0 ? (
                <div className="flex flex-col space-y-3">
                  {tutors.slice(0, 5).map((tutor: any) => (
                    <Button key={tutor.id} variant="outline" asChild className="justify-start">
                      <Link href={`/tutor/${tutor.id}`}>
                        {tutor.first_name} {tutor.last_name}
                      </Link>
                    </Button>
                  ))}
                  {tutors.length > 5 && (
                    <div className="text-xs text-center text-muted-foreground pt-2">
                      + {tutors.length - 5} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-center text-muted-foreground p-4 bg-muted/50 rounded-md">
                  No tutors found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-10" />

        <div className="text-center text-sm text-muted-foreground">
          <p>This is a demonstration portal for the Tutor Management System.</p>
          <p>In a production application, this would be a unified login page.</p>
        </div>
      </div>
    </div>
  )
}
