"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, Dumbbell, CreditCard, Calendar, Settings, Tag } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users & Staff",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Programs",
      href: "/admin/programs/new",
      icon: Dumbbell,
    },
    {
      title: "Membership Plans",
      href: "/admin/plans",
      icon: Tag,
    },
    {
      title: "Schedule",
      href: "/admin/schedule",
      icon: Calendar,
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden w-64 border-r bg-background lg:block"
    >
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">Manage your gym</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center">
                  <link.icon className="mr-2 h-4 w-4" />
                  <span>{link.title}</span>
                </div>
                {link.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.div>
  )
}
