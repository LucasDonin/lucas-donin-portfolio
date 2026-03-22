import { useLanguage } from '@/contexts/LanguageContext';

const footerNavItems = [
  { key: 'nav.about', href: '#sobre' },
  { key: 'nav.projects', href: '#projetos' },
  { key: 'nav.process', href: '#processo' },
  { key: 'nav.contact', href: '#contato' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      className="relative py-8 border-t"
      style={{ borderColor: 'oklch(0 0 0 / 0.15)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg mb-2" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              Donin<span style={{ color: 'oklch(0.72 0.12 75)' }}>design</span>
            </h3>
            <p className="text-sm" style={{ color: 'oklch(0.4 0 0)' }}>
              {t('footer.brand')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors duration-300 hover:text-gold"
                    style={{ color: 'oklch(0.35 0 0)' }}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@donindesign.com"
                  className="transition-colors duration-300 hover:text-gold"
                  style={{ color: 'oklch(0.35 0 0)' }}
                >
                  hello@donindesign.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/LucasDoninn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold"
                  style={{ color: 'oklch(0.35 0 0)' }}
                >
                  Behance Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs"
          style={{ borderColor: 'oklch(0 0 0 / 0.15)', color: 'oklch(0.35 0 0)' }}
        >
          <span>© {currentYear} Donindesign. {t('footer.copyright')}</span>
          <img
            src="/logo-donin.svg"
            alt="Donin Design Studio"
            className="h-6 w-auto mt-4 md:mt-0"
            style={{ filter: 'brightness(0)' }}
          />
        </div>
      </div>
    </footer>
  );
}
