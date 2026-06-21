import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Result from './pages/Result'
import Payment from './pages/Payment'
import JobMatch from './pages/JobMatch'
import JobMatchResult from './pages/JobMatchResult'
import BulletEnhancer from './pages/BulletEnhancer'
import InterviewChat from './pages/InterviewChat'
import CookiesPolicy from './pages/CookiesPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'

export default function App() {
  const location = useLocation()
  const isInterview = location.pathname === '/interview'

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {!isInterview && <Navbar />}
      <main className={isInterview ? '' : 'flex-1'}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<Result />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/job-match" element={<JobMatch />} />
          <Route path="/job-match-result" element={<JobMatchResult />} />
          <Route path="/bullet-enhancer" element={<BulletEnhancer />} />
          <Route path="/interview" element={<InterviewChat />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      {!isInterview && <CookieConsent />}
      {!isInterview && <Footer />}
    </div>
  )
}
