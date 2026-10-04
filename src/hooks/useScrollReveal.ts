import { useEffect } from 'react';

/**
 * useScrollReveal: Motor de animação física de revelação por rolagem (Emil Kowalski style)
 * Observa elementos com [data-reveal] ou .reveal-init e aplica a classe .is-revealed
 * com suporte nativo a hardware acceleration (GPU), 120 FPS em telas ProMotion (iOS)
 * e alta taxa de atualização no Android/Desktop.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Se o usuário prefere movimento reduzido, revela tudo instantaneamente
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || document.body.classList.contains('acc-reduced-motion')) {
      const allReveal = document.querySelectorAll('.reveal-init, [data-reveal]');
      allReveal.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('is-revealed');
          // Desobserva para manter a performance 100% lisa após revelar
          observer.unobserve(target);
        }
      });
    };

    // Margem inferior ligeiramente recuada para o elemento começar a surgir no campo de visão
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: isMobile ? '0px 0px -40px 0px' : '0px 0px -80px 0px',
      threshold: 0.08
    });

    const elementsToObserve = document.querySelectorAll('.reveal-init, [data-reveal]');
    elementsToObserve.forEach(el => observer.observe(el));

    // Observa novos elementos injetados dinamicamente
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-init:not(.is-revealed), [data-reveal]:not(.is-revealed)');
      newElements.forEach(el => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
