import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function CookiesPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Cookies Policy"
        description="Learn how GetMyATS uses cookies and similar technologies. Understand your choices for managing cookie preferences on our AI-powered CV analysis platform."
        keywords="cookies policy, cookie consent, GDPR, data tracking, GetMyATS"
        canonicalUrl="https://get-my-ats.vercel.app/cookies"
      />
      <div className="fixed inset-0 geo-grid pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink mb-8 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to home
        </Link>

        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-4">
            <span className="w-1.5 h-1.5 bg-ink" />
            COOKIES
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6">Cookies Policy</h1>
        </div>

        <div className="space-y-8 text-sm text-ink-secondary leading-relaxed">
          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your browsing experience. This policy explains how we use cookies on ATS Scanner.
            </p>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">How We Use Cookies</h2>
            <p className="mb-4">We use only strictly necessary cookies for the core functionality of our service:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">1</span>
                <span><strong className="text-ink">Usage tracking:</strong> Stores the number of CV analyses you have performed (local storage).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">2</span>
                <span><strong className="text-ink">Consent preference:</strong> Remembers your cookie consent choice.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">3</span>
                <span><strong className="text-ink">Session storage:</strong> Temporarily stores your CV text during analysis for a seamless experience. Data is never persisted on our servers after analysis.</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">Third-Party Cookies</h2>
            <p>
              We do not use any third-party tracking cookies, analytics cookies, or advertising cookies. Your data stays on your device and is only transmitted to our server temporarily for ATS analysis.
            </p>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">Managing Cookies</h2>
            <p>
              You can manage or delete cookies through your browser settings. Note that blocking all cookies may affect the functionality of our service, particularly usage tracking that limits free analyses.
            </p>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">Updates</h2>
            <p>
              We may update this Cookies Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
            <p className="text-xs text-ink-muted mt-4">Last updated: June 2026</p>
          </section>
        </div>
      </div>
    </div>
  )
}
