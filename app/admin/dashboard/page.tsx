import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/admin/dashboard/recent-activity"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <DashboardStats />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
