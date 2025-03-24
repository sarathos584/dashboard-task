import { NextResponse } from "next/server"
import { seedWidgets } from "@/lib/seed"
import { isDatabaseAvailable } from "@/lib/db"
import { getDummyWidgets } from "@/lib/dummy-data"

export async function GET() {
  try {
    if (!isDatabaseAvailable) {
      return NextResponse.json({
        success: false,
        message: "Database not available. Using in-memory dummy data instead.",
        data: getDummyWidgets(),
      })
    }

    await seedWidgets()
    return NextResponse.json({ success: true, message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      {
        error: "Failed to seed database",
        message: "Using in-memory dummy data instead.",
        data: getDummyWidgets(),
      },
      { status: 500 },
    )
  }
}

