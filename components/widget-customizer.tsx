"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings } from "lucide-react"
import type { Widget } from "@/lib/types"

interface WidgetCustomizerProps {
  widgets: Widget[]
  onWidgetVisibilityChange: (id: string, isVisible: boolean) => void
}

export function WidgetCustomizer({ widgets, onWidgetVisibilityChange }: WidgetCustomizerProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-end mb-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Customize Widgets
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Widget Visibility</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-2 space-y-2 max-h-[300px] overflow-y-auto">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`widget-${widget.id}`}
                  checked={widget.isVisible}
                  onCheckedChange={(checked) => {
                    onWidgetVisibilityChange(widget.id, checked === true)
                  }}
                />
                <label
                  htmlFor={`widget-${widget.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {widget.title}
                </label>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

