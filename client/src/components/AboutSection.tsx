import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function SplitHeading({ text, highlight, className, style }: {
  text: string; highlight?: string; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.s-char');
    gsap.fromTo(chars,
      { opacity: 0, y: 30, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.6, stagger: 0.03, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
  }, []);

  const renderChars = (str: string, color?: string) =>
    str.split('').map((c, i) => (
      <span key={i} className="s-char inline-block opacity-0" style={color ? { color } : undefined}>
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));

  return (
    <h2 ref={ref} className={className} style={style}>
      {renderChars(text)}
      {highlight && (
        <>
          <br />
          <span>{renderChars(highlight, 'oklch(0.70 0.09 140)')}</span>
        </>
      )}
    </h2>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: 'oklch(0.09 0.004 80)' }}>
      <div className="container">
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.70 0.09 140)' }}>01</span>
          <div className="gsap-line-expand" style={{ width: '60px', height: '1px', backgroundColor: 'oklch(0.70 0.09 140 / 0.4)' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.70 0.09 140)' }}>{t('about.label')}</span>
        </div>

        <div className="max-w-3xl">
          <SplitHeading
            text={t('about.title')}
            highlight={t('about.titleHighlight')}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
            style={{ color: 'oklch(0.92 0.01 80)', fontWeight: 700 }}
          />

          <div className="gsap-line-expand mb-8" style={{ width: '120px', height: '1px', backgroundColor: 'oklch(0.70 0.09 140 / 0.3)' }} />

          <div className="space-y-5 mb-12">
            <p className="text-base md:text-lg leading-relaxed gsap-fade-up" style={{ color: 'oklch(0.62 0.005 80)' }}>
              {t('about.description1')}
            </p>
            <p className="text-base md:text-lg leading-relaxed gsap-fade-up" style={{ color: 'oklch(0.62 0.005 80)' }}>
              {t('about.description2')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 gsap-stagger-parent mb-12">
            {[
              { number: '9+', key: 'about.experience' },
              { number: '150+', key: 'about.projects' },
              { number: '100%', key: 'about.satisfaction' },
            ].map((stat) => (
              <div key={stat.key} className="gsap-stagger-child">
                <span className="font-display text-3xl md:text-4xl block mb-1" style={{ color: 'oklch(0.70 0.09 140)' }}>
                  {stat.number}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'oklch(0.45 0.005 80)' }}>
                  {t(stat.key)}
                </span>
              </div>
            ))}
          </div>

          <div className="gsap-fade-up">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: 'oklch(0.45 0.005 80)' }}>
              {t('about.tools')}
            </span>
            <div className="flex flex-wrap gap-3">
              {['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'After Effects'].map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-4 py-2 rounded-md"
                  style={{
                    border: '1px solid oklch(0.92 0.01 80 / 0.10)',
                    color: 'oklch(0.62 0.005 80)',
                    backgroundColor: 'oklch(0.92 0.01 80 / 0.04)',
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
