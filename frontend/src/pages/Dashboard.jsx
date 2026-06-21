import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { uploadAndAnalyze, analyzeCV } from '../services/api'
import { incrementUsage, isBlocked, getRemaining, getLimit, applyPromo, hasPromo } from '../utils/usage'
import { validatePromo } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState(hasPromo() ? 'applied' : '')
  const [promoLoading, setPromoLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted')
      e.target.value = ''
      return
    }

    if (isBlocked()) {
      navigate('/payment')
      return
    }

    setFileName(file.name)
    setError('')
    setLoading(true)
    e.target.value = ''

    try {
      const uploadRes = await uploadAndAnalyze(file)
      const cvText = uploadRes.data.extractedText
      sessionStorage.setItem('ats_cv_text', cvText)
      incrementUsage()
      const result = await analyzeCV(cvText)
      navigate('/result', { state: result.data })
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="fixed inset-0 geo-grid pointer-events-none" />
        <div className="text-center">
          <div className="frame p-12 md:p-16 inline-flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <div className="geo-circle" style={{ width: 80, height: 80, opacity: 0.2 }} />
              <svg className="absolute inset-0 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="31.4 31.4" strokeLinecap="square" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-ink" />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-ink mb-1">Analyzing your CV...</p>
              <p className="text-sm text-ink-muted">Extracting keywords and generating your dashboard</p>
            </div>
            <div className="flex gap-1.5">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-2 h-2 border border-ink" style={{ animation: `fadeIn 0.6s ${i * 0.15}s infinite alternate` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle" style={{ width: 300, height: 300, top: '10%', right: '-5%', opacity: 0.08 }} />
      <div className="geo-square" style={{ width: 150, height: 150, bottom: '15%', left: '-3%', opacity: 0.06, transform: 'rotate(45deg)' }} />

      <div className="max-w-2xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to home
        </Link>

        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
            <span className="w-1.5 h-1.5 bg-ink" />
            CV ANALYSIS
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Upload your <span className="border-b-2 border-ink">CV</span>
          </h1>
          <p className="text-ink-secondary max-w-md mx-auto">
            Upload your CV as PDF and get an instant ATS compatibility score with a full dashboard.
          </p>
        </div>

        <div className="frame p-12 md:p-16 text-center">
          <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: '30%' }} />
          <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: '30%' }} />

          <label className="cursor-pointer inline-flex flex-col items-center gap-6 group">
            <div className="relative w-28 h-28 border-2 border-ink flex items-center justify-center group-hover:bg-ink transition-all duration-300">
              <div className="geo-square absolute" style={{ width: 40, height: 40, top: -8, right: -8, opacity: 0.1, transform: 'rotate(45deg)' }} />
              <svg className="w-10 h-10 text-ink group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="12" />
                <line x1="15" y1="15" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-ink group-hover:underline mb-1">Upload your CV (PDF)</p>
              <p className="text-xs text-ink-muted">Click to browse or drop your file</p>
            </div>
            <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
          </label>

          {fileName && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border-2 border-ink text-sm text-ink">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              {fileName}
            </div>
          )}

          {error && (
            <div className="mt-6 border-2 border-ink p-4 text-sm text-ink bg-ink/5">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-ink-muted">
          <span>{getRemaining()} / {getLimit()} free analyses remaining</span>
          <span className="w-1 h-1 bg-ink-muted rounded-full" />
          <span>Your data is processed securely and never stored</span>
        </div>

        <div className="mt-6 max-w-md mx-auto">
          <div className="border-t-2 border-ink/10 pt-6">
            {promoStatus === 'applied' ? (
              <div className="text-center text-xs text-ink-muted">
                Promo code applied — <span className="font-semibold text-ink">{getLimit()} analyses total</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 border-2 border-ink px-3 py-2 text-sm text-ink bg-surface outline-none focus:bg-ink/5"
                />
                <button
                  onClick={async () => {
                    if (!promoCode.trim()) return
                    setPromoLoading(true)
                    setError('')
                    try {
                      const res = await validatePromo(promoCode.trim())
                      applyPromo(res.bonus)
                      setPromoStatus('applied')
                      setPromoCode('')
                    } catch (err) {
                      setError(err.response?.data?.error || 'Invalid promo code')
                    } finally {
                      setPromoLoading(false)
                    }
                  }}
                  disabled={promoLoading || !promoCode.trim()}
                  className="btn-outline px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
