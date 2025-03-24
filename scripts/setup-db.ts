import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { widgets, widgetStates } from "../lib/db/schema"
import { getWidgetData } from "../lib/widget-data"

// Load environment variables from .env file
config()

// Initial widget data
const initialWidgets = [
  { id: "stat-1", title: "Total Revenue", type: "statistics" },
  { id: "stat-2", title: "Active Users", type: "statistics" },
  { id: "stat-3", title: "Total Sales", type: "statistics" },
  { id: "stat-4", title: "Conversion Rate", type: "statistics" },
  { id: "text-1", title: "Welcome Message", type: "text" },
  { id: "text-2", title: "Announcements", type: "text" },
  { id: "chart-1", title: "Monthly Performance", type: "chart" },
  { id: "activity-1", title: "Recent Activity", type: "activity" },
]

async function main() {
  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set")
    process.exit(1)
  }

  console.log("Connecting to database...")

  // Create connection
  const client = postgres(process.env.DATABASE_URL, {
    ssl: {
      rejectUnauthorized: false
    },
    max: 1
  })
  
  const db = drizzle(client)

  try {
    console.log("Setting up database...")

    // Create tables using drizzle-kit
    console.log("Creating tables...")
    
    // Create widgets table
    await client`
      CREATE TABLE IF NOT EXISTS widgets (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create widget_states table
    await client`
      CREATE TABLE IF NOT EXISTS widget_states (
        id SERIAL PRIMARY KEY,
        widget_id TEXT NOT NULL REFERENCES widgets(id) ON DELETE CASCADE,
        is_visible BOOLEAN NOT NULL DEFAULT true,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Check if widgets already exist
    const existingWidgets = await db.select().from(widgets)
    
    if (existingWidgets.length === 0) {
      console.log("Seeding widgets...")
      // Insert widgets
      await db.insert(widgets).values(initialWidgets)

      // Set initial visibility states
      console.log("Setting initial widget states...")
      for (const widget of initialWidgets) {
        await db.insert(widgetStates).values({
          widgetId: widget.id,
          isVisible: true
        })
      }
      console.log("Initial data seeded successfully!")
    } else {
      console.log("Widgets already exist, skipping seed")
    }

    console.log("Database setup complete!")
  } catch (error) {
    console.error("Error setting up database:", error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error)
  process.exit(1)
}) 