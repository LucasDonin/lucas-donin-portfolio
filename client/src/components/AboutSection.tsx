import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            01
          </span>
          <div className="gsap-line-expand" style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'oklch(0.72 0.12 75 / 0.4)',
          }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            {t('about.label')}
          </span>
        </div>

        <div className="max-w-3xl">
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 gsap-fade-up"
            style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}
          >
            {t('about.title')}
            <br />
            <span style={{ color: 'oklch(0.72 0.12 75)' }}>{t('about.titleHighlight')}</span>
          </h2>

          <div className="gsap-line-expand mb-8" style={{
            width: '100%',
            maxWidth: '120px',
            height: '1px',
            backgroundColor: 'oklch(0.72 0.12 75 / 0.3)',
          }} />

          <div className="space-y-5 mb-12">
            <p className="text-base md:text-lg leading-relaxed gsap-fade-up" style={{ color: 'oklch(0.35 0 0)', fontWeight: 400 }}>
              {t('about.description1')}
            </p>
            <p className="text-base md:text-lg leading-relaxed gsap-fade-up" style={{ color: 'oklch(0.35 0 0)', fontWeight: 400 }}>
              {t('about.description2')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 gsap-stagger-parent mb-12">
            {[
              { number: '9+', key: 'about.experience' },
              { number: '150+', key: 'about.projects' },
              { number: '100%', key: 'about.satisfaction' },
            ].map((stat) => (
              <div key={stat.key} className="gsap-stagger-child">
                <span className="font-display text-3xl md:text-4xl block mb-1" style={{ color: 'oklch(0.72 0.12 75)' }}>
                  {stat.number}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'oklch(0.4 0 0)' }}>
                  {t(stat.key)}
                </span>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="gsap-fade-up">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: 'oklch(0.4 0 0)' }}>
              {t('about.tools')}
            </span>
            <div className="flex flex-wrap gap-3">
              {['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'After Effects'].map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-4 py-2 rounded-sm"
                  style={{
                    border: '1px solid oklch(0 0 0 / 0.15)',
                    color: 'oklch(0.3 0 0)',
                    backgroundColor: 'oklch(0 0 0 / 0.03)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
