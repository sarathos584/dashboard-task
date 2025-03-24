"use client"

import { useEffect, useState } from "react"
import { WidgetGrid } from "@/components/widget-grid"
import { WidgetCustomizer } from "@/components/widget-customizer"
import { useToast } from "@/hooks/use-toast"
import type { Widget } from "@/lib/types"
import { fetchWidgetStates, updateWidgetStates } from "@/lib/api"

export function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadWidgetStates = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchWidgetStates()
        setWidgets(data)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load dashboard widgets"
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWidgetStates()
  }, [toast])

  const handleWidgetVisibilityChange = async (id: string, isVisible: boolean) => {
    try {
      // Update local state immediately for responsive UI
      setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, isVisible } : widget)))

      // Persist to backend
      await updateWidgetStates(id, isVisible)

      toast({
        title: "Success",
        description: `Widget ${isVisible ? "shown" : "hidden"} successfully`,
      })
    } catch (error) {
      // Revert on error
      setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, isVisible: !isVisible } : widget)))

      const errorMessage = error instanceof Error ? error.message : "Failed to update widget visibility"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error(error)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading dashboard...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-destructive mb-2">Error loading dashboard</div>
        <div className="text-muted-foreground text-sm">{error}</div>
        <button
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <WidgetCustomizer widgets={widgets} onWidgetVisibilityChange={handleWidgetVisibilityChange} />
      {widgets.filter((widget) => widget.isVisible).length > 0 ? (
        <WidgetGrid widgets={widgets.filter((widget) => widget.isVisible)} />
      ) : (
        <div className="flex items-center justify-center p-8 text-center text-muted-foreground">
          No visible widgets. Use the Customize Widgets button to show widgets.
        </div>
      )}
    </div>
  )
}

