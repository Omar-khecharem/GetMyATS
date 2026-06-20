import { useEffect, useRef } from 'react'

export default function AtsScoreCircle({ score = 0, size = 160, strokeWidth = 6 }) {
  const circleRef = useRef(null)
  const numRef = useRef(null)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const circle = circleRef.current
    const numEl = numRef.current
    if (!circle || !numEl) return

    const startTime = performance.now()
    const duration = 1500

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * score)

      const offset = circumference - (current / 100) * circumference
      circle.style.strokeDashoffset = offset
      numEl.textContent = current

      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [score, circumference])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 geo-circle !border-[1px]" style={{ width: size + 16, height: size + 16, top: -8, left: -8, opacity: 0.2 }} />
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0dfdd"
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span ref={numRef} className="text-3xl font-bold tracking-tight text-ink">0</span>
        <span className="text-[10px] text-ink-muted uppercase tracking-[0.2em] mt-0.5">Score</span>
      </div>
    </div>
  )
}
