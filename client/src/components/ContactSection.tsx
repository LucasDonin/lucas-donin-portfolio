import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'Behance', url: 'https://www.behance.net/LucasDoninn', icon: '→' },
  { label: 'Instagram', url: 'https://instagram.com/lucasdonin', icon: '→' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/lucasdonin', icon: '→' },
];

function SplitHeading({ before, highlight, className }: { before: string; highlight: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.s-char');
    gsap.fromTo(chars,
      { opacity: 0, y: 30, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.025, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    );
  }, [before, highlight]);

  const renderChars = (str: string, color?: string) =>
    str.split('').map((c, i) => (
      <span key={i} className="s-char inline-block opacity-0" style={color ? { color } : undefined}>
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));

  return (
    <h2 ref={ref} className={className} style={{ color: ''#D2D2D2'', fontWeight: 700 }}>
      {renderChars(before + ' ')}
      <span>{renderChars(highlight, 'oklch(0.78 0.14 88)')}</span>
    </h2>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <>
      <section
        id="contato"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: ''#242424'' }}
      >
        {/* Subtle glow bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 30% 60%, oklch(0.70 0.09 140 / 0.06) 0%, transparent 55%)',
        }} />

        <div className="relative z-10 container text-center py-20">
          <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 gsap-fade-up">
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>04</span>
            <div className="gsap-line-expand" style={{ width: '60px', height: '1px', backgroundColor: 'oklch(0.70 0.09 140 / 0.4)' }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>{t('contact.label')}</span>
          </div>

          <SplitHeading
            before={t('contact.title')}
            highlight={t('contact.titleHighlight')}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 md:mb-8 max-w-4xl mx-auto"
          />

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 gsap-fade-up" style={{ color: 'oklch(0.55 0.005 80)' }}>
            {t('contact.description')}
          </p>

          {/* CTA button — dark glass com borda oliva */}
          <a
            href="mailto:hello@donindesign.com"
            className="inline-flex items-center gap-3 px-10 md:px-12 py-5 md:py-6 rounded-xl transition-all duration-300 hover:scale-105 group gsap-scale"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid oklch(0.70 0.09 140 / 0.45)',
              boxShadow: '0 6px 32px oklch(0.70 0.09 140 / 0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
              color: 'oklch(0.78 0.14 88)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {t('contact.email')}
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>

          <div className="mt-20 md:mt-32 flex flex-col items-center gap-8">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: ''#777'' }}>
              {t('contact.social')}
            </span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 gsap-stagger-parent">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-stagger-child group relative text-sm md:text-base transition-all duration-300"
                  style={{ color: ''#999'' }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    {link.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'oklch(0.78 0.14 88)' }}>
                      {link.icon}
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300 group-hover:w-full"
                    style={{ width: '0%', backgroundColor: 'oklch(0.78 0.14 88)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
