/*
 * Design: Dark Atelier — Galeria Noturna
 * Processo: Timeline vertical com 4 etapas, ícones, descrições
 * Animações: Stagger children, line expand, fade-up sequencial
 */

const processSteps = [
  {
    number: '01',
    title: 'Descoberta',
    description: 'Mergulho profundo na essência da marca, compreendendo valores, público e mercado.',
    details: ['Pesquisa de mercado', 'Análise de concorrência', 'Entrevistas estratégicas'],
  },
  {
    number: '02',
    title: 'Estratégia',
    description: 'Desenvolvimento de conceito visual que traduz a identidade em linguagem gráfica.',
    details: ['Definição de conceito', 'Paleta de cores', 'Tipografia e elementos'],
  },
  {
    number: '03',
    title: 'Execução',
    description: 'Criação de todos os assets visuais com atenção aos detalhes e consistência.',
    details: ['Design de marca', 'Packaging e materiais', 'Guia de estilo'],
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Apresentação final com documentação completa e suporte para implementação.',
    details: ['Apresentação executiva', 'Manual de marca', 'Arquivos finais'],
  },
];

export default function ProcessSection() {
  return (
    <section id="processo" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            03
          </span>
          <div className="gsap-line-expand" style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'oklch(0.72 0.12 75 / 0.4)',
          }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            Meu Processo
          </span>
        </div>

        {/* Section title */}
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-16 md:mb-24 gsap-fade-up max-w-3xl"
          style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
          Metodologia que <span style={{ color: 'oklch(0.72 0.12 75)' }}>transforma visão em realidade</span>
        </h2>

        {/* Process timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 gsap-stagger-parent">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="gsap-stagger-child relative">
              {/* Number */}
              <span className="font-display text-6xl md:text-7xl lg:text-8xl opacity-5 absolute -top-8 -left-4"
                style={{ color: 'oklch(0.72 0.12 75)' }}>
                {step.number}
              </span>

              {/* Card */}
              <div
                className="relative p-8 md:p-10 rounded-lg transition-all duration-500 group hover:scale-105"
                style={{
                  backgroundColor: 'oklch(0 0 0 / 0.03)',
                  border: '1px solid oklch(0 0 0 / 0.15)',
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 0 30px oklch(0.72 0.12 75 / 0.1)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Step number and line */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-2xl font-semibold" style={{ color: 'oklch(0.72 0.12 75)' }}>
                      {step.number}
                    </span>
                    <div className="gsap-line-expand flex-1" style={{
                      height: '1px',
                      backgroundColor: 'oklch(0.72 0.12 75 / 0.2)',
                    }} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl mb-4 transition-colors duration-300 group-hover:text-gold"
                    style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed mb-6"
                    style={{ color: 'oklch(0.35 0 0)' }}>
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-xs md:text-sm"
                        style={{ color: 'oklch(0.35 0 0)' }}>
                        <span className="inline-block w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: 'oklch(0.72 0.12 75)' }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-20 md:mt-32 text-center gsap-fade-up">
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'oklch(0.35 0 0)' }}>
            Cada projeto é único e merece uma abordagem personalizada. Trabalho em colaboração
            estreita com clientes para garantir que a visão final supere as expectativas.
          </p>
        </div>
      </div>
    </section>
  );
}
