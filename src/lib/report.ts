export function reportMediaFailure(source: string, error: unknown): void {
  console.error(`[koo-www] media failed: ${source}`, error)
}

export function reportRenderFailure(error: unknown, componentStack?: string): void {
  console.error("[koo-www] render failed", error, componentStack)
}
