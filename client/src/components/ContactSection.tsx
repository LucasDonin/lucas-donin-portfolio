/*
 * Design: Dark Atelier — Galeria Noturna
 * Contato: Full-width section com background atmosférico, CTA grande, links sociais
 * Animações: Fade-up, scale, parallax background
 */

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from './Footer';

const CTA_BG = '/wallpaper-glass.jpg';

const socialLinks = [
  { label: 'Behance', url: 'https://www.behance.net/LucasDoninn', icon: '→' },
  { label: 'Instagram', url: 'https://instagram.com/lucasdonin', icon: '→' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/lucasdonin', icon: '→' },
];

export default function ContactSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <>
      <section id="contato" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, oklch(1 0 0) 0%, oklch(0.98 0 0) 100%)' }}>
        {/* Glassmorphism background */}
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 20% 50%, oklch(0.72 0.12 75 / 0.1) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(circle at 80% 80%, oklch(0.72 0.12 75 / 0.08) 0%, transparent 50%)',
        }} />

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
              {t('contact.label')}
            </span>
          </div>

          {/* Main heading */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 md:mb-8 gsap-fade-up max-w-4xl mx-auto"
            style={{ color: 'oklch(0.15 0 0)', fontWeight: 700 }}>
            {t('contact.title')} <span style={{ color: 'oklch(0.72 0.12 75)' }}>{t('contact.titleHighlight')}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 gsap-fade-up"
            style={{ color: 'oklch(0.25 0 0)' }}>
            {t('contact.description')}
          </p>

          {/* CTA Button */}
          <a
            href="mailto:hello@donindesign.com"
            className="inline-flex items-center gap-3 px-10 md:px-12 py-5 md:py-6 rounded-sm transition-all duration-300 hover:scale-105 group gsap-scale"
            style={{
              backgroundColor: 'oklch(0.72 0.12 75)',
              color: 'oklch(0 0 0)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {t('contact.email')}
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>

          {/* Social links */}
          <div className="mt-20 md:mt-32 flex flex-col items-center gap-8">
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'oklch(0.25 0 0)' }}>
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
