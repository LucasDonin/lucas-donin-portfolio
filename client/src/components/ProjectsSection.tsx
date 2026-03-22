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
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.72 0.12 75)' }}>
            02
          </span>
          <div className="gsap-line-expand" style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'oklch(0.72 0.12 75 / 0.4)',
          }} />
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
              <div className="relative overflow-hidden rounded-lg mb-6 gsap-scale">
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
                        ? 'linear-gradient(135deg, oklch(0.72 0.12 75 / 0.2) 0%, oklch(0.72 0.12 75 / 0.05) 100%)'
                        : 'linear-gradient(135deg, oklch(0.72 0.12 75 / 0.1) 0%, oklch(0.72 0.12 75 / 0) 100%)',
                    }}
                  />
                  {hoveredId === project.id && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 40px oklch(0.72 0.12 75 / 0.15)' }}
                    />
                  )}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-sm backdrop-blur-sm"
                    style={{
                      backgroundColor: 'oklch(0.72 0.12 75 / 0.15)',
                      color: 'oklch(1 0 0)',
                      border: '1px solid oklch(0.72 0.12 75 / 0.3)',
                    }}
                  >
                    {t('projects.viewProject')}
                  </span>
                </div>
              </div>

              <div className="gsap-fade-up">
                <span className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: 'oklch(0.72 0.12 75)' }}>
                  {project.category}
                </span>
                <h3
                  className="font-display text-2xl md:text-3xl mb-3 transition-colors duration-300"
                  style={{ color: 'oklch(0 0 0)', fontWeight: 700 }}
                >
                  {t(project.titleKey)}
                </h3>
                <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'oklch(0.35 0 0)' }}>
                  {t(project.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-3 py-1.5 rounded-sm transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0 0 0 / 0.15)',
                        color: 'oklch(0.3 0 0)',
                        backgroundColor: hoveredId === project.id ? 'oklch(0 0 0 / 0.05)' : 'transparent',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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
          <a
            href="https://www.behance.net/LucasDoninn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all duration-300 hover:scale-105 group"
            style={{
              backgroundColor: 'oklch(0.72 0.12 75)',
              color: 'oklch(0 0 0)',
              fontWeight: 500,
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
