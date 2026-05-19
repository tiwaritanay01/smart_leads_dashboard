import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import LeadDetail from '@/pages/LeadDetail'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[color:var(--accent)] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[color:var(--accent-warm)] opacity-20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(95,180,156,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(224,122,95,0.15),transparent_45%)]" />
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads/:id" element={<LeadDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

export default App
