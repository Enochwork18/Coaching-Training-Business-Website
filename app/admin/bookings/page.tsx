import { BookingsTable } from "@/components/admin/bookings/bookings-table"

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Bookings</h1>
        <p className="text-muted-foreground">Manage client bookings and appointments.</p>
      </div>

      <BookingsTable />
    </div>
  )
}
