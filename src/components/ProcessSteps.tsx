import React, { useState, useRef } from 'react';
import { strategicPillars } from '../data/legalData';
import { Shield, Sparkles, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface ProcessStepsProps {
  onOpenConsultation?: () => void;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = () => {
  const [activePillar, setActivePillar] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth === 0) return;
    const newIdx = Math.round(scrollLeft / (offsetWidth * 0.8));
    setActivePillar(Math.min(Math.max(newIdx, 0), strategicPillars.length - 1));
  };

  const scrollToStep = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
      setActivePillar(index);
    }
  };

  return (
    <section id="metodologia" className="py-20 lg:py-28 bg-[#071829] text-white border-b border-[#c5a880]/20 relative touch-pan-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a880] mb-2">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span>Minha Engenharia Processual & Metodologia</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw+0.25rem,2.75rem)] font-display font-semibold text-white tracking-tight leading-tight">
            Como conduzo a sua causa do primeiro contato à solução definitiva.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
            Nada no seu caso é deixado ao acaso. Aplico um método estruturado de 4 etapas em que combino acolhimento individual, proteção documental imediata, estratégia negocial e presença firme perante os juízes.
          </p>
        </div>

        {/* Indicador Touch no Mobile */}
        <div className="lg:hidden flex items-center justify-between px-1 mb-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span>👆</span> Deslize para ver as 4 etapas
          </span>
          <span className="text-[11px] font-bold text-[#c5a880]">
            Etapa {activePillar + 1} de {strategicPillars.length}
          </span>
        </div>

        {/* 4 Pillars Interactive Layout com Suporte a Touch e Swipe no Mobile */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex lg:grid overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory touch-pan-x gap-4 sm:gap-6 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid-cols-4 reveal-init reveal-stagger"
        >
          {strategicPillars.map((pillar, index) => {
            const isHovered = activePillar === index;
            return (
              <div
                key={pillar.step}
                onMouseEnter={() => setActivePillar(index)}
                onClick={() => setActivePillar(index)}
                className={`w-[84vw] xs:w-[78vw] sm:w-[320px] lg:w-auto shrink-0 snap-center interactive-block dark-block p-6 sm:p-7 rounded-xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer active:scale-[0.985] touch-manipulation ${
                  isHovered 
                    ? 'bg-[#0d2742] border-[#c5a880] shadow-2xl' 
                    : 'bg-[#091f35] border-white/10 hover:border-[#c5a880]/50'
                }`}
              >
                <div>
                  {/* Step Marker */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl font-bold text-[#c5a880]/80">
                      {pillar.step}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c5a880]">
                  <span>Fase Estruturada</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'translate-x-1 text-white' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots de Navegação Touch no Mobile */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-2">
          {strategicPillars.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToStep(idx)}
              aria-label={`Ir para etapa ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer touch-manipulation ${
                activePillar === idx
                  ? 'w-6 h-2 bg-[#c5a880]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Reassurance Callout in 1st Person com Alvo de Toque Confortável */}
        <div className="interactive-block dark-block mt-12 sm:mt-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0d2742] via-[#091f35] to-[#051424] border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer touch-manipulation">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-display font-bold text-white">
              Quer entender qual é a melhor estratégia para o seu momento?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Agende uma consulta reservada diretamente comigo para que eu analise seus documentos e desenhe o seu plano.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de agendar uma consulta reservada para traçar o plano estratégico da minha causa.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-gold w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 shrink-0 min-h-[46px] cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Consultar Dr. Givaldo no WhatsApp</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
