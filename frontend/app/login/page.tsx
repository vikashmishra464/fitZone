"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-md px-4">
          <h1 className="mb-8 text-center text-4xl font-bold">{isLogin ? "Login" : "Register"}</h1>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="mt-4 text-center">
            {isLogin ? (
              <p>
                Don&apos;t have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-primary hover:underline">
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setIsLogin(true)} className="text-primary hover:underline">
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

