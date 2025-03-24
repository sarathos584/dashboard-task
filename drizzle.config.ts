import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "dpg-cvgn345umphs73djshl0-a",
    port: 5432,
    user: "test_dashboard_user",
    password: process.env.DB_PASSWORD,
    database: "test_dashboard",
    ssl: {
      rejectUnauthorized: false
    }
  },
} satisfies Config

