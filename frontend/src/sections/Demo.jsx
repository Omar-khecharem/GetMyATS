import AtsScoreCircle from '../components/AtsScoreCircle'

export default function Demo() {
  return (
    <section id="demo" className="py-24 md:py-32 relative">
      <div className="fixed inset-0 geo-grid pointer-events-none" />
      <div className="geo-square absolute" style={{ width: 180, height: 180, top: '20%', right: '-4%', opacity: 0.03, transform: 'rotate(45deg)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            See it in <span className="border-b-2 border-ink">action</span>
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto">
            Real-time ATS analysis preview.
          </p>
        </div>

        <div className="frame max-w-3xl mx-auto">
          <div className="border-b-2 border-ink px-6 py-3 flex items-center gap-2 bg-canvas-alt">
            <div className="w-3 h-3 border-2 border-ink" />
            <div className="w-3 h-3 border-2 border-ink" />
            <div className="w-3 h-3 border-2 border-ink" />
            <span className="ml-3 text-xs text-ink-muted uppercase tracking-[0.1em]">ATS Analysis Result</span>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <AtsScoreCircle score={82} size={180} strokeWidth={8} />
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Excellent match!</h3>
                  <p className="text-sm text-ink-secondary">
                    Your CV is well-aligned with ATS best practices.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-found">React</span>
                  <span className="tag-found">TypeScript</span>
                  <span className="tag-found">Node.js</span>
                  <span className="tag-missing">Docker</span>
                  <span className="tag-missing">AWS</span>
                </div>
                <div className="pt-4 border-t-2 border-ink">
                  <p className="text-xs text-ink-muted uppercase tracking-[0.15em] mb-3 font-medium">Improvement tips</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-ink-secondary">
                      <span className="w-2 h-2 border border-ink mt-1.5 shrink-0" />
                      Add Docker experience to your CV
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-secondary">
                      <span className="w-2 h-2 border border-ink mt-1.5 shrink-0" />
                      Include AWS cloud certifications
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
