const steps = [
  { step: '01', title: 'Upload your CV', desc: 'Paste your CV text or upload a PDF document.' },
  { step: '02', title: 'AI Analysis', desc: 'Our engine scans your CV against common ATS keywords and patterns.' },
  { step: '03', title: 'Get your ATS score', desc: 'Receive a detailed dashboard with keywords and AI recommendations.' },
]

export default function Solution() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-circle absolute" style={{ width: 200, height: 200, top: '60%', right: '-5%', opacity: 0.04 }} />
      <div className="geo-dot absolute" style={{ width: 10, height: 10, top: '15%', left: '15%', opacity: 0.06 }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            How it <span className="border-b-2 border-ink">works</span>
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto">
            Three simple steps to optimize your CV for any job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-ink/20" />
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="geo-dot" style={{ width: 6, height: 6, top: -2, left: `${16 + i * 34}%`, opacity: 0.3 }} />
            ))}
          </div>
          {steps.map((s) => (
            <div key={s.step} className="border-2 border-ink p-8 bg-surface">
              <div className="w-10 h-10 border-2 border-ink flex items-center justify-center text-sm font-bold text-ink mb-5 bg-surface">
                {s.step}
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
