import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-ink">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-ink" />
              <span className="relative text-[10px] font-bold">A</span>
            </div>
            ATS Scanner
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-xs text-ink-muted">
            <Link to="/cookies" className="hover:text-ink transition-colors">Cookies</Link>
            <span className="w-px h-3 bg-border-soft" />
            <Link to="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-ink-muted sm:hidden">
          <Link to="/cookies" className="hover:text-ink transition-colors">Cookies</Link>
          <span className="w-px h-3 bg-border-soft" />
          <Link to="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
        </div>
        <p className="text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} GetMyATS by <a href="https://github.com/Omar-khecharem" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink transition-colors">Omar Khecharem</a>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
