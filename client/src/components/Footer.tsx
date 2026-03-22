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
    <footer className="relative py-8 border-t" style={{ borderColor: 'rgba(210,210,210,0.08)', backgroundColor: '#242424' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            {/* Logo DNN ao invés de texto */}
            <img src="/logo-dnn.webp" alt="DNN" className="h-10 w-auto mb-2" style={{ opacity: 0.85 }} />
            <p className="text-sm" style={{ color: '#777' }}>{t('footer.brand')}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#D2D2D2', fontWeight: 700 }}>
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors duration-300 hover:text-gold" style={{ color: '#777' }}>
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#D2D2D2', fontWeight: 700 }}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@donindesign.com" className="transition-colors duration-300 hover:text-gold" style={{ color: '#777' }}>
                  hello@donindesign.com
                </a>
              </li>
              <li>
                <a href="https://www.behance.net/LucasDoninn" target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold" style={{ color: '#777' }}>
                  Behance Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs"
          style={{ borderColor: 'rgba(210,210,210,0.08)', color: '#555' }}>
          <span>© {currentYear} Donindesign. {t('footer.copyright')}</span>
          {/* Logo DNN no rodapé */}
          <img src="/logo-dnn.webp" alt="DNN" className="h-7 w-auto mt-4 md:mt-0" style={{ opacity: 0.4 }} />
        </div>
      </div>
    </footer>
  );
}
