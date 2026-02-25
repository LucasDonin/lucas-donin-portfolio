/*
 * Design: Dark Atelier — Galeria Noturna
 * About: Layout assimétrico, imagem à esquerda com reveal, texto à direita
 * Animações: Image clip-path reveal, text fade-up, line expand, parallax
 */

const ABOUT_IMG = 'https://private-us-east-1.manuscdn.com/sessionFile/R6alShkPWm8G70GRh8rSjP/sandbox/HqHNZxXiMOaW7jjlikc0Ld-img-2_1771979910000_na1fn_YWJvdXQtcG9ydHJhaXQtYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUjZhbFNoa1BXbThHNzBHUmg4clNqUC9zYW5kYm94L0hxSE5aeFhpTU9hVzdqamxpa2MwTGQtaW1nLTJfMTc3MTk3OTkxMDAwMF9uYTFmbl9ZV0p2ZFhRdGNHOXlkSEpoYVhRdFltYy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=C~Uw3fN8~7IUzstMyU8tqGuwIlRJk0OwLStz1TxeSViNd3o27oOCCrbnF48Nps6mh9Ez0xG~zYitQjV~3QdwOWhTIA3v0IGiENBw5Cu03FpCva2TgPDr6upGUSyHzDt0USjqD9NK74QeXwk1xg-hw2FSKiEfG2Vob1p3sJISXJq0ehrxIUC9f~boNo7~Cb1ltkWyWfbNX3jGVJMLhGBgaG9f1RrLG8spZXVoA62YDEQmdrgplRPZOI7ui8Ihn3m6Pv7~jMsYwSbS~hi8-26asTCgfLv6U5NRFUmcfZwC-t3HfQA2XMQAR5suvlUUPiDtEcxm2jH9pFmsLg11CElFUA__';

const stats = [
  { number: '9+', label: 'Anos de Mercado' },
  { number: '16K+', label: 'Visualizações' },
  { number: '220+', label: 'Seguidores' },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            01
          </span>
          <div className="gsap-line-expand" style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'oklch(0.72 0.12 75 / 0.4)',
          }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            Sobre
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image column */}
          <div className="lg:col-span-5 gsap-reveal">
            <div className="relative overflow-hidden">
              <img
                src={ABOUT_IMG}
                alt="Workspace de direção de arte"
                className="w-full aspect-[4/3] object-cover gsap-parallax"
                data-speed="0.2"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, oklch(0 0 0 / 0.3) 0%, transparent 50%)',
              }} />
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 lg:pl-8">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 gsap-fade-up"
              style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
              Design que traduz
              <br />
              <span style={{ color: 'oklch(0.72 0.12 75)' }}>essência em forma</span>
            </h2>

            <div className="gsap-line-expand mb-8" style={{
              width: '100%',
              maxWidth: '120px',
              height: '1px',
              backgroundColor: 'oklch(0.72 0.12 75 / 0.3)',
            }} />

            <div className="space-y-5 mb-12">
              <p className="text-base md:text-lg leading-relaxed gsap-fade-up"
                style={{ color: 'oklch(0.35 0 0)', fontWeight: 400 }}>
                Sou Lucas Donin, Diretor de Arte baseado em Toledo, Paraná, com quase uma década
                de experiência transformando narrativas de marca em identidades visuais impactantes.
                Minha paixão pela história e cultura do design me levou a explorar as infinitas
                possibilidades que cada projeto oferece.
              </p>
              <p className="text-base md:text-lg leading-relaxed gsap-fade-up"
                style={{ color: 'oklch(0.35 0 0)', fontWeight: 400 }}>
                Especializado em branding e packaging, busco criar experiências visuais que
                honram a essência de cada marca. Dos rótulos artesanais da Donin Cachaças
                à identidade corporativa da Almeida Advocacia, cada projeto é uma oportunidade
                de contar uma história única através do design.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 gsap-stagger-parent">
              {stats.map((stat) => (
                <div key={stat.label} className="gsap-stagger-child">
                  <span className="font-display text-3xl md:text-4xl block mb-1"
                    style={{ color: 'oklch(0.72 0.12 75)' }}>
                    {stat.number}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: 'oklch(0.4 0 0)' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="mt-12 gsap-fade-up">
              <span className="text-[10px] tracking-[0.3em] uppercase block mb-4"
                style={{ color: 'oklch(0.4 0 0)' }}>
                Ferramentas
              </span>
              <div className="flex flex-wrap gap-3">
                {['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'After Effects'].map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-4 py-2 rounded-sm"
                    style={{
                      border: '1px solid oklch(0 0 0 / 0.15)',
                      color: 'oklch(0.3 0 0)',
                      backgroundColor: 'oklch(0 0 0 / 0.03)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
