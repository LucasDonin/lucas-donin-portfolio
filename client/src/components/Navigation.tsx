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
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    // Animate nav in — no delay since preloader already handled timing
    gsap.fromTo('.nav-bar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`nav-bar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 backdrop-blur-xl' : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled ? 'oklch(1 0 0 / 0.95)' : 'transparent',
          borderBottom: scrolled
            ? '1px solid oklch(0.15 0 0 / 0.15)'
            : '1px solid transparent',
        }}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center h-8">
            <img src="/logo-donin.svg" alt="Donin Design Studio" className="h-full w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm tracking-wide transition-colors duration-300 group"
                style={{
                  color: activeSection === item.href.slice(1)
                    ? 'oklch(0.72 0.12 75)'
                    : 'oklch(0.35 0 0)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t(item.key)}
                <span
                  className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300 group-hover:w-full"
                  style={{
                    width: activeSection === item.href.slice(1) ? '100%' : '0%',
                    backgroundColor: 'oklch(0.72 0.12 75)',
                  }}
                />
              </a>
            ))}
            <a
              href="https://www.behance.net/LucasDoninn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'oklch(0.72 0.12 75)',
                color: 'oklch(0.15 0 0)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {t('nav.behance')}
            </a>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-sm transition-all duration-300 hover:scale-110 text-xs font-bold"
              style={{
                backgroundColor: 'oklch(0.72 0.12 75)',
                color: 'oklch(0.15 0 0)',
              }}
              aria-label="Toggle language"
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: 'oklch(0.15 0 0)',
                transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: 'oklch(0.15 0 0)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: 'oklch(0.15 0 0)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'oklch(1 0 0 / 0.97)' }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="font-display text-3xl tracking-tight transition-all duration-300"
            style={{
              color: 'oklch(0.15 0 0)',
              transitionDelay: menuOpen ? `${i * 0.1}s` : '0s',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {t(item.key)}
          </a>
        ))}
        <a
          href="https://www.behance.net/LucasDoninn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-6 py-3 rounded-sm mt-4"
          style={{
            backgroundColor: 'oklch(0.72 0.12 75)',
            color: 'oklch(0.15 0 0)',
            fontWeight: 500,
          }}
        >
          {t('nav.behance')}
        </a>
      </div>

      {/* Side dots navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'oklch(0.72 0.12 75)' }}
            >
              {t(item.key)}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: activeSection === item.href.slice(1) ? '10px' : '6px',
                height: activeSection === item.href.slice(1) ? '10px' : '6px',
                backgroundColor: activeSection === item.href.slice(1)
                  ? 'oklch(0.72 0.12 75)'
                  : 'oklch(0.15 0 0 / 0.3)',
                boxShadow: activeSection === item.href.slice(1)
                  ? '0 0 10px oklch(0.72 0.12 75 / 0.5)'
                  : 'none',
              }}
            />
          </a>
        ))}
      </div>
    </>
  );
}
