import FeatureCard from '../components/FeatureCard'

const features = [
  {
    icon: 'score',
    title: 'ATS Score',
    description: 'Get an instant compatibility score from 0 to 100 based on keyword matching against common ATS criteria.',
  },
  {
    icon: 'keywords',
    title: 'Keyword Detection',
    description: 'Identify exactly which common ATS keywords appear in your CV and which are missing.',
  },
  {
    icon: 'ai',
    title: 'AI Suggestions',
    description: 'Receive intelligent recommendations powered by AI to improve your CV.',
  },
  {
    icon: 'optimize',
    title: 'CV Optimization',
    description: 'Actionable tips to rephrase and restructure your CV for maximum ATS compatibility.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 350, height: 350, bottom: '-10%', left: '-10%', opacity: 0.03 }} />
      <div className="geo-dot absolute" style={{ width: 8, height: 8, top: '30%', right: '10%', opacity: 0.08 }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Everything you need to{' '}
            <span className="border-b-2 border-ink">ace the ATS</span>
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto">
            Powerful tools to analyze, optimize, and personalize your CV for every application.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
