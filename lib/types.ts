export interface Widget {
  id: string
  title: string
  type: "statistics" | "text" | "chart" | "activity"
  isVisible: boolean
  data?: any
}

export interface WidgetState {
  id: string
  isVisible: boolean
}

