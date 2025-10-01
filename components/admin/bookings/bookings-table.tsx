"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BookingsTable() {
  // API Integration Point: GET /api/admin/bookings
  // Expected response: Booking[]
  const bookings = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      service: "Individual Coaching",
      date: "2024-01-25",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@email.com",
      service: "Couples Coaching",
      date: "2024-01-26",
      time: "2:00 PM",
      status: "pending",
    },
  ]

  const handleStatusChange = async (id: string, status: string) => {
    // API Integration Point: PATCH /api/admin/bookings/:id
    // Expected payload: { status: string }
    console.log("Update booking status:", id, status)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={booking.status}
                    onValueChange={(value) => handleStatusChange(booking.id, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <Badge variant="secondary">Pending</Badge>
                      </SelectItem>
                      <SelectItem value="confirmed">
                        <Badge variant="default">Confirmed</Badge>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <Badge variant="destructive">Cancelled</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <XCircle className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
