"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  memberCount: number
  popular: boolean
}

interface PlansTableProps {
  plans: Plan[]
}

export function PlansTable({ plans }: PlansTableProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Membership Plans</h2>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Members</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">
                  {plan.name}
                  {plan.popular && (
                    <Badge className="ml-2" variant="secondary">
                      Popular
                    </Badge>
                  )}
                </TableCell>
                <TableCell>${plan.price}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>
                  <span className="line-clamp-1">
                    {plan.features.slice(0, 3).join(", ")}
                    {plan.features.length > 3 && "..."}
                  </span>
                </TableCell>
                <TableCell>{plan.memberCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit plan</DropdownMenuItem>
                      <DropdownMenuItem>View members</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete plan</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

