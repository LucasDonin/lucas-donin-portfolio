import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in and slide-up elements
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Fade-in elements
      gsap.utils.toArray<HTMLElement>('.gsap-fade-in').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Slide from left
      gsap.utils.toArray<HTMLElement>('.gsap-slide-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -100 },
          {
            opacity: 1, x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Slide from right
      gsap.utils.toArray<HTMLElement>('.gsap-slide-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 100 },
          {
            opacity: 1, x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Image reveal with clip-path
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Scale up images
      gsap.utils.toArray<HTMLElement>('.gsap-scale').forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Parallax elements
      gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.3');
        gsap.to(el, {
          yPercent: -30 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>('.gsap-stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.gsap-stagger-child');
        gsap.fromTo(children,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Horizontal line expand
      gsap.utils.toArray<HTMLElement>('.gsap-line-expand').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Split text animation for large headings
      gsap.utils.toArray<HTMLElement>('.gsap-split-text').forEach((el) => {
        const text = el.textContent || '';
        el.innerHTML = '';
        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(60px)';
          el.appendChild(span);
          return span;
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
