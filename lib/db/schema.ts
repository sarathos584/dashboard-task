import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"

// Define widgets table
export const widgets = pgTable("widgets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define widget states table
export const widgetStates = pgTable("widget_states", {
  id: serial("id").primaryKey(),
  widgetId: text("widget_id")
    .notNull()
    .references(() => widgets.id, { onDelete: "cascade" }),
  isVisible: boolean("is_visible").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Define users table (for authentication)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define user preferences table (for user-specific widget states)
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  widgetId: text("widget_id")
    .notNull()
    .references(() => widgets.id, { onDelete: "cascade" }),
  isVisible: boolean("is_visible").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
})

