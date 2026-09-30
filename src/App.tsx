import { Analytics } from "@vercel/analytics/react"
import { Navigate, Route, Routes } from "react-router-dom"
import { FaqTopicPage } from "./pages/FaqTopicPage"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<Navigate to="/faq/what-is-koo" replace />} />
        <Route path="/faq/:topicSlug" element={<FaqTopicPage />} />
      </Routes>
      <Analytics />
    </div>
  )
}

export default App
