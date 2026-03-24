import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { supabase, type Project, parseTags, parseImages } from '@/lib/supabase';

export default function ProjectDetail({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      if (error || !data) { setNotFound(true); }
      else { setProject(data); }
      setLoading(false);
    }
    fetch();
  }, [slug]);

  useEffect(() => {
    if (!project || !headerRef.current) return;
    gsap.fromTo('.pd-hero-text > *',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  }, [project]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#242424' }}>
      <div className="w-8 h-8 rounded-full border-2 animate-spin"
        style={{ borderColor: 'oklch(0.78 0.14 88)', borderTopColor: 'transparent' }} />
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: '#242424' }}>
      <p className="font-display text-2xl" style={{ color: '#D2D2D2' }}>Projeto não encontrado.</p>
      <a href="/#projetos" className="text-sm underline" style={{ color: 'oklch(0.78 0.14 88)' }}>Voltar aos projetos</a>
    </div>
  );

  if (!project) return null;

  const allImages = [project.cover_image, ...parseImages(project.images)].filter(Boolean);
  const tags = parseTags(project.tags);

  return (
    <div style={{ backgroundColor: '#242424', minHeight: '100vh' }}>
      {/* Nav back */}
      <div className="fixed top-0 left-0 right-0 z-50 py-5" style={{ background: 'rgba(36,36,36,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container flex items-center justify-between">
          <a href="/" className="flex items-center h-8">
            <img src="/logo-donin.svg" alt="Donindesign" className="h-full w-auto" style={{ filter: 'brightness(10)' }} />
          </a>
          <a href="/#projetos"
            className="text-sm flex items-center gap-2 transition-colors duration-300"
            style={{ color: '#999' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'oklch(0.78 0.14 88)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#999')}
          >
            <span>{'\u2190'}</span> Voltar
          </a>
        </div>
      </div>

      {/* Hero */}
      <div ref={headerRef} className="pt-32 pb-16 container">
        <div className="pd-hero-text max-w-3xl">
          <span className="text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'oklch(0.78 0.14 88)' }}>
            {project.category}
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-6"
            style={{ color: '#D2D2D2', fontWeight: 800 }}>
            {project.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#999' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-4 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: '#777' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image gallery */}
      {allImages.length > 0 && (
        <div className="container pb-16">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <img src={allImages[activeImg]} alt={project.title}
              className="w-full object-cover transition-opacity duration-300"
              style={{ maxHeight: '70vh', objectFit: 'cover' }} />
          </div>
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    width: '120px', height: '80px',
                    border: activeImg === i ? '2px solid oklch(0.78 0.14 88)' : '2px solid transparent',
                    opacity: activeImg === i ? 1 : 0.5,
                  }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full description */}
      {project.full_description && (
        <div className="container pb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'oklch(0.78 0.14 88 / 0.5)' }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.78 0.14 88)' }}>Sobre o projeto</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line" style={{ color: '#999' }}>
              {project.full_description}
            </p>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="container pb-24 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {project.behance_url && (
          <a href={project.behance_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid oklch(0.78 0.14 88 / 0.45)',
              boxShadow: '0 4px 24px oklch(0.78 0.14 88 / 0.15)',
              color: 'oklch(0.78 0.14 88)',
              fontWeight: 600,
            }}>
            Ver no Behance {'\u2192'}
          </a>
        )}
        <a href="/#projetos"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300"
          style={{ color: '#777', border: '1px solid rgba(255,255,255,0.08)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#D2D2D2')}
          onMouseLeave={e => (e.currentTarget.style.color = '#777')}
        >
          {'\u2190'} Ver todos os projetos
        </a>
      </div>
    </div>
  );
}
