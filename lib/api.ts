import type { Widget } from "@/lib/types"

export async function fetchWidgetStates(): Promise<Widget[]> {
  try {
    const response = await fetch("/api/widgets")

    if (!response.ok) {
      throw new Error(`Failed to fetch widget states: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching widget states:", error)
    throw error
  }
}

export async function updateWidgetStates(id: string, isVisible: boolean): Promise<void> {
  try {
    const response = await fetch("/api/widgets", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, isVisible }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update widget state: ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error updating widget state:", error)
    throw error
  }
}

