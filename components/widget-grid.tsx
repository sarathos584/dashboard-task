"use client"

import type { Widget } from "@/lib/types"
import { StatisticsWidget } from "@/components/widgets/statistics-widget"
import { TextWidget } from "@/components/widgets/text-widget"
import { ChartWidget } from "@/components/widgets/chart-widget"
import { ActivityWidget } from "@/components/widgets/activity-widget"

interface WidgetGridProps {
  widgets: Widget[]
}

export function WidgetGrid({ widgets }: WidgetGridProps) {
  // Render the appropriate widget component based on type
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "statistics":
        return <StatisticsWidget key={widget.id} widget={widget} />
      case "text":
        return <TextWidget key={widget.id} widget={widget} />
      case "chart":
        return <ChartWidget key={widget.id} widget={widget} />
      case "activity":
        return <ActivityWidget key={widget.id} widget={widget} />
      default:
        return null
    }
  }

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{widgets.map(renderWidget)}</div>
}

