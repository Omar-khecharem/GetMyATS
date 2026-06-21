import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function JobMatchResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const panelRef = useRef(null)

  useEffect(() => {
    if (!data) {
      navigate('/job-match', { replace: true })
      return
    }
    window.scrollTo(0, 0)
  }, [data, navigate])

  if (!data) return null

  const { matchScore, matchedSkills, missingSkills, extraSkills, recommendations } = data

  const scoreColor = matchScore >= 80 ? 'text-ink' : matchScore >= 50 ? 'text-ink' : 'text-ink'
  const scoreLabel = matchScore >= 80 ? 'Strong Match' : matchScore >= 50 ? 'Partial Match' : 'Weak Match'

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="fixed inset-0 geo-grid pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <Link to="/job-match" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          New match
        </Link>

        <div ref={panelRef} className="animate-slide-up mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
            <span className="w-1.5 h-1.5 bg-ink" />
            MATCH RESULT
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Job <span className="border-b-2 border-ink">Compatibility</span>
          </h1>
        </div>

        <div className="frame p-8 md:p-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: 60 }} />
          <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: 60 }} />

          <div className="flex flex-col lg:flex-row gap-10 mb-10 pb-10 border-b-2 border-ink">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute inset-0" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#e0dfdd" strokeWidth="8" />
                  <circle
                    cx="100" cy="100" r="88"
                    fill="none" stroke="#1a1a1a" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - matchScore / 100)}`}
                    strokeLinecap="square"
                    transform="rotate(-90 100 100)"
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                  />
                </svg>
                <div className="text-center">
                  <div className="text-4xl font-bold text-ink">{matchScore}%</div>
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mt-1">Match</div>
                </div>
              </div>
              <div className={`mt-4 px-4 py-1.5 border-2 border-ink text-xs font-bold uppercase tracking-[0.1em] ${scoreColor}`}>
                {scoreLabel}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-ink mb-1">
                  {matchScore >= 80 ? 'Great fit for this role' : matchScore >= 50 ? 'Some gaps to address' : 'Significant gaps found'}
                </h2>
                <p className="text-sm text-ink-secondary">
                  {matchScore >= 80
                    ? 'Your CV aligns well with this job description.'
                    : matchScore >= 50
                    ? 'Your CV matches some requirements but needs improvements.'
                    : 'Your CV needs substantial adjustments for this role.'}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-ink-secondary mb-2">
                  <span>Match Rate</span>
                  <span>{matchScore}%</span>
                </div>
                <div className="h-2 border-2 border-ink bg-surface relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-ink transition-all duration-1000"
                    style={{ width: `${matchScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border-2 border-ink p-4">
                  <div className="text-2xl font-bold text-ink">{matchedSkills?.length || 0}</div>
                  <div className="text-xs text-ink-muted uppercase tracking-[0.1em] mt-1">Skills Matched</div>
                </div>
                <div className="border-2 border-ink bg-ink text-white p-4">
                  <div className="text-2xl font-bold">{missingSkills?.length || 0}</div>
                  <div className="text-xs text-white/60 uppercase tracking-[0.1em] mt-1">Skills Missing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="border-2 border-ink p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Matched Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedSkills?.length > 0 ? (
                  matchedSkills.map((s, i) => (
                    <span key={i} className="tag-found">{s}</span>
                  ))
                ) : (
                  <p className="text-xs text-ink-muted">No matching skills found</p>
                )}
              </div>
            </div>

            <div className="border-2 border-ink p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills?.length > 0 ? (
                  missingSkills.map((s, i) => (
                    <span key={i} className="tag-missing">{s}</span>
                  ))
                ) : (
                  <p className="text-xs text-ink-muted">No missing skills — great fit!</p>
                )}
              </div>
            </div>
          </div>

          {extraSkills?.length > 0 && (
            <div className="border-2 border-ink p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Extra Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {extraSkills.map((s, i) => (
                  <span key={i} className="tag-found">{s}</span>
                ))}
              </div>
            </div>
          )}

          {recommendations?.length > 0 && (
            <div className="border-2 border-ink p-6 mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Recommendations</h3>
              </div>
              <ul className="space-y-3">
                {recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="w-6 h-6 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => navigate('/job-match')}
            className="btn-solid w-full py-3.5 text-sm font-semibold"
          >
            Analyze another job
          </button>
        </div>
      </div>
    </div>
  )
}
