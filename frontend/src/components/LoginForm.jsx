const BASE_API = import.meta.env.VITE_BASE_API

import { useState } from "react"
import axios from "axios"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import collegePhoto from "../assets/college.jpg"

export function LoginForm({ className, ...props }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      const res = await axios.post(
        `${BASE_API}api/v1/auth/login`,
        {
          email,
          password
        }
      )

      const { token, user } = res.data

      console.log(res.data)

      // store auth
      localStorage.setItem("token", token)
      localStorage.setItem("role", user.role)
      localStorage.setItem("user", JSON.stringify(user))

      // redirect based on role
      window.location.href = "/"

    } catch (err) {

      setError(
        err.response?.data?.message || "Login failed"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          <div className="bg-muted relative hidden md:block">
            <img
              src={collegePhoto}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <FieldGroup>

              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">
                  Login to your account
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error}
                </p>
              )}

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-700 w-full"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Admission Management System
                email: institute@admin.com | password : root123
              </FieldDescription>

            </FieldGroup>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}