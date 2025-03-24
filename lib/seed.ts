import { db, isDatabaseAvailable } from "./db"
import { widgets } from "./db/schema"

export async function seedWidgets() {
  if (!isDatabaseAvailable || !db) {
    console.log("Database not available, skipping seed")
    return
  }

  // Check if widgets already exist
  const existingWidgets = await db.select().from(widgets)

  if (existingWidgets.length > 0) {
    console.log("Widgets already seeded")
    return
  }

  // Seed widgets
  await db.insert(widgets).values([
    { id: "stat-1", title: "Total Revenue", type: "statistics" },
    { id: "stat-2", title: "Active Users", type: "statistics" },
    { id: "stat-3", title: "Total Sales", type: "statistics" },
    { id: "stat-4", title: "Conversion Rate", type: "statistics" },
    { id: "text-1", title: "Welcome Message", type: "text" },
    { id: "text-2", title: "Announcements", type: "text" },
    { id: "chart-1", title: "Monthly Performance", type: "chart" },
    { id: "activity-1", title: "Recent Activity", type: "activity" },
  ])

  console.log("Widgets seeded successfully")
}

