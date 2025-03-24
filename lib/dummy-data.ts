import type { Widget } from "./types"

// Comprehensive dummy data for when DATABASE_URL is unavailable
export const dummyWidgets: Widget[] = [
  {
    id: "stat-1",
    title: "Total Revenue",
    type: "statistics",
    isVisible: true,
    data: { value: "$12,345", trend: 12, subtype: "revenue" },
  },
  {
    id: "stat-2",
    title: "Active Users",
    type: "statistics",
    isVisible: true,
    data: { value: "1,234", trend: -5, subtype: "users" },
  },
  {
    id: "stat-3",
    title: "Total Sales",
    type: "statistics",
    isVisible: true,
    data: { value: "456", trend: 8, subtype: "sales" },
  },
  {
    id: "stat-4",
    title: "Conversion Rate",
    type: "statistics",
    isVisible: false,
    data: { value: "98.2%", trend: 2, subtype: "conversion" },
  },
  {
    id: "text-1",
    title: "Welcome Message",
    type: "text",
    isVisible: true,
    data: {
      content:
        "Welcome to your customizable dashboard! You can show or hide widgets using the Customize Widgets button.",
    },
  },
  {
    id: "text-2",
    title: "Announcements",
    type: "text",
    isVisible: false,
    data: {
      content: "This is a sample text widget that can display announcements, notes, or other important information.",
    },
  },
  {
    id: "chart-1",
    title: "Monthly Performance",
    type: "chart",
    isVisible: true,
    data: {
      chartData: [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 800 },
        { name: "May", value: 500 },
        { name: "Jun", value: 900 },
      ],
    },
  },
  {
    id: "activity-1",
    title: "Recent Activity",
    type: "activity",
    isVisible: true,
    data: {
      activities: [
        { title: "User signup", timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
        { title: "New order placed", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
        { title: "Payment received", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
        { title: "System update", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      ],
    },
  },
]

// In-memory storage for widget states when using dummy data
const dummyWidgetStates = new Map<string, boolean>()

// Initialize dummy widget states
dummyWidgets.forEach((widget) => {
  dummyWidgetStates.set(widget.id, widget.isVisible)
})

export function getDummyWidgets(): Widget[] {
  return dummyWidgets.map((widget) => ({
    ...widget,
    isVisible: dummyWidgetStates.get(widget.id) ?? widget.isVisible,
  }))
}

export function updateDummyWidgetState(id: string, isVisible: boolean): void {
  dummyWidgetStates.set(id, isVisible)
}

