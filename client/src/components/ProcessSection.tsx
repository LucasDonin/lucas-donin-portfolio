import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { number: '01', details: ['Pesquisa de mercado', 'Análise de concorrência', 'Entrevistas estratégicas'] },
  { number: '02', details: ['Definição de conceito', 'Paleta de cores', 'Tipografia e elementos'] },
  { number: '03', details: ['Design de marca', 'Packaging e materiais', 'Guia de estilo'] },
  { number: '04', details: ['Apresentação executiva', 'Manual de marca', 'Arquivos finais'] },
];
const stepKeys = ['discovery', 'strategy', 'execution', 'delivery'] as const;

function SplitHeading({ text, highlight, className }: { text: string; highlight?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.s-char');
    gsap.fromTo(chars,
      { opacity: 0, y: 30, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.025, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    );
  }, [text]);
  const renderChars = (str: string, color?: string) =>
    str.split('').map((c, i) => (
      <span key={i} className="s-char inline-block opacity-0" style={color ? { color } : undefined}>
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));
  return (
    <h2 ref={ref} className={className}>
      {renderChars(text)}
      {highlight && <>{' '}<span>{renderChars(highlight, 'oklch(0.70 0.09 140)')}</span></>}
    </h2>
  );
}

export default function ProcessSection() {
  const { t } = useLanguage();
  return (
    <section id="processo" className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: 'oklch(0.09 0.004 80)' }}>
      <div className="container">
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.70 0.09 140)' }}>03</span>
          <div className="gsap-line-expand" style={{ width: '60px', height: '1px', backgroundColor: 'oklch(0.70 0.09 140 / 0.4)' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.70 0.09 140)' }}>{t('process.label')}</span>
        </div>

        <SplitHeading
          text={t('process.title')}
          highlight={t('process.subtitle')}
          className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-16 md:mb-24 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 gsap-stagger-parent">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="gsap-stagger-child relative">
              <span
                className="font-display text-6xl md:text-7xl lg:text-8xl absolute -top-8 -left-4"
                style={{ color: 'oklch(0.70 0.09 140)', opacity: 0.07 }}
              >
                {step.number}
              </span>

              <div
                className="relative p-8 md:p-10 rounded-xl transition-all duration-500 group hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: '0 0 30px oklch(0.70 0.09 140 / 0.12)' }} />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-2xl font-semibold" style={{ color: 'oklch(0.70 0.09 140)' }}>
                      {step.number}
                    </span>
                    <div className="gsap-line-expand flex-1" style={{ height: '1px', backgroundColor: 'oklch(0.70 0.09 140 / 0.2)' }} />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: 'oklch(0.92 0.01 80)', fontWeight: 700 }}>
                    {t(`process.${stepKeys[idx]}`)}
                  </h3>

                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'oklch(0.62 0.005 80)' }}>
                    {t(`process.${stepKeys[idx]}Desc`)}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-xs md:text-sm" style={{ color: 'oklch(0.45 0.005 80)' }}>
                        <span className="inline-block w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'oklch(0.70 0.09 140)' }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
