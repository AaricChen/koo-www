import { Component, type ErrorInfo, type ReactNode } from "react"
import { reportRenderFailure } from "../lib/report"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    reportRenderFailure(error, info.componentStack ?? undefined)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
          <p className="text-center text-base text-muted-foreground">
            Something went wrong. Please refresh the page.
          </p>
        </main>
      )
    }

    return this.props.children
  }
}
