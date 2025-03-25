import { type NextRequest, NextResponse } from "next/server"
import { widgets, widgetStates } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getWidgetData } from "@/lib/widget-data"
import { getDummyWidgets, updateDummyWidgetState } from "@/lib/dummy-data"
import { db, isDatabaseAvailable } from "@/lib/db"

export async function GET() {
  try {
    // If DATABASE_URL is not available, return dummy data
    if (!isDatabaseAvailable || !db) {
      console.log("Using dummy data (no database connection)")
      return NextResponse.json(getDummyWidgets())
    }

    // Get all widgets with their visibility state
    const allWidgets = await db.select().from(widgets)
    const allWidgetStates = await db.select().from(widgetStates)

    // Combine widgets with their states and data
    const widgetsWithState = allWidgets.map((widget) => {
      const state = allWidgetStates.find((state) => state.widgetId === widget.id)
      return {
        ...widget,
        isVisible: state ? state.isVisible : true, // Default to visible if no state
        data: getWidgetData(widget.type, widget.id), // Get widget-specific data
      }
    })

    return NextResponse.json(widgetsWithState)
  } catch (error) {
    console.error("Error fetching widgets:", error)

    // Fallback to dummy data on error
    console.log("Falling back to dummy data due to error")
    return NextResponse.json(getDummyWidgets())
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, isVisible } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Widget ID is required" }, { status: 400 })
    }

    // If DATABASE_URL is not available, update dummy data
    if (!isDatabaseAvailable || !db) {
      console.log(`Using dummy data: updating widget ${id} to ${isVisible}`)
      updateDummyWidgetState(id, isVisible)
      return NextResponse.json({ success: true })
    }

    // Check if widget exists
    const existingWidget = await db.select().from(widgets).where(eq(widgets.id, id)).limit(1)

    if (!existingWidget.length) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 })
    }

    // Check if state exists for this widget
    const existingState = await db.select().from(widgetStates).where(eq(widgetStates.widgetId, id)).limit(1)

    if (existingState.length) {
      // Update existing state
      await db.update(widgetStates).set({ isVisible }).where(eq(widgetStates.widgetId, id))
    } else {
      // Create new state
      await db.insert(widgetStates).values({
        widgetId: id,
        isVisible,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating widget state:", error)

    // If there's an error but we have the widget ID and visibility state,
    // update the dummy data as a fallback
    try {
      const { id, isVisible } = await request.json()
      if (id) {
        updateDummyWidgetState(id, isVisible)
        return NextResponse.json({
          success: true,
          message: "Updated in-memory state (database unavailable)",
        })
      }
    } catch (e) {
      // Ignore parsing errors
    }

    return NextResponse.json({ error: "Failed to update widget state" }, { status: 500 })
  }
}

