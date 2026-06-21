import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { enhanceBulletPoint } from '../services/api'

export default function BulletEnhancer() {
  const [bulletText, setBulletText] = useState('')
  const [context, setContext] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const resultRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleEnhance = async () => {
    if (!bulletText.trim()) {
      setError('Please enter a bullet point to enhance')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await enhanceBulletPoint(bulletText, context)
      setResult(res.data)
      setHistory((prev) => [{ original: bulletText, enhanced: res.data.enhanced }, ...prev].slice(0, 10))
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Enhancement failed')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-square" style={{ width: 180, height: 180, top: '8%', right: '-5%', opacity: 0.05, transform: 'rotate(45deg)' }} />

      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to home
        </Link>

        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
            <span className="w-1.5 h-1.5 bg-ink" />
            BULLET POINT ENHANCER
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Supercharge your <span className="border-b-2 border-ink">bullet points</span>
          </h1>
          <p className="text-ink-secondary max-w-lg mb-8">
            Paste a weak bullet point and get an ATS-optimized version with strong action verbs and measurable impact.
          </p>
        </div>

        <div className="frame p-8 md:p-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: 60 }} />
          <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: 60 }} />

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Your bullet point</label>
              <textarea
                value={bulletText}
                onChange={(e) => setBulletText(e.target.value)}
                placeholder="e.g. Responsible for managing a team of developers..."
                rows={4}
                className="w-full border-2 border-ink p-4 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-y"
              />
              <p className="text-xs text-ink-muted mt-1.5">{bulletText.length} characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Job context <span className="text-ink-muted font-normal">(optional)</span>
              </label>
              <input
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Senior Software Engineer at a fintech startup"
                className="w-full border-2 border-ink p-3.5 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5"
              />
            </div>

            {error && (
              <div className="border-2 border-ink p-4 text-sm text-ink bg-ink/5 animate-fade-in">
                {error}
              </div>
            )}

            <button
              onClick={handleEnhance}
              disabled={loading || !bulletText.trim()}
              className="btn-solid w-full py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.4 31.4" strokeLinecap="square" />
                  </svg>
                  Enhancing...
                </span>
              ) : (
                'Enhance bullet point'
              )}
            </button>
          </div>
        </div>

        {result && (
          <div ref={resultRef} className="mt-8 animate-slide-up">
            <div className="frame p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                <h2 className="text-lg font-bold text-ink">Enhanced Version</h2>
              </div>

              <div className="mb-6">
                <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-2">Original</div>
                <div className="border-2 border-ink/30 p-4 text-sm text-ink-secondary bg-canvas">
                  {result.original}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-2">Enhanced</div>
                <div className="border-2 border-ink p-4 text-sm text-ink bg-surface relative group">
                  {result.enhanced}
                  <button
                    onClick={() => copyToClipboard(result.enhanced)}
                    className="absolute top-2 right-2 p-1.5 border border-ink/20 hover:border-ink text-ink-muted hover:text-ink transition-all text-xs opacity-0 group-hover:opacity-100"
                    title="Copy to clipboard"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-2 border-ink p-4">
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-1">Power Verb</div>
                  <div className="text-sm font-bold text-ink">{result.verb}</div>
                </div>
                <div className="border-2 border-ink p-4">
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-1">Impact</div>
                  <div className="text-sm text-ink">{result.impact}</div>
                </div>
              </div>

              {result.why && (
                <div className="mt-4 border-2 border-ink p-4 bg-ink/5">
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-1">Why this works</div>
                  <p className="text-sm text-ink">{result.why}</p>
                </div>
              )}

              <button
                onClick={() => { setResult(null); setBulletText(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline w-full mt-6 py-3 text-sm font-semibold"
              >
                Enhance another
              </button>
            </div>
          </div>
        )}

        {history.length > 0 && !result && (
          <div className="mt-8 animate-slide-up">
            <div className="frame p-6">
              <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em] mb-4">Recent enhancements</h3>
              <div className="space-y-3">
                {history.map((item, i) => (
                  <div key={i} className="border-2 border-ink/30 p-3">
                    <div className="text-xs text-ink-muted mb-1">Original</div>
                    <div className="text-sm text-ink-secondary mb-2 line-clamp-2">{item.original}</div>
                    <div className="text-xs text-ink-muted mb-1">Enhanced</div>
                    <div className="text-sm text-ink font-medium">{item.enhanced}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
