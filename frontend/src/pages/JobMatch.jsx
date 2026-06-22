import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { matchCVWithJob, uploadAndAnalyze } from '../services/api'

export default function JobMatch() {
  const navigate = useNavigate()
  const [jobDesc, setJobDesc] = useState('')
  const [cvText, setCvText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cvSource, setCvSource] = useState('stored')
  const formRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = sessionStorage.getItem('ats_cv_text')
    if (stored) {
      setCvText(stored)
      setCvSource('stored')
    } else {
      setCvSource('new')
    }
  }, [])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted')
      e.target.value = ''
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await uploadAndAnalyze(file)
      const text = res.data.extractedText
      setCvText(text)
      sessionStorage.setItem('ats_cv_text', text)
      setCvSource('stored')
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to extract CV')
    } finally {
      setLoading(false)
    }
    e.target.value = ''
  }

  const handleMatch = async () => {
    if (!jobDesc.trim()) {
      setError('Please enter a job description')
      return
    }
    if (!cvText.trim()) {
      setError('No CV text available. Upload your CV first.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const result = await matchCVWithJob(cvText, jobDesc)
      navigate('/job-match-result', { state: result.data })
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Match analysis failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !cvText) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <Seo title="Matching Your CV..." canonicalUrl="https://get-my-ats.vercel.app/job-match" />
        <div className="fixed inset-0 geo-grid pointer-events-none" />
        <div className="text-center">
          <div className="frame p-12 md:p-16 inline-flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <div className="geo-circle" style={{ width: 80, height: 80, opacity: 0.2 }} />
              <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="31.4 31.4" strokeLinecap="square" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-ink" />
              </div>
            </div>
            <p className="text-lg font-semibold text-ink">Extracting CV text...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="CV & Job Description Matching"
        description="Match your CV against any job description. Get AI-powered compatibility analysis, keyword gap detection, and tailored suggestions to land more interviews."
        keywords="CV job match, resume comparison, job description matching, ATS compatibility, keyword gap analysis"
        canonicalUrl="https://get-my-ats.vercel.app/job-match"
      />
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle" style={{ width: 250, height: 250, top: '5%', left: '-5%', opacity: 0.06 }} />
      <div className="geo-square" style={{ width: 100, height: 100, bottom: '20%', right: '5%', opacity: 0.05, transform: 'rotate(45deg)' }} />

      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to home
        </Link>

        <div ref={formRef} className="animate-slide-up">
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
              <span className="w-1.5 h-1.5 bg-ink" />
              JOB MATCH
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Match your <span className="border-b-2 border-ink">CV</span> with a job
            </h1>
            <p className="text-ink-secondary max-w-lg">
              Paste a job description below and see how well your CV matches the requirements.
            </p>
          </div>

          <div className="frame p-8 md:p-10 space-y-6">
            <div className="geo-dot" style={{ width: 8, height: 8, top: -4, right: 60 }} />
            <div className="geo-dot" style={{ width: 8, height: 8, bottom: -4, left: 60 }} />

            {cvSource === 'stored' && cvText ? (
              <div className="flex items-center justify-between border-2 border-ink p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  <span className="text-sm text-ink font-medium">CV loaded from your analysis</span>
                </div>
                <label className="text-xs text-ink-secondary underline cursor-pointer hover:text-ink transition-colors">
                  Upload different CV
                  <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="border-2 border-ink p-6 text-center">
                <label className="cursor-pointer inline-flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 border-2 border-ink flex items-center justify-center group-hover:bg-ink transition-all duration-300">
                    <svg className="w-6 h-6 text-ink group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="12" y2="12" />
                      <line x1="15" y1="15" x2="12" y2="12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-ink group-hover:underline">Upload your CV (PDF)</span>
                  <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
                </label>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Job Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                rows={10}
                className="w-full border-2 border-ink p-4 text-sm text-ink bg-surface outline-none transition-all duration-200 focus:bg-ink/5 resize-y"
              />
            </div>

            {error && (
              <div className="border-2 border-ink p-4 text-sm text-ink bg-ink/5 animate-fade-in">
                {error}
              </div>
            )}

            <button
              onClick={handleMatch}
              disabled={loading}
              className="btn-solid w-full py-3.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="31.4 31.4" strokeLinecap="square" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Match my CV'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
