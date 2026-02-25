/*
 * Design: Dark Atelier — Galeria Noturna
 * Contato: Full-width section com background atmosférico, CTA grande, links sociais
 * Animações: Fade-up, scale, parallax background
 */

import { useRef } from 'react';
import { gsap } from 'gsap';
import Footer from './Footer';

const CTA_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/R6alShkPWm8G70GRh8rSjP/sandbox/HqHNZxXiMOaW7jjlikc0Ld-img-5_1771979919000_na1fn_Y3RhLXNlY3Rpb24tYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjZhbFNoa1BXbThHNzBHUmg4clNqUC9zYW5kYm94L0hxSE5aeFhpTU9hVzdqamxpa2MwTGQtaW1nLTVfMTc3MTk3OTkxOTAwMF9uYTFmbl9ZM1JoTFhObFkzUnBiMjR0WW1jLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=XJ6q5R7dxWn4-nJfFb9lPrXAwZkSps6Y-eUix42Jm1ce3ZuRNTVzJsk5ZMU8~6b9wNLeoRbeDZ6j3ziQAkfvfRbpUrwIwoyjIIzAcz5ELcRXy5iraVxFMGg7~Oys0RzvWYOv~pEDVyyi16ggcQu7BgL8P2hKIEZZ4Bc9yF~sy2b9asjCsmVD7OC9rHNOGER~hoMtakL06GlBHL2HdB1NNixaDPDYXTd6gNcHZ-esejtoiyupjx9MN95bIUHATWh9MXO~2fM5vlsT~CQb2M82scVyv6P2zJSK95zlkXXxkQWpLHW4vyPPu4Urr40T6geSbmcpJincxTmhpH1Q9PVkGg__';

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
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, oklch(0 0 0 / 0.6) 0%, oklch(0 0 0 / 0.8) 100%)',
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
            style={{ color: 'oklch(1 0 0)', fontWeight: 700 }}>
            Pronto para <span style={{ color: 'oklch(0.72 0.12 75)' }}>transformar sua marca?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 gsap-fade-up"
            style={{ color: 'oklch(0.8 0 0)' }}>
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
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'oklch(0.4 0 0)' }}>
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
                  style={{ color: 'oklch(1 0 0)' }}
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
