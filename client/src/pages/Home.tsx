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

/* Orbs de cor no fundo — necessários para o glass ficar visível */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb dourado — hero */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.88 0.10 75 / 0.35) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      {/* Orb bege — meio */}
      <div style={{
        position: 'absolute', top: '35%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.85 0.08 60 / 0.25) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      {/* Orb suave — projetos */}
      <div style={{
        position: 'absolute', top: '60%', left: '10%',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.90 0.06 75 / 0.20) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      {/* Orb final — contato */}
      <div style={{
        position: 'absolute', bottom: '0', right: '5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(0.82 0.10 70 / 0.28) 0%, transparent 70%)',
        filter: 'blur(45px)',
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
