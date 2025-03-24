import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Widget } from "@/lib/types"
import { FileText } from "lucide-react"

interface TextWidgetProps {
  widget: Widget
}

export function TextWidget({ widget }: TextWidgetProps) {
  const { data } = widget

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
        <FileText className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-sm">{data?.content}</p>
      </CardContent>
    </Card>
  )
}

