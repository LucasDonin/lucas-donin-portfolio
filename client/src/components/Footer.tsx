export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t" style={{ borderColor: 'oklch(0 0 0 / 0.15)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg mb-2" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              Lucas<span className="text-gold"> Donin</span>
            </h3>
            <p className="text-sm" style={{ color: 'oklch(0.4 0 0)' }}>
              Diretor de Arte & Designer de Branding
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              {['Sobre', 'Projetos', 'Processo', 'Contato'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="transition-colors duration-300 hover:text-gold"
                    style={{ color: 'oklch(0.35 0 0)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:lucas@donin.com.br" className="transition-colors duration-300 hover:text-gold"
                  style={{ color: 'oklch(0.35 0 0)' }}>
                  lucas@donin.com.br
                </a>
              </li>
              <li>
                <a href="https://www.behance.net/LucasDoninn" target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold"
                  style={{ color: 'oklch(0.35 0 0)' }}>
                  Behance Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs"
          style={{ borderColor: 'oklch(0 0 0 / 0.15)', color: 'oklch(0.35 0 0)' }}>
          <span>© {currentYear} Lucas Donin. Todos os direitos reservados.</span>
          <span className="mt-4 md:mt-0">Desenvolvido com <span style={{ color: 'oklch(0.72 0.12 75)' }}>✦</span> design premium</span>
        </div>
      </div>
    </footer>
  );
}
