import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import { resetUsage } from '../utils/usage'

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const plan = location.state?.plan || 'Pro'
  const planPrice = location.state?.price || '9'
  const [cardNumber, setCardNumber] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim() || !name.trim()) {
      setError('Please fill in all fields')
      return
    }
    resetUsage()
    setPaid(true)
    setError('')
    setTimeout(() => navigate('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
      <Seo
        title="Unlock Unlimited CV Analyses"
        description="Upgrade your GetMyATS plan for unlimited CV analyses, advanced job matching, bullet enhancement, and AI interview practice. Created by Omar Khecharem."
        keywords="ATS scanner pricing, CV analysis upgrade, unlimited scans, GetMyATS pro"
        canonicalUrl="https://get-my-ats.vercel.app/payment"
      />
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 400, height: 400, top: '-15%', right: '-10%', opacity: 0.03 }} />
      <div className="geo-square absolute" style={{ width: 200, height: 200, bottom: '10%', left: '-5%', opacity: 0.03, transform: 'rotate(45deg)' }} />

      {paid ? (
        <div className="frame p-12 text-center max-w-md mx-6 animate-fade-in">
          <div className="w-16 h-16 border-2 border-ink flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Payment Successful!</h2>
          <p className="text-sm text-ink-secondary">Your analyses have been reset. Redirecting...</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto px-6 w-full">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back to home
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
              <span className="w-1.5 h-1.5 bg-ink" />
              SUBSCRIPTION
            </div>
            <h1 className="text-3xl font-bold text-ink mb-3">
              Upgrade your <span className="border-b-2 border-ink">plan</span>
            </h1>
            <p className="text-sm text-ink-secondary">
              {plan === 'Free' ? 'Upgrade to unlock unlimited analyses and AI-powered features.' : `You've used all 3 free analyses. Unlock unlimited access with the ${plan} plan for just $${planPrice}/month.`}
            </p>
          </div>

          <div className="frame p-6 md:p-8">
            <div className="geo-dot" style={{ width: 6, height: 6, top: -3, right: 20 }} />

              <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-ink">
                <div className="w-10 h-10 border-2 border-ink flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{plan} Plan</p>
                  <p className="text-xs text-ink-muted">${planPrice}/month — Unlimited analyses</p>
                </div>
              </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-[0.1em]">Cardholder Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border-2 border-ink p-3 text-sm text-ink placeholder:text-ink-lighter outline-none focus:bg-ink/5 transition-all bg-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-[0.1em]">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className="w-full border-2 border-ink p-3 text-sm text-ink placeholder:text-ink-lighter outline-none focus:bg-ink/5 transition-all bg-surface font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-[0.1em]">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full border-2 border-ink p-3 text-sm text-ink placeholder:text-ink-lighter outline-none focus:bg-ink/5 transition-all bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-[0.1em]">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    type="password"
                    className="w-full border-2 border-ink p-3 text-sm text-ink placeholder:text-ink-lighter outline-none focus:bg-ink/5 transition-all bg-surface font-mono"
                  />
                </div>
              </div>

              {error && (
                <div className="border-2 border-ink p-3 text-sm text-ink bg-ink/5">{error}</div>
              )}

              <button type="submit" className="btn-solid w-full py-3.5 text-sm font-semibold">
                Pay ${planPrice} — Upgrade to {plan}
              </button>
            </form>

            <p className="mt-4 text-[10px] text-ink-muted text-center">
              This is a static demo. No real payment will be processed.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
