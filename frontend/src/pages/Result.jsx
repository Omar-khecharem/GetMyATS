import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import AtsScoreCircle from '../components/AtsScoreCircle'

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const panelRef = useRef(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate('/dashboard', { replace: true })
      return
    }
    window.scrollTo(0, 0)
  }, [data, navigate])

  const saveAsPdf = async () => {
    if (!panelRef.current) return
    setSaving(true)
    const { default: html2canvas } = await import('html2canvas')
    const { default: jsPDF } = await import('jspdf')

    try {
      const canvas = await html2canvas(panelRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgWidth = pageWidth - 20
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 10

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pdf.internal.pageSize.getHeight() - 20

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pdf.internal.pageSize.getHeight() - 20
      }

      pdf.save(`ats-report-${Date.now()}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setSaving(false)
    }
  }

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
          <div className="mb-6">
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
                <h3 className="text-sm font-bold text-ink uppercase tracking-[0.1em]">Personalized Improvement Tips</h3>
              </div>
              <ul className="space-y-4">
                {improvementTips.map((tip, i) => {
                  const isActionTip = /verb|action|strong|use |replace|avoid|add |include|quantif|measur|number|percent/i.test(tip)
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <span className={`w-7 h-7 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${isActionTip ? 'bg-ink text-white border-2 border-ink' : 'border-2 border-ink text-ink'}`}>
                        {i + 1}
                      </span>
                      <span className="pt-1">{tip}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

        </div>
      </div>
      </div>

      <div className="flex gap-4 max-w-5xl mx-auto px-6 mt-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-solid flex-1 py-3.5 text-sm font-semibold"
        >
          Analyze another CV
        </button>
        <button
          onClick={saveAsPdf}
          disabled={saving}
          className="btn-outline px-6 py-3.5 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Generating PDF...' : 'Save report as PDF'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10 border-t-2 border-ink pt-8">
        <p className="text-xs text-ink-muted uppercase tracking-[0.1em] mb-4 text-center">Power up your job search</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/bullet-enhancer" className="border-2 border-ink p-4 text-center hover:bg-ink hover:text-white transition-all duration-200 group">
            <svg className="w-5 h-5 mx-auto mb-2 text-ink group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            <div className="text-xs font-semibold uppercase tracking-[0.05em]">Bullet Enhancer</div>
            <div className="text-[10px] text-ink-muted group-hover:text-white/60 mt-1">Supercharge your bullet points</div>
          </Link>
          <Link to="/job-match" className="border-2 border-ink p-4 text-center hover:bg-ink hover:text-white transition-all duration-200 group">
            <svg className="w-5 h-5 mx-auto mb-2 text-ink group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <div className="text-xs font-semibold uppercase tracking-[0.05em]">Job Match</div>
            <div className="text-[10px] text-ink-muted group-hover:text-white/60 mt-1">Match CV with any job</div>
          </Link>
          <Link to="/interview" className="border-2 border-ink p-4 text-center hover:bg-ink hover:text-white transition-all duration-200 group">
            <svg className="w-5 h-5 mx-auto mb-2 text-ink group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            <div className="text-xs font-semibold uppercase tracking-[0.05em]">Interview Prep</div>
            <div className="text-[10px] text-ink-muted group-hover:text-white/60 mt-1">Practice with AI questions</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
