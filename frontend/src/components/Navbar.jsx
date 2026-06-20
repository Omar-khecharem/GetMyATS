import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-surface/95 border-b border-border-soft' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-base font-semibold tracking-tight text-ink">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-ink" />
            <div className="absolute inset-[3px] border border-ink/30" />
            <span className="relative text-xs font-bold">A</span>
          </div>
          ATS Scanner
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isHome && navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-secondary hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="btn-solid px-5 py-2 rounded-none text-sm font-medium"
          >
            Analyze my CV
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[2px] bg-ink transition-all ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-ink transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-ink transition-all ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border-soft px-6 py-4 flex flex-col gap-4">
          {isHome && navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-secondary" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link to="/dashboard" className="btn-solid text-center px-5 py-2 rounded-none text-sm font-medium" onClick={() => setMobileOpen(false)}>
            Analyze my CV
          </Link>
        </div>
      )}
    </nav>
  )
}
