"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Edit, Trash2, Calendar, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { scheduleData } from "@/data/schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  day: z.string().min(1, { message: "Day is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  name: z.string().min(1, { message: "Class name is required." }),
  trainer: z.string().min(1, { message: "Trainer is required." }),
  duration: z.string().min(1, { message: "Duration is required." }),
})

export default function ScheduleManagementPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any>(null)
  const [localSchedule, setLocalSchedule] = useState([...scheduleData])
  const [activeDay, setActiveDay] = useState("Monday")
  const { toast } = useToast()
  const router = useRouter()
  const { user, loading } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: "Monday",
      time: "",
      name: "",
      trainer: "",
      duration: "",
    },
  })

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (user.role !== "admin" && user.role !== "trainer") {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }
  }, [user, loading, router])

  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem)
    form.reset({
      day: classItem.day,
      time: classItem.time,
      name: classItem.name,
      trainer: classItem.trainer,
      duration: classItem.duration,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteClass = (day: string, classId: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      setLocalSchedule(
        localSchedule.map((dayItem) => {
          if (dayItem.day === day) {
            return {
              ...dayItem,
              classes: dayItem.classes.filter((c) => c.id !== classId),
            }
          }
          return dayItem
        }),
      )
      toast({
        title: "Class deleted",
        description: "The class has been removed from the schedule.",
      })
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    setTimeout(() => {
      if (editingClass) {
        // Update existing class
        setLocalSchedule(
          localSchedule.map((dayItem) => {
            if (dayItem.day === editingClass.day) {
              return {
                ...dayItem,
                classes: dayItem.classes.map((c) =>
                  c.id === editingClass.id
                    ? {
                        ...c,
                        time: values.time,
                        name: values.name,
                        trainer: values.trainer,
                        duration: values.duration,
                      }
                    : c,
                ),
              }
            } else if (dayItem.day === values.day && editingClass.day !== values.day) {
              // If day changed, remove from old day and add to new day
              const updatedClass = {
                id: editingClass.id,
                time: values.time,
                name: values.name,
                trainer: values.trainer,
                duration: values.duration,
              }
              return {
                ...dayItem,
                classes: [...dayItem.classes, updatedClass],
              }
            }
            return dayItem
          }),
        )

        // If day changed, also remove from old day
        if (editingClass.day !== values.day) {
          setLocalSchedule((prev) =>
            prev.map((dayItem) => {
              if (dayItem.day === editingClass.day) {
                return {
                  ...dayItem,
                  classes: dayItem.classes.filter((c) => c.id !== editingClass.id),
                }
              }
              return dayItem
            }),
          )
        }

        toast({
          title: "Class updated",
          description: `${values.name} has been updated successfully.`,
        })
      } else {
        // Create new class
        const newClass = {
          id: `class-${Date.now()}`,
          time: values.time,
          name: values.name,
          trainer: values.trainer,
          duration: values.duration,
        }

        setLocalSchedule(
          localSchedule.map((dayItem) => {
            if (dayItem.day === values.day) {
              return {
                ...dayItem,
                classes: [...dayItem.classes, newClass],
              }
            }
            return dayItem
          }),
        )

        toast({
          title: "Class created",
          description: `${values.name} has been added to the schedule.`,
        })
      }

      setIsSubmitting(false)
      setIsDialogOpen(false)
      form.reset()
      setEditingClass(null)
    }, 1000)
  }

  const handleAddNewClass = () => {
    form.reset({
      day: activeDay,
      time: "",
      name: "",
      trainer: "",
      duration: "",
    })
    setEditingClass(null)
    setIsDialogOpen(true)
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
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Class Schedule</h1>
                <p className="text-muted-foreground">Manage your gym's class schedule and instructors.</p>
              </div>
              <Button onClick={() => router.push("/admin/schedule/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Class
              </Button>
            </div>

            <Tabs defaultValue="Monday" value={activeDay} onValueChange={setActiveDay}>
              <TabsList className="mb-6 grid w-full grid-cols-7">
                {localSchedule.map((day) => (
                  <TabsTrigger key={day.day} value={day.day}>
                    {day.day}
                  </TabsTrigger>
                ))}
              </TabsList>

              {localSchedule.map((day) => (
                <TabsContent key={day.day} value={day.day}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {day.classes.length > 0 ? (
                      day.classes
                        .sort((a, b) => {
                          // Sort by time
                          const timeA = a.time.includes("AM") ? Number.parseInt(a.time) : Number.parseInt(a.time) + 12
                          const timeB = b.time.includes("AM") ? Number.parseInt(b.time) : Number.parseInt(b.time) + 12
                          return timeA - timeB
                        })
                        .map((classItem) => (
                          <Card key={classItem.id}>
                            <CardContent className="p-6">
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{classItem.name}</h3>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditClass({ ...classItem, day: day.day })}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteClass(day.day, classItem.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {classItem.time} • {classItem.duration}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>Instructor: {classItem.trainer}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{day.day}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                          <p className="text-muted-foreground">No classes scheduled for {day.day}.</p>
                          <Button variant="outline" className="mt-4" onClick={handleAddNewClass}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Class
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
                <DialogDescription>
                  {editingClass
                    ? "Update the details of this class."
                    : "Fill in the details to add a new class to the schedule."}
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {localSchedule.map((day) => (
                              <SelectItem key={day.day} value={day.day}>
                                {day.day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 08:00 AM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 60 min" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Yoga Flow" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {editingClass ? "Updating..." : "Creating..."}
                        </>
                      ) : editingClass ? (
                        "Update Class"
                      ) : (
                        "Add Class"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
      <Footer />
    </div>
  )
}
