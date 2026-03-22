import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import { useLenis } from '@/hooks/useLenis';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

/* Orbs subtis para o fundo escuro */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div style={{
        position: 'absolute', top: '-5%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.70 0.09 140 / 0.10) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '-8%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.65 0.07 140 / 0.08) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '15%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.70 0.09 140 / 0.07) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
    </div>
  );
}

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  useLenis();
  useScrollAnimations();

  useEffect(() => {
    if (!showContent) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [showContent]);

  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}
      {showContent && (
        <>
          <BackgroundOrbs />
          <Navigation />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ProcessSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}
