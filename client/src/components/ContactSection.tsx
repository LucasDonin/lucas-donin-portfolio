/*
 * Design: Dark Atelier — Galeria Noturna
 * Contato: Full-width section com background atmosférico, CTA grande, links sociais
 * Animações: Fade-up, scale, parallax background
 */

import { useRef } from 'react';
import { gsap } from 'gsap';
import Footer from './Footer';

const CTA_BG = '/wallpaper-glass.jpg';

const socialLinks = [
  { label: 'Behance', url: 'https://www.behance.net/LucasDoninn', icon: '→' },
  { label: 'Instagram', url: 'https://instagram.com/lucasdonin', icon: '→' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/lucasdonin', icon: '→' },
];

export default function ContactSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="contato" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        <div ref={bgRef} className="absolute inset-0 -top-20 -bottom-20">
          <img
            src={CTA_BG}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, oklch(1 0 0 / 0.4) 0%, oklch(1 0 0 / 0.6) 100%)',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center py-20">
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 gsap-fade-up">
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
              04
            </span>
            <div className="gsap-line-expand" style={{
              width: '60px',
              height: '1px',
              backgroundColor: 'oklch(0.72 0.12 75 / 0.4)',
            }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
              Contato
            </span>
          </div>

          {/* Main heading */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 md:mb-8 gsap-fade-up max-w-4xl mx-auto"
            style={{ color: 'oklch(0.15 0 0)', fontWeight: 700 }}>
            Pronto para <span style={{ color: 'oklch(0.72 0.12 75)' }}>transformar sua marca?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 gsap-fade-up"
            style={{ color: 'oklch(0.25 0 0)' }}>
            Estou sempre aberto a novos desafios e colaborações. Vamos conversar sobre seu projeto.
          </p>

          {/* CTA Button */}
          <a
            href="mailto:lucas@donin.com.br"
            className="inline-flex items-center gap-3 px-10 md:px-12 py-5 md:py-6 rounded-sm transition-all duration-300 hover:scale-105 group gsap-scale"
            style={{
              backgroundColor: 'oklch(0.72 0.12 75)',
              color: 'oklch(0 0 0)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            Enviar Email
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>

          {/* Social links */}
          <div className="mt-20 md:mt-32 flex flex-col items-center gap-8">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'oklch(0.25 0 0)' }}>
              Ou me encontre em
            </span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 gsap-stagger-parent">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-stagger-child group relative text-sm md:text-base transition-all duration-300"
                  style={{ color: 'oklch(0.15 0 0)' }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    {link.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'oklch(0.72 0.12 75)' }}>
                      {link.icon}
                    </span>
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300 group-hover:w-full"
                    style={{
                      width: '0%',
                      backgroundColor: 'oklch(0.72 0.12 75)',
                    }}
                  />
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
