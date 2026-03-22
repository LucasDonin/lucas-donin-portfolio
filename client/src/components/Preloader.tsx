import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.preloader', {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(counter.val)),
    });

    tl.to('.preloader-name span', {
      opacity: 1, y: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.3);

    tl.to('.preloader-title', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, 0.8);

    return () => { tl.kill(); };
  }, [onComplete]);

  const nameChars = 'Lucas Donin'.split('');

  return (
    <div
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#242424' }}
    >
      <div className="preloader-name flex overflow-hidden mb-4">
        {nameChars.map((char, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-6xl tracking-tight inline-block opacity-0"
            style={{ color: '#D2D2D2', transform: 'translateY(40px)' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <p
        className="preloader-title text-sm tracking-[0.3em] uppercase opacity-0"
        style={{ color: 'oklch(0.78 0.14 88)' }}
      >
        Diretor de Arte
      </p>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-48 h-[1px] overflow-hidden" style={{ backgroundColor: 'oklch(0.92 0.01 80 / 0.1)' }}>
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: 'oklch(0.78 0.14 88)' }}
          />
        </div>
        <span className="text-xs tabular-nums font-body" style={{ color: '#999' }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
