import { cn } from '@/components/lib/utils/utils'
// import { createClient } from '@/components/lib/supabase/client'
import { supabase } from "../lib/supabase/client";

import { Button } from '@/components/loginForm/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/loginForm/ui/card'
import { Input } from '@/components/loginForm/ui/input'
import { Label } from '@/components/loginForm/ui/label'
import { useState } from 'react'


export function LoginForm({
  className,
  setAuthStep,
  onClose,
  ...props
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const supabase = createClient() not needed anymore as supabase const is directly imported

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
      // Edit: this is an authenticated route(just need to add some logic), but the token needs to be stored privately by supabase, and the numbers and letters I see in other links when logged in is just the id of some object, my id or a game id.
      location.href = '/app'
      onClose?.();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
       <Card className="shadow-2xl border-2 border-white/30 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
          <span className="text-gray-600 text-lg">×</span>
        </button>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Welcome! Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <p
                    // href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => {setAuthStep("forgotPassword")}}>
                    Forgot your password?
                  </p>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-base">
              Don&apos;t have an account?{' '}
              <span className="underline underline-offset-4 cursor-pointer text-purple-600 hover:text-purple-700 font-semibold" onClick={() => {setAuthStep("signUp")}}>
                Sign up
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
