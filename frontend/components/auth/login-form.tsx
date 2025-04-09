"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().default(false),
})


const ADMIN_EMAIL = "admin@fitzone.com"
const ADMIN_PASSWORD = "admin123"
const USER_EMAIL = "user@fitzone.com"
const USER_PASSWORD = "user123"

function saveToken(currentToken) {
  sessionStorage.setItem("token",currentToken);
}


export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { login } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
  
      const data = await response.json()
  
      if (data.message === "Login successful") {
        if (data.role === "admin") {
          toast({
            title: "Admin login successful!",
            description: "Welcome to the admin dashboard.",
          })
          login({
            id: "admin",
            name: data.name,
            email: values.email,
            membership: "",
            joinDate: "",
            role: "admin",
          })
          saveToken(data.token);
          router.push("/admin")
        } else if (data.role === "user") {
          login({
            id: "user",
            name: data.name,
            email: values.email,
            membership: "",
            joinDate: "",
            role: "user",
          })
          toast({
            title: "Login successful!",
            description: "Welcome back to FitZone.",
          })
          saveToken(data.token);
          router.push("/dashboard")
        } else if (data.role === "staff") {
          toast({
            title: "Login successful!",
            description: "Welcome back to FitZone.",
          })
          login({
            id: "staff",
            name: data.name,
            email: values.email,
            membership: "",
            joinDate: "",
            role: "staff",
          })
          saveToken(data.token);
          router.push("/admin")
        }
      } else {
        toast({
          title: "Login failed!",
          description: "Wrong Credential",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">Login to your account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter your credentials below to access your account</p>
        <div className="mt-3 text-xs text-muted-foreground border-t pt-3">
          <p className="font-medium">Demo Credentials:</p>
          <p>
            Admin: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </p>
          <p>
            User: {USER_EMAIL} / {USER_PASSWORD}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
                </FormItem>
              )}
            />

            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
