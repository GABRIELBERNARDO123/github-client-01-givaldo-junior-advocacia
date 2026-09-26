import React, { useState } from 'react';
import { strategicPillars } from '../data/legalData';
import { Shield, Sparkles, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface ProcessStepsProps {
  onOpenConsultation?: () => void;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = () => {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="metodologia" className="py-20 lg:py-28 bg-[#071829] text-white border-b border-[#c5a880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a880] mb-2">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span>Minha Engenharia Processual & Metodologia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            Como conduzo a sua causa do primeiro contato à solução definitiva.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
            Nada no seu caso é deixado ao acaso. Aplico um método estruturado de 4 etapas em que combino acolhimento individual, proteção documental imediata, estratégia negocial e presença firme perante os juízes.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicPillars.map((pillar, index) => {
            const isHovered = activePillar === index;
            return (
              <div
                key={pillar.step}
                onMouseEnter={() => setActivePillar(index)}
                onClick={() => setActivePillar(index)}
                className={`interactive-block dark-block p-6 sm:p-7 rounded-xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer hw-accelerate ${
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

        {/* Reassurance Callout in 1st Person */}
        <div className="interactive-block dark-block mt-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0d2742] via-[#091f35] to-[#051424] border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-display font-bold text-white">
              Quer entender qual é a melhor estratégia para o seu momento?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Agende uma consulta reservada diretamente comigo para que eu analise seus documentos e desenhe o seu plano.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de entender qual é a melhor estratégia para o meu momento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-gradient-to-r from-[#c5a880] to-[#b09164] hover:from-[#d4b78f] hover:to-[#be9f70] text-[#071829] font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar Diretamente Comigo no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
