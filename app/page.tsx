import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 max-w-[95vw]" >
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  )
}

