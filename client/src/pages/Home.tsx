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

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  useLenis();
  useScrollAnimations();

  useEffect(() => {
    // Prevent scroll during preloader
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
          <Navigation />
          <main className="relative">
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
