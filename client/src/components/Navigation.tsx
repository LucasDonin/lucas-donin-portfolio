import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { key: 'nav.about', href: '#sobre' },
  { key: 'nav.projects', href: '#projetos' },
  { key: 'nav.process', href: '#processo' },
  { key: 'nav.contact', href: '#contato' },
];

export default function Navigation() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [heroSection, setHeroSection] = useState(true); /* hero tem fundo claro */
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const heroHeight = window.innerHeight;
      setHeroSection(y < heroHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }),
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    gsap.fromTo('.nav-bar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  /* Cores adaptam ao fundo: claro no hero, escuro nas demais seções */
  const linkColor = activeSection && !heroSection
    ? (activeSection === 'sobre' || activeSection === 'projetos' || activeSection === 'processo' || activeSection === 'contato'
      ? '#D2D2D2' : '#D2D2D2')
    : '#444';
  const activeLinkColor = 'oklch(0.78 0.14 88)';

  return (
    <>
      <nav
        className="nav-bar fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          /* Glass mais transparente — fundo mais visível */
          background: scrolled
            ? heroSection
              ? 'rgba(210, 210, 210, 0.40)'   /* sobre hero claro */
              : 'rgba(30, 30, 30, 0.45)'        /* sobre seções escuras */
            : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(150%)' : 'none',
          borderBottom: scrolled
            ? heroSection
              ? '1px solid rgba(0,0,0,0.08)'
              : '1px solid rgba(255,255,255,0.10)'
            : '1px solid transparent',
        }}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center h-8">
            <img
              src="/logo-donin.svg"
              alt="Donin Design Studio"
              className="h-full w-auto"
              style={{ filter: heroSection ? 'brightness(0)' : 'brightness(10)' }}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm tracking-wide transition-colors duration-300 group"
                style={{
                  color: activeSection === item.href.slice(1) ? activeLinkColor : (heroSection ? '#555' : '#D2D2D2'),
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t(item.key)}
                <span
                  className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300 group-hover:w-full"
                  style={{ width: activeSection === item.href.slice(1) ? '100%' : '0%', backgroundColor: activeLinkColor }}
                />
              </a>
            ))}

            {/* Botão Behance */}
            <a
              href="https://www.behance.net/LucasDoninn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: heroSection ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: heroSection ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.15)',
                color: heroSection ? '#242424' : '#D2D2D2',
                fontWeight: 600,
              }}
            >
              {t('nav.behance')}
            </a>

            {/* Botão PT/EN */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 text-xs font-bold"
              style={{
                background: heroSection ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: heroSection ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.12)',
                color: 'oklch(0.78 0.14 88)',
              }}
              aria-label="Toggle language"
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-[1.5px] transition-all duration-300" style={{
                backgroundColor: heroSection ? '#242424' : '#D2D2D2',
                opacity: i === 1 && menuOpen ? 0 : 1,
                transform: i === 0 && menuOpen ? 'rotate(45deg) translateY(6px)' : i === 2 && menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(28, 28, 28, 0.92)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
      >
        {navItems.map((item, i) => (
          <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)}
            className="font-display text-3xl tracking-tight transition-all duration-300"
            style={{ color: '#D2D2D2', transitionDelay: menuOpen ? `${i * 0.1}s` : '0s', transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0 }}>
            {t(item.key)}
          </a>
        ))}
      </div>

      {/* Side dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="group flex items-center gap-3 justify-end">
            <span className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'oklch(0.78 0.14 88)' }}>
              {t(item.key)}
            </span>
            <span className="block rounded-full transition-all duration-300" style={{
              width: activeSection === item.href.slice(1) ? '10px' : '6px',
              height: activeSection === item.href.slice(1) ? '10px' : '6px',
              backgroundColor: activeSection === item.href.slice(1) ? 'oklch(0.78 0.14 88)' : 'rgba(210,210,210,0.25)',
              boxShadow: activeSection === item.href.slice(1) ? '0 0 10px oklch(0.78 0.14 88 / 0.5)' : 'none',
            }} />
          </a>
        ))}
      </div>
    </>
  );
}
