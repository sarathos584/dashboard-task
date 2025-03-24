import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { widgets, users, userPreferences } from "../lib/db/schema"
import bcrypt from "bcryptjs"

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

// Initial users data
const initialUsers = [
  { id: "user-1", name: "Demo User", email: "demo@example.com", password: "demo123" },
  { id: "user-2", name: "John Doe", email: "john@example.com", password: "john123" },
  { id: "user-3", name: "Jane Smith", email: "jane@example.com", password: "jane123" },
  { id: "user-4", name: "Bob Wilson", email: "bob@example.com", password: "bob123" },
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

    // Create users table
    await client`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create user preferences table
    await client`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        widget_id TEXT NOT NULL REFERENCES widgets(id) ON DELETE CASCADE,
        is_visible BOOLEAN NOT NULL DEFAULT true,
        position INTEGER NOT NULL DEFAULT 0,
        settings JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, widget_id)
      )
    `

    // Check if widgets already exist
    const existingWidgets = await db.select().from(widgets)
    
    if (existingWidgets.length === 0) {
      console.log("Seeding widgets...")
      // Insert widgets
      await db.insert(widgets).values(initialWidgets)
      console.log("Initial widget data seeded successfully!")
    } else {
      console.log("Widgets already exist, skipping widget seed")
    }

    // Always update users
    console.log("Updating users...")
    // Hash passwords
    const hashedUsers = await Promise.all(
      initialUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    )

    // Delete existing users and preferences
    await client`DELETE FROM user_preferences`
    await client`DELETE FROM users`
    await db.insert(users).values(hashedUsers)
    console.log("Users updated successfully!")

    // Create default preferences for each user
    console.log("Setting up user preferences...")
    for (const user of initialUsers) {
      for (const [index, widget] of initialWidgets.entries()) {
        await db.insert(userPreferences).values({
          userId: user.id,
          widgetId: widget.id,
          isVisible: true,
          position: index,
          settings: {}
        })
      }
    }
    console.log("User preferences created successfully!")

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