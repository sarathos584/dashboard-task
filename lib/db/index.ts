import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

export const isDatabaseAvailable = !!(process.env.DATABASE_URL)

let client: ReturnType<typeof postgres> | null = null
let db: ReturnType<typeof drizzle<typeof schema>> | null = null

if (process.env.DATABASE_URL) {
  try {
    // Remove any accidental leading/trailing equals signs and whitespace
    const dbUrl = process.env.DATABASE_URL.trim().replace(/^=+|=+$/g, '')
    client = postgres(dbUrl, {
      ssl: {
        rejectUnauthorized: false
      }
    })
    db = drizzle(client, { schema })
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

export { db }
