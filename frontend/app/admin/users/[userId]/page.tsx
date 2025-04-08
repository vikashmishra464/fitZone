"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Loader2, ArrowLeft, Edit, Trash2, Mail, Calendar, CreditCard, Activity } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { members } from "@/data/members"
import { staff } from "@/data/staff"
import { payments } from "@/data/payments"

// Combine members and staff
const allUsers = [...members.map((member) => ({ ...member, role: "member" })), ...staff]

export default function UserDetailsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [userPayments, setUserPayments] = useState<any[]>([])
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const userId = params.userId as string

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      } else {
        // Find the user
        const foundUser = allUsers.find((u) => u.id === userId)
        if (foundUser) {
          setUserData(foundUser)

          // Find user payments if they exist
          if (foundUser.role === "member") {
            const userPaymentHistory = payments.filter((payment) => payment.memberEmail === foundUser.email)
            setUserPayments(userPaymentHistory)
          }
        } else {
          toast({
            title: "User not found",
            description: "The user you're looking for doesn't exist.",
            variant: "destructive",
          })
          router.push("/admin/users")
        }
        setIsLoading(false)
      }
    }
  }, [user, loading, router, userId, toast])

  const handleDeleteUser = () => {
    if (confirm(`Are you sure you want to delete ${userData.name}?`)) {
      toast({
        title: "User deleted",
        description: `${userData.name} has been deleted successfully.`,
      })
      router.push("/admin/users")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8 flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">User Details</h1>
            </div>

            <div className="mb-8 flex flex-col items-start gap-6 md:flex-row">
              <Card className="w-full md:w-1/3">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={userData.name} />
                      <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                    <Badge
                      variant={
                        userData.role === "admin" ? "default" : userData.role === "trainer" ? "secondary" : "outline"
                      }
                      className="mt-2"
                    >
                      {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                    </Badge>
                    <div className="mt-4 flex w-full gap-2">
                      <Button className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" className="flex-1" onClick={handleDeleteUser}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>User details and account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{userData.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={userData.status === "active" ? "success" : "destructive"} className="mt-1">
                      {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                    </Badge>
                  </div>

                  {userData.role === "member" && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Membership Plan</p>
                        <p className="font-medium">{userData.plan || "Basic"}</p>
                      </div>
                    </>
                  )}

                  {userData.role === "trainer" && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Specialization</p>
                        <p className="font-medium">{userData.specialization}</p>
                      </div>
                    </>
                  )}

                  {userData.role === "staff" && userData.department && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{userData.department}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                {userData.role === "member" && <TabsTrigger value="payments">Payments</TabsTrigger>}
                {userData.role === "trainer" && <TabsTrigger value="classes">Classes</TabsTrigger>}
              </TabsList>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>User's recent actions and attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.role === "member" ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Attended Yoga Class</p>
                              <p className="text-sm text-muted-foreground">Yesterday at 10:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Attended HIIT Workout</p>
                              <p className="text-sm text-muted-foreground">3 days ago at 5:30 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CreditCard className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Renewed Membership</p>
                              <p className="text-sm text-muted-foreground">1 week ago</p>
                            </div>
                          </div>
                        </>
                      ) : userData.role === "trainer" ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Conducted Yoga Class</p>
                              <p className="text-sm text-muted-foreground">Today at 10:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Updated Class Schedule</p>
                              <p className="text-sm text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Updated Member Information</p>
                              <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Activity className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Processed Membership Renewal</p>
                              <p className="text-sm text-muted-foreground">3 days ago</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {userData.role === "member" && (
                <TabsContent value="payments" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>User's payment transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userPayments.length > 0 ? (
                        <div className="space-y-4">
                          {userPayments.map((payment) => (
                            <div key={payment.id} className="flex items-start justify-between rounded-md border p-4">
                              <div>
                                <p className="font-medium">{payment.plan} Plan</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(payment.date).toLocaleDateString()}
                                </p>
                                <Badge
                                  variant={
                                    payment.status === "successful"
                                      ? "success"
                                      : payment.status === "failed"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className="mt-2"
                                >
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="font-bold">${payment.amount.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">No payment history available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {userData.role === "trainer" && (
                <TabsContent value="classes" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Classes</CardTitle>
                      <CardDescription>Classes taught by this trainer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{userData.specialization}</p>
                              <p className="text-sm text-muted-foreground">Monday, Wednesday, Friday at 10:00 AM</p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </div>
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Beginner {userData.specialization}</p>
                              <p className="text-sm text-muted-foreground">Tuesday, Thursday at 2:00 PM</p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
