"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Widget } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { LineChart } from "lucide-react"

interface ChartWidgetProps {
  widget: Widget
}

export function ChartWidget({ widget }: ChartWidgetProps) {
  const { data } = widget
  const chartData = data?.chartData || []

  // Check if we have valid chart data
  const hasData = Array.isArray(chartData) && chartData.length > 0

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
        <LineChart className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="h-[200px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">No chart data available</div>
        )}
      </CardContent>
    </Card>
  )
}

