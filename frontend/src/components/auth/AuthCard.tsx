'use client'

import { useActionState, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { login, signup } from '@/lib/actions/auth'

type AuthCardProps = {
  role: 'student' | 'tutor'
  title: string
  description: string
  icon: React.ReactNode
}

export function AuthCard({ role, title, description, icon }: AuthCardProps) {
  const loginAction = login.bind(null, role)
  const signupAction = signup.bind(null, role)

  const [loginState, formLoginAction, isLoginPending] = useActionState(loginAction, { error: null })
  const [signupState, formSignupAction, isSignupPending] = useActionState(signupAction, { error: null })

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-zinc-200 dark:border-zinc-800 flex flex-col h-full">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto bg-muted p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form action={formLoginAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${role}-login-email`}>Email</Label>
                <Input id={`${role}-login-email`} name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${role}-login-password`}>Password</Label>
                <Input id={`${role}-login-password`} name="password" type="password" required />
              </div>
              
              {loginState.error && (
                <div className="text-sm text-red-500 font-medium">{loginState.error}</div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoginPending}>
                {isLoginPending ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form action={formSignupAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${role}-signup-fn`}>First Name</Label>
                  <Input id={`${role}-signup-fn`} name="first_name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${role}-signup-ln`}>Last Name</Label>
                  <Input id={`${role}-signup-ln`} name="last_name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`${role}-signup-email`}>Email</Label>
                <Input id={`${role}-signup-email`} name="email" type="email" required placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${role}-signup-phone`}>Phone (optional)</Label>
                <Input id={`${role}-signup-phone`} name="phone" type="tel" />
              </div>
              
              {role === 'tutor' && (
                <div className="space-y-2">
                  <Label htmlFor={`${role}-signup-subject`}>Subject Focus</Label>
                  <Input id={`${role}-signup-subject`} name="subject" placeholder="e.g. Mathematics" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor={`${role}-signup-password`}>Password</Label>
                <Input id={`${role}-signup-password`} name="password" type="password" required minLength={6} />
              </div>

              {signupState.error && (
                <div className="text-sm text-red-500 font-medium">{signupState.error}</div>
              )}

              <Button type="submit" className="w-full" disabled={isSignupPending}>
                {isSignupPending ? 'Signing up...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
