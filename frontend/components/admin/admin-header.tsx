"use client"

import { useRef,useState,useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Users, CreditCard, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { members } from "@/data/members"

export function AdminHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [newmembers, setNewmembers] = useState([]);
  // Calculate stats
  useEffect(() => {
    const fetchMembers = async () => {
      const data = await members();
      setNewmembers(data);
    };
    fetchMembers();
  }, []);

  const totalMembers = newmembers.length
  const activeMembers = newmembers.filter((member) => member.status === "active").length
  const totalRevenue = newmembers.reduce((sum, member) => {
    const planPrice = member.plan === "Basic" ? 29 : member.plan === "Premium" ? 59 : 99
    return sum + planPrice
  }, 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <h3 className="text-2xl font-bold">{totalMembers}</h3>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{activeMembers} active</span> / {totalMembers - activeMembers} inactive
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
              <p className="text-xs text-green-500">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Daily Attendance</p>
              <h3 className="text-2xl font-bold">42</h3>
              <p className="text-xs text-green-500">+8% from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

