/*
 * Design: Dark Atelier — Galeria Noturna
 * Hero: Full viewport, tipografia grande centralizada, fundo escuro com imagem atmosférica
 * Animações: Texto split por letra, parallax no background, fade-in sequencial
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HERO_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/R6alShkPWm8G70GRh8rSjP/sandbox/HqHNZxXiMOaW7jjlikc0Ld-img-1_1771979921000_na1fn_aGVyby1iZy1kYXJr.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjZhbFNoa1BXbThHNzBHUmg4clNqUC9zYW5kYm94L0hxSE5aeFhpTU9hVzdqamxpa2MwTGQtaW1nLTFfMTc3MTk3OTkyMTAwMF9uYTFmbl9hR1Z5YnkxaVp5MWtZWEpyLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lPTVu6trQPZZrPD9RTjYXQ20DLYIsaS7KXX3BjSZYeV07QRsIDgccSwpIdeRjpRR2xB9WnEEL4Z0FYzji-bJMqiM6p0I6Qjh8RBCow9HXW5~QtcSrBCg-otB-W0ho-PmpinpnPWN7jcMMPBZ3CMjqZi1A7BCZd95bBI6DIe78yb68Os-ZbeSNGd9UqD~iGt8Q4REyeyl6KyioGUIfCbjjvkpUHdBWnWxGKSl8nMNJTwT7zo~pq-rsgh1nHxDSSN1266bcr2izzOKs6I6DmAIAhXoU16iHVu5kmb7s7GI4CLbqPGSy2tqsjZkK6EQxKeXWllxgR6rHKzGkhZ30AmyuQ__';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.4 });

    // Background fade in
    tl.fromTo('.hero-bg-img',
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 2, ease: 'power3.out' },
      0
    );

    // Main title chars
    tl.fromTo('.hero-char',
      { opacity: 0, y: 80, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' },
      0.3
    );

    // Subtitle
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.2
    );

    // Description
    tl.fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.5
    );

    // Line
    tl.fromTo('.hero-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
      1.0
    );

    // Scroll indicator
    tl.fromTo('.hero-scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      1.8
    );

    // Parallax on scroll
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    return () => { tl.kill(); };
  }, []);

  const titleLine1 = 'Direção de Arte';
  const titleLine2 = '& Branding';

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={HERO_BG}
          alt=""
          className="hero-bg-img w-full h-full object-cover opacity-0"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, oklch(1 0 0 / 0.3) 0%, oklch(1 0 0 / 0.5) 60%, oklch(1 0 0) 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center pt-20">
        <p className="hero-subtitle text-sm md:text-base tracking-[0.35em] uppercase mb-6 md:mb-8 opacity-0"
          style={{ color: 'oklch(0.72 0.12 75)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          Lucas Donin — Portfólio
        </p>

        <h1 className="font-display mb-6 md:mb-8 leading-[0.9] perspective-[800px]">
          <span className="block text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight" style={{ color: 'oklch(0.15 0 0)' }}>
            {titleLine1.split('').map((char, i) => (
              <span key={`l1-${i}`} className="hero-char inline-block opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span className="block text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight" style={{ color: 'oklch(0.72 0.12 75)' }}>
            {titleLine2.split('').map((char, i) => (
              <span key={`l2-${i}`} className="hero-char inline-block opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-line mx-auto mb-8 md:mb-10 origin-left" style={{
          width: '80px',
          height: '2px',
          background: 'oklch(0.72 0.12 75)',
          transformOrigin: 'center',
        }} />

        <p className="hero-desc max-w-lg mx-auto text-base md:text-lg leading-relaxed opacity-0"
          style={{ color: 'oklch(0.35 0 0)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
          Quase uma década transformando marcas em experiências visuais memoráveis.
          Especialista em branding, packaging e direção de arte.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'oklch(0.4 0 0)' }}>
          Scroll
        </span>
          <div className="w-[1px] h-8 overflow-hidden">
          <div className="w-full h-full animate-scroll-line" style={{ backgroundColor: 'oklch(0.72 0.12 75)' }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
