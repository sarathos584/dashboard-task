"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Widget } from "@/lib/types"
import { Activity } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ActivityWidgetProps {
  widget: Widget
}

export function ActivityWidget({ widget }: ActivityWidgetProps) {
  const { data } = widget

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
        <Activity className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data?.activities?.map((activity, index) => (
            <li key={index} className="text-sm border-b pb-2 last:border-0">
              <div className="font-medium">{activity.title}</div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

