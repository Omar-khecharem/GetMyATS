import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_KEY = 'ats_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-3xl mx-auto frame p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface">
        <div className="flex-1 text-sm text-ink-secondary">
          We use cookies to improve your experience. By continuing, you accept our{' '}
          <Link to="/cookies" className="text-ink underline font-medium hover:opacity-70 transition-opacity">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-ink underline font-medium hover:opacity-70 transition-opacity">
            Privacy Policy
          </Link>.
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="btn-outline px-4 py-2 text-xs font-medium">
            Decline
          </button>
          <button onClick={accept} className="btn-solid px-4 py-2 text-xs font-medium">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
