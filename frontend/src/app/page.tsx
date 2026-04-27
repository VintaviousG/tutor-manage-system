import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, BookOpen, ShieldCheck } from "lucide-react"
import { AuthCard } from "@/components/auth/AuthCard"

export default async function Home() {

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
          <AuthCard 
            role="student" 
            title="Students" 
            description="Login or sign up as a student" 
            icon={<User className="w-8 h-8 text-blue-500" />} 
          />

          {/* Tutor Role Card */}
          <AuthCard 
            role="tutor" 
            title="Tutors" 
            description="Login or sign up as a tutor" 
            icon={<BookOpen className="w-8 h-8 text-green-500" />} 
          />
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
