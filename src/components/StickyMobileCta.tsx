import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { officeInfo } from '../data/legalData';
import { trackWhatsAppClick } from '../utils/analytics';

export const StickyMobileCta: React.FC = () => {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071829]/95 backdrop-blur-md border-t border-[#c5a880]/30 px-3 py-2 shadow-2xl safe-area-bottom animate-floating-fade-in"
      style={{ maxHeight: '12vh' }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Botão de Ação Principal Direto no WhatsApp */}
        <a
          href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de falar com o senhor sobre meu caso.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('sticky_mobile_cta_whatsapp')}
          className="flex-1 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
          <span className="truncate">Falar no WhatsApp com Dr. Givaldo</span>
        </a>

        {/* Botão Direto de Ligação Telefônica */}
        <a
          href={`tel:+${officeInfo.phoneRaw}`}
          aria-label="Ligar para o escritório do Dr. Givaldo Júnior"
          className="py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-[#e2cda9] border border-[#c5a880]/40 font-semibold text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 active:scale-95 transition-transform min-h-[44px] shrink-0"
        >
          <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span className="hidden xs:inline">Ligar</span>
        </a>
      </div>
    </div>
  );
};
