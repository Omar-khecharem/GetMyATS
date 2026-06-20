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
}

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="frame-thin p-7 transition-all duration-300 hover:bg-ink hover:text-white group">
      <div className="w-11 h-11 border-2 border-ink flex items-center justify-center text-ink mb-5 group-hover:border-white group-hover:text-white transition-colors">
        {icons[icon]}
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-ink-secondary leading-relaxed group-hover:text-white/70 transition-colors">{description}</p>
    </div>
  )
}
