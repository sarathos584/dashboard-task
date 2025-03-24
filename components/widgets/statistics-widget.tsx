import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Widget } from "@/lib/types"
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react"

interface StatisticsWidgetProps {
  widget: Widget
}

export function StatisticsWidget({ widget }: StatisticsWidgetProps) {
  const { data } = widget

  // Choose icon based on widget subtype
  const getIcon = () => {
    switch (data?.subtype) {
      case "revenue":
        return <DollarSign className="h-5 w-5 text-primary" />
      case "users":
        return <Users className="h-5 w-5 text-primary" />
      case "sales":
        return <ShoppingCart className="h-5 w-5 text-primary" />
      default:
        return <TrendingUp className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.value}</div>
        <p className="text-xs text-muted-foreground">
          {data?.trend > 0 ? "+" : ""}
          {data?.trend}% from last month
        </p>
      </CardContent>
    </Card>
  )
}

