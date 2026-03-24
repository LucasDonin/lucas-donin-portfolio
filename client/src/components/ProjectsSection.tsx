import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase, type Project, parseTags } from '@/lib/supabase';

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('order', { ascending: true });
      if (!error && data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projetos" className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: '#242424' }}>
      <div className="container">
        <div className="flex items-center gap-4 mb-16 md:mb-24 gsap-fade-up">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>02</span>
          <div className="gsap-line-expand" style={{ width: '60px', height: '1px', backgroundColor: 'oklch(0.78 0.14 88 / 0.4)' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>{t('projects.title')}</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: 'rgba(255,255,255,0.04)', height: '420px' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center py-20" style={{ color: '#555' }}>Nenhum projeto publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 gsap-stagger-parent">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/projeto/${project.slug}`}
                className="group gsap-stagger-child cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: hoveredId === project.id ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: hoveredId === project.id ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: hoveredId === project.id
                      ? '0 8px 40px oklch(0.78 0.14 88 / 0.15), 0 2px 8px rgba(0,0,0,0.3)'
                      : '0 4px 24px rgba(0,0,0,0.2)',
                    transform: hoveredId === project.id ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: 'brightness(0.85)' }}
                    />
                    <div
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        background: hoveredId === project.id
                          ? 'linear-gradient(135deg, oklch(0.78 0.14 88 / 0.15) 0%, transparent 60%)'
                          : 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)',
                      }}
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-lg"
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#D2D2D2',
                        }}>
                        {t('projects.viewProject')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color: 'oklch(0.78 0.14 88)' }}>
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color: '#D2D2D2', fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#999' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {parseTags(project.tags).map((tag) => (
                        <span key={tag} className="text-[10px] px-3 py-1.5 rounded-md"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: '#777' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-20 md:mt-32 text-center gsap-fade-up">
          <p className="text-sm md:text-base mb-6" style={{ color: '#555' }}>{t('projects.explore')}</p>
          <a
            href="https://www.behance.net/LucasDoninn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 group"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid oklch(0.78 0.14 88 / 0.40)',
              boxShadow: '0 4px 24px oklch(0.78 0.14 88 / 0.15)',
              color: 'oklch(0.78 0.14 88)',
              fontWeight: 600,
            }}
          >
            {t('projects.viewBehance')}
            <span className="transition-transform duration-300 group-hover:translate-x-2">{'\u2192'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
