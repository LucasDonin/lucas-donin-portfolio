import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    tl.fromTo('.hero-char',
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.04, ease: 'power3.out' },
      0
    );
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 20, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      0.6
    );
    tl.fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.9
    );
    tl.fromTo('.hero-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
      0.5
    );
    tl.fromTo('.hero-scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      1.2
    );

    return () => { tl.kill(); };
  }, []);

  const titleLine1 = 'Branding';
  const titleLine2 = '& Packaging';

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0.09 0.004 80)' }} />

      <div className="relative z-10 container text-center pt-20">
        <p
          className="hero-subtitle text-sm md:text-base tracking-[0.35em] uppercase mb-6 md:mb-8 opacity-0"
          style={{ color: 'oklch(0.70 0.09 140)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
        >
          {t('hero.subtitle')}
        </p>

        <h1 className="font-display mb-6 md:mb-8 leading-[0.9] perspective-[800px]">
          <span
            className="block text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight"
            style={{ color: 'oklch(0.92 0.01 80)' }}
          >
            {titleLine1.split('').map((char, i) => (
              <span key={`l1-${i}`} className="hero-char inline-block opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span
            className="block text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight"
            style={{ color: 'oklch(0.70 0.09 140)' }}
          >
            {titleLine2.split('').map((char, i) => (
              <span key={`l2-${i}`} className="hero-char inline-block opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>

        <div
          className="hero-line mx-auto mb-8 md:mb-10"
          style={{ width: '80px', height: '2px', background: 'oklch(0.70 0.09 140)', transformOrigin: 'center' }}
        />

        <p
          className="hero-desc max-w-lg mx-auto text-base md:text-lg leading-relaxed opacity-0"
          style={{ color: 'oklch(0.62 0.005 80)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          {t('hero.description')}
        </p>
      </div>

      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'oklch(0.45 0.005 80)' }}>
          {t('hero.scroll')}
        </span>
        <div className="w-[1px] h-8 overflow-hidden">
          <div className="w-full h-full animate-scroll-line" style={{ backgroundColor: 'oklch(0.70 0.09 140)' }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line { animation: scroll-line 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
