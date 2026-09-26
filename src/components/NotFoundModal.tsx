import React, { useEffect } from 'react';
import { ShieldAlert, ArrowLeft, MessageCircle, Home, Scale } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

interface NotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotFoundModal: React.FC<NotFoundModalProps> = ({ isOpen, onClose }) => {
  // Fechar no Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="not-found-title"
    >
      <div 
        className="relative w-full max-w-lg bg-[#071829] border border-[#c5a880]/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-white text-center space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow de Fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#c5a880]/10 via-transparent to-transparent pointer-events-none rounded-2xl" />

        {/* Emblema Jurídico 404 */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FAF9F5]/5 border border-[#c5a880]/40 text-[#c5a880] mx-auto shadow-inner">
          <Scale className="w-10 h-10 text-[#c5a880]" />
          <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded bg-[#c5a880] text-[#071829] text-[10px] font-black uppercase tracking-wider">
            404
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#e2cda9] uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Jurisdição Não Localizada</span>
          </div>

          <h2 id="not-found-title" className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Página Não Encontrada nos Autos
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 leading-relaxed max-w-md mx-auto">
            O recurso digital ou link requisitado não consta em nossos registros. O escritório do <strong>Dr. Givaldo Júnior</strong> está sempre disponível para conduzir você à solução adequada.
          </p>
        </div>

        {/* Borda Divisória Dourada */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto" />

        {/* Ações Estratégicas de Resolução */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              if (window.location.hash) {
                window.location.hash = '';
              }
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
          >
            <Home className="w-4 h-4 text-[#c5a880]" />
            <span>Voltar ao Início</span>
          </button>

          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Acessei o site do escritório e gostaria de tirar uma dúvida.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-[#c5a880] to-[#b09164] hover:from-[#d4b78f] hover:to-[#be9f70] text-[#071829] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Rodapé do Modal */}
        <p className="text-[10px] text-slate-400">
          Givaldo Junior Advocacia • OAB/PR 100.231 • Cascavel/PR
        </p>
      </div>
    </div>
  );
};
