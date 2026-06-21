import { Link } from 'react-router-dom'

const icons = {
  score: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  keywords: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 0 1 4-4z" /><path d="M8 14h8" /><path d="M10 18h4" /><path d="M12 22v-2" />
    </svg>
  ),
  optimize: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  enhance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <polyline points="20 6 9 17 4 12" /><path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
    </svg>
  ),
  match: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  interview: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  tips: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

function CardContent({ icon, title, description }) {
  return (
    <>
      <div className="w-11 h-11 border-2 border-ink flex items-center justify-center text-ink mb-5 group-hover:border-white group-hover:text-white transition-colors">
        {icons[icon]}
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-ink-secondary leading-relaxed group-hover:text-white/70 transition-colors">{description}</p>
    </>
  )
}

export default function FeatureCard({ icon, title, description, link }) {
  if (link) {
    return (
      <Link to={link} className="frame-thin p-7 block transition-all duration-300 hover:bg-ink hover:text-white group">
        <CardContent icon={icon} title={title} description={description} />
      </Link>
    )
  }
  return (
    <div className="frame-thin p-7 transition-all duration-300 hover:bg-ink hover:text-white group">
      <CardContent icon={icon} title={title} description={description} />
    </div>
  )
}
