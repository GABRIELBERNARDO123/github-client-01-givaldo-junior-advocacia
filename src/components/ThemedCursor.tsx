import React, { useEffect, useRef, useState } from 'react';

interface ThemedCursorProps {
  disabled?: boolean;
}

/**
 * ThemedCursor Interativo de Alto Desempenho.
 * 
 * - Zero lag: O ponto de precisão acompanha o mouse instantaneamente via translate3d direto.
 * - Halo dinâmico suave: O anel áureo desliza suavemente via interpolação linear (LERP) em requestAnimationFrame.
 * - Feedback tátil e magnético: Expande sobre botões, links e cards interativos; pulsa com clique.
 * - 60/120 FPS sem re-renderizações desnecessárias de componentes React.
 * - Desativação inteligente em telas sensíveis ao toque (smartphones/tablets).
 * - Totalmente compatível com atalho de acessibilidade (Alt+A) e modo cursor do sistema.
 */
export const ThemedCursor: React.FC<ThemedCursorProps> = ({ disabled = false }) => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringBlock, setIsHoveringBlock] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Coordenadas para interpolação suave
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const hoverStatesRef = useRef({ clickable: false, block: false, text: false });

  // Detecção de dispositivos móveis / touch screen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches;
    
    setIsTouch(isTouchDevice);
  }, []);

  // Gestão de classes no body para ocultar ou restaurar o cursor do SO
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!disabled && !isTouch) {
      document.body.classList.add('custom-cursor-active');
      document.body.classList.remove('acc-default-cursor');
    } else {
      document.body.classList.remove('custom-cursor-active');
      document.body.classList.add('acc-default-cursor');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [disabled, isTouch]);

  // Listener de movimento do mouse e loop de interpolação
  useEffect(() => {
    if (disabled || isTouch || typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Ponto de mira segue instantaneamente sem atraso
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detecção de elementos interativos com comparação prévia (zero re-renderizações inúteis)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest(
            'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, select, summary, [onclick], label'
          )
        );
        const isBlock = !isClickable && Boolean(
          target.closest('.interactive-block, .interactive-card, .interactive-mini-block')
        );
        const isTextInput = !isClickable && !isBlock && Boolean(
          target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea')
        );

        const current = hoverStatesRef.current;
        if (current.clickable !== isClickable || current.block !== isBlock || current.text !== isTextInput) {
          hoverStatesRef.current = { clickable: isClickable, block: isBlock, text: isTextInput };
          setIsHoveringClickable(isClickable);
          setIsHoveringBlock(isBlock);
          setIsHoveringText(isTextInput);
        }
      }
    };

    const handlePointerDown = () => {
      setIsMouseDown(true);

      // Efeito de onda / ripple ao clicar
      if (rippleRef.current) {
        const { x, y } = mousePos.current;
        rippleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(0.4)`;
        rippleRef.current.style.opacity = '0.9';

        // Animação leve de expansão e fade-out
        requestAnimationFrame(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out';
            rippleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(2.2)`;
            rippleRef.current.style.opacity = '0';
          }
        });
      }
    };

    const handlePointerUp = () => {
      setIsMouseDown(false);
      if (rippleRef.current) {
        rippleRef.current.style.transition = 'none';
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Loop suave de física (LERP) para o anel seguidor
    const animate = () => {
      // Interpolação suave: velocidade fluída de 18% por quadro
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [disabled, isTouch]);

  if (disabled || isTouch) {
    return null;
  }

  // Dimensionamento dinâmico do anel e do ponto
  let ringScaleClass = 'scale-100 border-[#c5a880]/80 bg-[#c5a880]/10';
  let dotScaleClass = 'scale-100 bg-[#c5a880]';

  if (isHoveringClickable) {
    ringScaleClass = 'scale-[1.55] border-[#c5a880] bg-[#c5a880]/25 shadow-[0_0_20px_rgba(197,168,128,0.4)]';
    dotScaleClass = 'scale-125 bg-white shadow-[0_0_10px_#c5a880]';
  } else if (isHoveringBlock) {
    ringScaleClass = 'scale-[1.38] border-[#c5a880] bg-[#c5a880]/15 shadow-[0_0_15px_rgba(197,168,128,0.3)]';
    dotScaleClass = 'scale-110 bg-[#e2cda9] shadow-[0_0_8px_#c5a880]';
  } else if (isHoveringText) {
    ringScaleClass = 'scale-75 opacity-30 border-slate-400 bg-transparent';
    dotScaleClass = 'scale-75 bg-slate-500';
  }

  if (isMouseDown) {
    ringScaleClass = 'scale-[0.8] border-[#c5a880] bg-[#c5a880]/40 shadow-[0_0_12px_rgba(197,168,128,0.6)]';
    dotScaleClass = 'scale-90 bg-[#FAF9F5]';
  }

  return (
    <div
      id="custom-interactive-cursor-container"
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Onda de Clique (Ripple Effect) */}
      <div
        ref={rippleRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#c5a880] opacity-0"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Anel Externo Interativo (Seguidor com física fluída) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-9 h-9 rounded-full border-[1.5px] backdrop-blur-[0.5px] transition-all duration-200 ease-out flex items-center justify-center ${ringScaleClass}`}
        >
          {isHoveringClickable && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping opacity-75" />
          )}
        </div>
      </div>

      {/* Ponto Central de Precisão (Zero Lag) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-2 h-2 rounded-full border border-[#071829] shadow-[0_0_6px_rgba(197,168,128,0.9)] transition-transform duration-150 ease-out ${dotScaleClass}`}
        />
      </div>
    </div>
  );
};
