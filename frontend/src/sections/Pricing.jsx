import PricingCard, { plans } from '../components/PricingCard'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-square absolute" style={{ width: 200, height: 200, bottom: '10%', right: '-5%', opacity: 0.03, transform: 'rotate(60deg)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Simple, transparent <span className="border-b-2 border-ink">pricing</span>
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto">
            Choose the plan that fits your job search needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {plans.map((p) => (
            <PricingCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
