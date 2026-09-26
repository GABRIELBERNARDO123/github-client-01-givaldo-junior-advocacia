import React, { useState } from 'react';
import { faqItems } from '../data/legalData';
import { ChevronDown, HelpCircle, Shield, Lightbulb, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface FaqSectionProps {
  onOpenConsultation?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="duvidas" className="py-20 lg:py-28 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a6828] mb-2">
            <HelpCircle className="w-4 h-4 text-[#a8823b]" />
            <span>Segurança Jurídica & Esclarecimentos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#071829] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-light">
            Respostas diretas que elaborei com base na lei e na minha experiência prática para tirar as dúvidas mais comuns de quem está enfrentando uma transição familiar.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`interactive-block rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'bg-white border-[#c5a880] shadow-lg ring-1 ring-[#c5a880]/40'
                    : 'bg-white/80 border-slate-200 hover:border-[#c5a880]/50'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-bold text-[#8a6828] font-cinzel w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-semibold text-[#071829]">
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#c5a880]/20 text-[#8a6828]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 space-y-3 animate-fade-in hw-accelerate">
                    <p>{item.answer}</p>
                    
                    {item.practicalTip && (
                      <div className="interactive-mini-block p-3.5 rounded-lg bg-[#FAF8F3] border border-[#c5a880]/30 flex items-start gap-2.5 text-xs text-slate-700">
                        <Lightbulb className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#8a6828]">Minha Orientação Prática: </strong>
                          {item.practicalTip}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="interactive-block mt-12 text-center p-6 sm:p-8 rounded-xl bg-white border border-[#c5a880]/30 shadow-md cursor-pointer">
          <h3 className="text-lg font-display font-semibold text-[#071829]">
            Ainda tem dúvidas sobre a sua situação em particular?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            Cada família possui peculiaridades que só podem ser avaliadas com o estudo da documentação e da dinâmica real diretamente comigo.
          </p>
          <div className="mt-5">
            <a
              href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Li as dúvidas frequentes e gostaria de conversar reservadamente sobre a minha situação.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-sm bg-[#071829] hover:bg-[#0c2842] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer border border-[#c5a880]/30 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#c5a880]" />
              <span>Conversar Reservadamente Comigo no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
