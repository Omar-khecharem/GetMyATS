import { useNavigate } from 'react-router-dom'

export default function CtaFinal() {
  const navigate = useNavigate()

  return (
    <section className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 400, height: 400, top: '-20%', left: '-10%', opacity: 0.03 }} />
      <div className="geo-circle absolute" style={{ width: 200, height: 200, bottom: '-10%', right: '-5%', opacity: 0.03 }} />

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-ink mb-6">
          Ready to get{' '}
          <span className="border-b-2 border-ink">hired faster?</span>
        </h2>
        <p className="text-ink-secondary mb-10 max-w-lg mx-auto">
          Join thousands of job seekers who land more interviews with AI-powered CV optimization.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-solid px-10 py-5 text-lg font-semibold"
        >
          Analyze your CV now
        </button>
      </div>
    </section>
  )
}
