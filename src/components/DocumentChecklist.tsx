import React, { useState } from 'react';
import { documentChecklistData } from '../data/legalData';
import { FileCheck, Info, Check, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export const DocumentChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (itemText: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  return (
    <section id="documentos" className="py-16 sm:py-20 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a6828] mb-2">
            <FileCheck className="w-4 h-4 text-[#a8823b]" />
            <span>Guia Prático Pré-Consulta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#071829]">
            Quais documentos são necessários para iniciarmos?
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
            Não se preocupe se você não tiver tudo em mãos agora. Meu escritório faz o levantamento e a emissão de certidões atualizadas nos cartórios necessários para você.
          </p>
        </div>

        {/* Checklist Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documentChecklistData.map((cat, idx) => (
            <div 
              key={idx}
              className="interactive-block bg-white rounded-xl border border-[#c5a880]/30 p-6 shadow-md shadow-black/5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-[#8a6828] mb-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  <span>{cat.category}</span>
                </div>

                <div className="space-y-2.5">
                  {cat.items.map((item, itemIdx) => {
                    const isDone = !!checkedItems[item];
                    return (
                      <button
                        key={itemIdx}
                        onClick={() => toggleItem(item)}
                        className={`interactive-mini-block w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer active:scale-[0.98] touch-manipulation min-h-[44px] ${
                          isDone 
                            ? 'bg-[#FAF8F3] border-[#c5a880] text-slate-800' 
                            : 'bg-white border-slate-200/80 text-slate-600 hover:border-[#c5a880]/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                          isDone ? 'bg-[#c5a880] border-[#c5a880] text-white' : 'border-slate-300'
                        }`}>
                          {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isDone ? 'line-through text-slate-400' : ''}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
                Toque para marcar o que você já possui.
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner with WhatsApp CTA */}
        <div className="interactive-block mt-8 p-4 sm:p-5 rounded-lg bg-[#FAF8F3] border border-[#c5a880]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-700 cursor-pointer">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
            <span>
              <strong>Sua tranquilidade garantida:</strong> Mesmo que você não tenha certidões ou o outro cônjuge esteja retendo documentos de bens, eu tenho acesso aos sistemas registrais para obter segundas vias oficiais.
            </span>
          </div>

          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de tirar dúvidas sobre os documentos necessários para o meu caso.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-[#071829] hover:bg-[#0c2842] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 border border-[#c5a880]/30"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Tirar Dúvidas de Documentos</span>
          </a>
        </div>

      </div>
    </section>
  );
};
