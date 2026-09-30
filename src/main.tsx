import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AppErrorBoundary } from "./components/AppErrorBoundary.tsx"
import { installDiagnosticListeners } from "./lib/report.ts"
import "./index.css"
import App from "./App.tsx"

installDiagnosticListeners()

const root = document.getElementById('root')
if (!root) {
  throw new Error('[koo-www] #root is missing')
}

createRoot(root).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
)
