import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  {
    id: 1,
    titleKey: 'projects.donin',
    descKey: 'projects.doninDesc',
    category: 'Branding & Packaging',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030910114/YrUUSLTAFnJXcmEA.jpg',
    tags: ['Branding', 'Packaging', 'Design Editorial'],
    link: 'https://www.behance.net/gallery/donin-cachacas-artesanais',
  },
  {
    id: 2,
    titleKey: 'projects.zimbro',
    descKey: 'projects.zimbroDesc',
    category: 'Identidade Visual',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030910114/hsdXWnVRtHakrLCT.png',
    tags: ['Identidade', 'Branding', 'Design Agrícola'],
    link: 'https://www.behance.net/gallery/zimbro-agricola',
  },
  {
    id: 3,
    titleKey: 'projects.almeida',
    descKey: 'projects.almeidaDesc',
    category: 'Branding Corporativo',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030910114/scaPDORnSNcDbbXm.png',
    tags: ['Corporativo', 'Branding', 'Design Jurídico'],
    link: 'https://www.behance.net/gallery/almeida-advocacia',
  },
];

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="projetos" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>02</span>
          <div className="gsap-line-expand" style={{ width: '60px', height: '1px', backgroundColor: 'oklch(0.72 0.12 75 / 0.4)' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            {t('projects.title')}
          </span>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 gsap-stagger-parent">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group gsap-stagger-child cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glass card */}
              <div
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: hoveredId === project.id
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'rgba(255, 255, 255, 0.50)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: hoveredId === project.id
                    ? '1px solid rgba(255, 255, 255, 0.85)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                  boxShadow: hoveredId === project.id
                    ? '0 8px 40px oklch(0.72 0.12 75 / 0.18), 0 2px 8px rgba(0,0,0,0.06)'
                    : '0 4px 24px rgba(0, 0, 0, 0.06)',
                  transform: hoveredId === project.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredId === project.id
                        ? 'linear-gradient(135deg, oklch(0.72 0.12 75 / 0.15) 0%, transparent 60%)'
                        : 'transparent',
                    }}
                  />
                  {/* Badge hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.55)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.7)',
                        color: 'oklch(0.15 0 0)',
                      }}
                    >
                      {t('projects.viewProject')}
                    </span>
                  </div>
                </div>

                {/* Info — dentro do card glass */}
                <div className="p-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: 'oklch(0.72 0.12 75)' }}>
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}>
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'oklch(0.35 0 0)' }}>
                    {t(project.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-3 py-1.5 rounded-md transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(8px)',
                          color: 'oklch(0.3 0 0)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-32 text-center gsap-fade-up">
          <p className="text-sm md:text-base mb-6" style={{ color: 'oklch(0.35 0 0)' }}>
            {t('projects.explore')}
          </p>
          {/* Botão glass dourado */}
          <a
            href="https://www.behance.net/LucasDoninn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 group"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.12 75 / 0.85), oklch(0.65 0.12 70 / 0.90))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid oklch(0.85 0.10 75 / 0.6)',
              boxShadow: '0 4px 24px oklch(0.72 0.12 75 / 0.30), inset 0 1px 0 rgba(255,255,255,0.3)',
              color: 'oklch(0.08 0 0)',
              fontWeight: 600,
            }}
          >
            {t('projects.viewBehance')}
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
