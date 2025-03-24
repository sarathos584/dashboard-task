import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Check if DATABASE_URL is available
const isDatabaseAvailable = !!(process.env.DATABASE_URL || "")

// Create PostgreSQL connection only if DATABASE_URL is available
let client: ReturnType<typeof postgres> | null = null
let db: ReturnType<typeof drizzle> | null = null

if (isDatabaseAvailable) {
  try {
    const connectionString = process.env.DATABASE_URL || ""
    client = postgres(connectionString, {
      ssl: {
        rejectUnauthorized: false
      }
    })
    db = drizzle(client, { schema })
    console.log("Database connection established")
  } catch (error) {
    console.error("Failed to connect to database:", error)
  }
}

export { db, isDatabaseAvailable }

