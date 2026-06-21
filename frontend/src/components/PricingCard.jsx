const plans = [
  {
    name: 'Free',
    price: '0',
    desc: 'Perfect for getting started',
    features: ['3 analyses per month', 'Basic keyword matching', 'Score overview'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '19',
    desc: 'For serious job seekers',
    features: ['Unlimited analyses', 'AI-powered suggestions', 'PDF upload', 'Detailed keyword report'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '49',
    desc: 'For career changers & professionals',
    features: ['Everything in Pro', 'Priority AI processing', 'CV rewrite suggestions', 'Cover letter generator', 'API access'],
    popular: false,
  },
]

import { useNavigate } from 'react-router-dom'

export default function PricingCard({ name, price, desc, features, popular }) {
  const navigate = useNavigate()

  return (
    <div
      className={`relative border-2 transition-all duration-300 ${
        popular ? 'border-ink bg-ink text-white scale-105' : 'border-ink bg-surface text-ink hover:bg-ink hover:text-white'
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white border-2 border-ink text-ink text-xs font-medium">
          Most popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-base font-semibold mb-1">{name}</h3>
        <p className="text-sm text-inherit opacity-60 mb-4">{desc}</p>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-sm opacity-40">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/payment', { state: { plan: name, price } })}
          className={`w-full py-3 border-2 text-sm font-medium transition-all duration-300 ${
            popular
              ? 'border-white text-white hover:bg-white hover:text-ink'
              : 'border-ink text-ink hover:bg-ink hover:text-white group-hover:border-white group-hover:text-white'
          }`}
        >
          Get started
        </button>
      </div>
    </div>
  )
}

export { plans }
