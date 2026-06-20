import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AtsScoreCircle from '../components/AtsScoreCircle'

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const panelRef = useRef(null)

  useEffect(() => {
    if (!data) {
      navigate('/dashboard', { replace: true })
      return
    }
    window.scrollTo(0, 0)
  }, [data, navigate])

  if (!data) return null

  const { score, foundKeywords, missingKeywords, strengths, weaknesses, improvementTips } = data
  const total = (foundKeywords?.length || 0) + (missingKeywords?.length || 0)
  const showFound = strengths || foundKeywords || []
  const showMissing = weaknesses || missingKeywords || []

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="fixed inset-0 geo-grid pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <div ref={panelRef} className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
            <span className="w-1.5 h-1.5 bg-ink" />
            ATS DASHBOARD
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Analysis <span className="border-b-2 border-ink">Report</span>
          </h1>
        </div>

        <div className="frame p-8 md:p-10">
          <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: 60 }} />
          <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: 60 }} />

          <div className="flex flex-col lg:flex-row gap-10 mb-10 pb-10 border-b-2 border-ink">
            <div className="flex flex-col items-center shrink-0">
              <AtsScoreCircle score={score} size={200} strokeWidth={8} />
              <div className="mt-4 text-center">
                <div className="text-xs text-ink-muted uppercase tracking-[0.15em]">Keywords matched</div>
                <div className="text-lg font-bold text-ink">{foundKeywords?.length || 0} / {data.totalKeywords || total}</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-ink mb-1">
                  {score >= 80 ? 'Excellent Match' : score >= 50 ? 'Room for Improvement' : 'Needs Work'}
                </h2>
                <p className="text-sm text-ink-secondary">
                  {score >= 80
                    ? 'Your CV is well-optimized.'
                    : score >= 50
                    ? 'Your CV matches some common keywords but could be improved.'
                    : 'Your CV needs significant optimization.'}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-ink-secondary mb-2">
                  <span>Match Rate</span>
                  <span>{score}%</span>
                </div>
                <div className="h-2 border-2 border-ink bg-surface relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-ink transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border-2 border-ink p-4">
                  <div className="text-2xl font-bold text-ink">{foundKeywords?.length || 0}</div>
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mt-1">Found</div>
                </div>
                <div className="border-2 border-ink bg-ink text-white p-4">
                  <div className="text-2xl font-bold">{missingKeywords?.length || 0}</div>
                  <div className="text-xs text-white/60 uppercase tracking-[0.1em] mt-1">Missing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="geo-line" style={{ bottom: '50%', right: -2, width: 2, height: '30%', opacity: 0.1 }} />

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="border-2 border-ink p-6">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Found Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {showFound.length > 0 ? (
                  showFound.map((kw) => (
                    <span key={kw} className="tag-found">{kw}</span>
                  ))
                ) : (
                  <p className="text-xs text-ink-muted">No keywords found</p>
                )}
              </div>
            </div>

            <div className="border-2 border-ink p-6">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Missing Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {showMissing.length > 0 ? (
                  showMissing.map((kw) => (
                    <span key={kw} className="tag-missing">{kw}</span>
                  ))
                ) : (
                  <p className="text-xs text-ink-muted">No missing keywords!</p>
                )}
              </div>
            </div>
          </div>

          {improvementTips && improvementTips.length > 0 && (
            <div className="border-2 border-ink p-6 mb-10">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Improvement Tips</h3>
              </div>
              <ul className="space-y-3">
                {improvementTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="w-6 h-6 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-solid flex-1 py-3.5 text-sm font-semibold"
            >
              Analyze another CV
            </button>
            <button
              onClick={() => {
                const lines = [
                  '========================================',
                  '  ATS SCANNER — ANALYSIS REPORT',
                  '========================================',
                  '',
                  `Score: ${score} / 100`,
                  `Status: ${score >= 80 ? 'Excellent Match' : score >= 50 ? 'Room for Improvement' : 'Needs Work'}`,
                  `Keywords Found: ${foundKeywords?.length || 0}`,
                  `Keywords Missing: ${missingKeywords?.length || 0}`,
                  '',
                  '--- FOUND KEYWORDS ---',
                  ...(showFound.length ? showFound : ['(none)']),
                  '',
                  '--- MISSING KEYWORDS ---',
                  ...(showMissing.length ? showMissing : ['(none)']),
                  '',
                  '--- IMPROVEMENT TIPS ---',
                  ...(improvementTips?.length
                    ? improvementTips.map((t, i) => `${i + 1}. ${t}`)
                    : ['(none)']),
                  '',
                  `Generated: ${new Date().toLocaleString()}`,
                  '========================================',
                ].join('\n')
                const blob = new Blob([lines], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `ats-report-${Date.now()}.txt`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="btn-outline px-6 py-3.5 text-sm font-semibold"
            >
              Save report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
