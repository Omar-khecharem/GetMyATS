const stats = [
  { value: 75, label: 'of CVs rejected by ATS', suffix: '%' },
  { value: 90, label: 'of top companies use ATS', suffix: '%' },
  { value: 3, label: 'seconds to screen a CV', suffix: 's' },
]

export default function Problem() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 250, height: 250, top: '10%', left: '-8%', opacity: 0.04 }} />
      <div className="geo-square absolute" style={{ width: 120, height: 120, bottom: '20%', right: '-3%', opacity: 0.04, transform: 'rotate(30deg)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            The harsh reality of{' '}
            <span className="border-b-2 border-ink">job applications</span>
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto">
            Most companies use Applicant Tracking Systems to filter CVs before a human ever sees them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="border-2 border-ink p-8 text-center bg-surface">
              <span className="text-4xl md:text-5xl font-bold text-ink">
                {s.value}{s.suffix}
              </span>
              <p className="mt-3 text-sm text-ink-secondary">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-2 border-ink p-8 text-center max-w-2xl mx-auto bg-surface">
          <p className="text-ink-secondary text-sm leading-relaxed">
            Without optimizing for ATS, your dream job might never reach a recruiter's desk.
            <br />
            <strong className="text-ink">We fix that.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
