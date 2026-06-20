import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-ink" />
            <span className="relative text-[10px] font-bold">A</span>
          </div>
          ATS Scanner
        </Link>
        <p className="text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} ATS Scanner. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
