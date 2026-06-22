import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Privacy Policy"
        description="Read the GetMyATS privacy policy. Learn how we collect, use, and protect your personal data when you use our AI-powered CV analysis platform by Omar Khecharem."
        keywords="privacy policy, data protection, CV privacy, GetMyATS privacy"
        canonicalUrl="https://get-my-ats.vercel.app/privacy"
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
            DATA PRIVACY
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6">Privacy Policy</h1>
        </div>

        <div className="space-y-8 text-sm text-ink-secondary leading-relaxed">
          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">1. Introduction</h2>
            <p>
              ATS Scanner (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CV analysis service.
            </p>
            <p className="mt-3">
              By using our service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">2. Data We Collect</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">A</span>
                <span><strong className="text-ink">CV Content:</strong> The text extracted from your uploaded CV for the purpose of ATS analysis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">B</span>
                <span><strong className="text-ink">Job Descriptions:</strong> Any job description text you provide for CV matching purposes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">C</span>
                <span><strong className="text-ink">Usage Data:</strong> Number of analyses performed (stored locally in your browser).</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">1</span>
                <span>To analyze your CV against ATS criteria and provide compatibility scores</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">2</span>
                <span>To match your CV with job descriptions you provide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">3</span>
                <span>To improve our AI analysis models (anonymized data only)</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">4. Data Storage & Retention</h2>
            <p className="mb-4">
              Your CV data is processed in real-time and is <strong className="text-ink">not permanently stored</strong> on our servers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Uploaded PDF files are temporarily saved for text extraction and immediately deleted after processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>CV text is held in session storage on your browser and cleared when you close the tab</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Cloudflare AI processes your data transiently for analysis and does not retain it</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical measures to protect your data during transmission, including HTTPS encryption. Your CV content is transmitted securely and processed in memory only.
            </p>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">6. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span><strong className="text-ink">Cloudflare AI:</strong> Processes CV text for ATS analysis. Cloudflare does not log or store your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>We do not sell, rent, or share your personal data with any third parties for marketing purposes.</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Access, update, or delete any personal data we hold about you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Withdraw consent for data processing at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Request deletion of your CV data from our systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-ink shrink-0 mt-0.5">-</span>
                <span>Lodge a complaint with your local data protection authority</span>
              </li>
            </ul>
          </section>

          <section className="frame p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <h2 className="text-lg font-bold text-ink mb-3">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@atsscanner.com" className="text-ink underline font-medium">privacy@atsscanner.com</a>.
            </p>
            <p className="text-xs text-ink-muted mt-4">Last updated: June 2026</p>
          </section>
        </div>
      </div>
    </div>
  )
}
