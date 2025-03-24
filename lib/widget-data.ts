// Mock data for widgets
export function getWidgetData(type: string, id: string) {
  switch (type) {
    case "statistics":
      return getStatisticsData(id)
    case "text":
      return getTextData(id)
    case "chart":
      return getChartData(id)
    case "activity":
      return getActivityData(id)
    default:
      return {}
  }
}

function getStatisticsData(id: string) {
  const statistics = {
    "stat-1": { value: "$12,345", trend: 12, subtype: "revenue" },
    "stat-2": { value: "1,234", trend: -5, subtype: "users" },
    "stat-3": { value: "456", trend: 8, subtype: "sales" },
    "stat-4": { value: "98.2%", trend: 2, subtype: "conversion" },
  }

  return statistics[id as keyof typeof statistics] || { value: "$0", trend: 0 }
}

function getTextData(id: string) {
  const texts = {
    "text-1": {
      content:
        "Welcome to your customizable dashboard! You can show or hide widgets using the Customize Widgets button.",
    },
    "text-2": {
      content: "This is a sample text widget that can display announcements, notes, or other important information.",
    },
  }

  return texts[id as keyof typeof texts] || { content: "No content available" }
}

function getChartData(id: string) {
  const charts = {
    "chart-1": {
      chartData: [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
        { name: "Apr", value: 800 },
        { name: "May", value: 500 },
        { name: "Jun", value: 900 },
      ],
    },
  }

  return charts[id as keyof typeof charts] || { chartData: [] }
}

function getActivityData(id: string) {
  const activities = {
    "activity-1": {
      activities: [
        { title: "User signup", timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
        { title: "New order placed", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
        { title: "Payment received", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
        { title: "System update", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      ],
    },
  }

  return activities[id as keyof typeof activities] || { activities: [] }
}

