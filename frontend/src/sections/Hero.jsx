import { useNavigate } from 'react-router-dom'
import ThreeScene from '../components/ThreeScene'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 500, height: 500, top: '-15%', right: '-10%', opacity: 0.04 }} />
      <div className="geo-square absolute" style={{ width: 200, height: 200, bottom: '10%', left: '-5%', opacity: 0.04, transform: 'rotate(45deg)' }} />
      <div className="geo-triangle absolute" style={{ width: 0, height: 0, borderLeft: '80px solid transparent', borderRight: '80px solid transparent', borderBottom: '140px solid rgba(26,26,26,0.03)', top: '30%', left: '10%' }} />
      <div className="geo-dot absolute" style={{ width: 12, height: 12, top: '20%', right: '30%', opacity: 0.08 }} />
      <div className="geo-dot absolute" style={{ width: 6, height: 6, bottom: '25%', right: '15%', opacity: 0.1 }} />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-ink text-xs font-medium text-ink mb-6">
              <span className="w-1.5 h-1.5 bg-ink" />
              AI-Powered ATS Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-ink mb-6">
              Get hired faster with{' '}
              <span className="border-b-2 border-ink">AI-powered</span>{' '}
              ATS analysis
            </h1>
            <p className="text-base text-ink-secondary max-w-lg leading-relaxed mb-8">
              Upload your CV and get an instant ATS compatibility score with a full dashboard and actionable recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-solid px-8 py-4 text-base font-semibold"
              >
                Analyze my CV
              </button>
              <a
                href="#demo"
                className="btn-outline px-8 py-4 text-base font-semibold"
              >
                See how it works
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t-2 border-ink">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 border-2 border-ink bg-surface flex items-center justify-center text-[10px] font-bold text-ink"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-muted">
                <span className="text-ink font-medium">12,000+</span> job seekers optimized
              </p>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            <div className="absolute inset-0">
              <ThreeScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
