export type DiagnosticKind = "media" | "render" | "window" | "unhandled"

export type DiagnosticEvent = {
  at: number
  kind: DiagnosticKind
  message: string
  source?: string
}

const MAX_EVENTS = 50

const counts: Record<DiagnosticKind, number> = {
  media: 0,
  render: 0,
  window: 0,
  unhandled: 0,
}

const events: DiagnosticEvent[] = []

function push(event: DiagnosticEvent): void {
  counts[event.kind] += 1
  events.push(event)
  if (events.length > MAX_EVENTS) events.shift()
}

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export function getDiagnosticEvents(): readonly DiagnosticEvent[] {
  return events
}

export function getDiagnosticCounts(): Readonly<Record<DiagnosticKind, number>> {
  return counts
}

export function resetDiagnostics(): void {
  events.length = 0
  counts.media = 0
  counts.render = 0
  counts.window = 0
  counts.unhandled = 0
}

export function reportMediaFailure(source: string, error: unknown): void {
  push({
    at: Date.now(),
    kind: "media",
    message: messageOf(error),
    source,
  })
  console.error(`[koo-www] media failed: ${source}`, error)
}

export function reportRenderFailure(
  error: unknown,
  componentStack?: string,
): void {
  push({
    at: Date.now(),
    kind: "render",
    message: messageOf(error),
    source: componentStack,
  })
  console.error("[koo-www] render failed", error, componentStack)
}

export function installDiagnosticListeners(): () => void {
  const onError = (event: ErrorEvent) => {
    push({
      at: Date.now(),
      kind: "window",
      message: event.message,
      source: event.filename,
    })
    console.error("[koo-www] window error", event.error ?? event.message)
  }
  const onRejection = (event: PromiseRejectionEvent) => {
    push({
      at: Date.now(),
      kind: "unhandled",
      message: messageOf(event.reason),
    })
    console.error("[koo-www] unhandled rejection", event.reason)
  }

  window.addEventListener("error", onError)
  window.addEventListener("unhandledrejection", onRejection)
  return () => {
    window.removeEventListener("error", onError)
    window.removeEventListener("unhandledrejection", onRejection)
  }
}
