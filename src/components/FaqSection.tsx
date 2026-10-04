import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqItems } from '../data/legalData';
import { ChevronDown, HelpCircle, Lightbulb, MessageCircle } from 'lucide-react';
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
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-init">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a6828] mb-2">
            <HelpCircle className="w-4 h-4 text-[#a8823b]" />
            <span>Segurança Jurídica & Esclarecimentos</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw+0.25rem,2.75rem)] font-display font-semibold text-[#071829] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-light">
            Respostas diretas que elaborei com base na lei e na minha experiência prática para tirar as dúvidas mais comuns de quem está enfrentando uma transição familiar.
          </p>
        </div>

        {/* FAQ Accordion List com Física de Molas Orgânica */}
        <div className="space-y-3.5 reveal-init reveal-stagger">
          {faqItems.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <article
                key={index}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`interactive-block rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'bg-white border-[#c5a880] shadow-xl shadow-[#c5a880]/10 ring-1 ring-[#c5a880]/40'
                    : 'bg-white/90 border-slate-200/90 hover:border-[#c5a880]/60'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none touch-manipulation active:bg-[#FAF8F3]/60 min-h-[56px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-bold text-[#8a6828] font-cinzel w-6 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 itemProp="name" className="text-sm sm:text-base font-display font-semibold text-[#071829]">
                      {item.question}
                    </h3>
                  </div>

                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transitionTimingFunction: 'var(--ease-spring)',
                      backgroundColor: isOpen ? 'rgba(197, 168, 128, 0.2)' : 'rgba(241, 245, 249, 1)',
                      color: isOpen ? '#8a6828' : '#94a3b8'
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <div 
                        itemScope 
                        itemProp="acceptedAnswer" 
                        itemType="https://schema.org/Answer" 
                        className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 space-y-3"
                      >
                        <p itemProp="text">{item.answer}</p>
                        
                        {item.practicalTip && (
                          <div className="interactive-mini-block p-3.5 rounded-xl bg-[#FAF8F3] border border-[#c5a880]/30 flex items-start gap-2.5 text-xs text-slate-700">
                            <Lightbulb className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-[#8a6828]">Minha Orientação Prática: </strong>
                              {item.practicalTip}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="interactive-block mt-12 text-center p-6 sm:p-8 rounded-2xl bg-white border border-[#c5a880]/30 shadow-lg cursor-pointer reveal-scale">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-[#071829]">
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
              className="btn-tactile-gold px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Conversar Reservadamente Comigo no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
