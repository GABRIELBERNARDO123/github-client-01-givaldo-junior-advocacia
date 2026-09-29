import React, { useState } from 'react';
import { MessageCircle, MapPin, X, ChevronUp } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export const FloatingConcierge: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=R.+das+Perdizes+dos+Florais,+134+-+Florais+do+Paran%C3%A1,+Cascavel+-+PR,+85814-480";

  return (
    <aside 
      aria-label="Atendimento Reservado e Localização"
      className="fixed bottom-16 right-3 sm:bottom-6 sm:right-5 z-40 flex items-center gap-2 max-w-[calc(100vw-1.5rem)] animate-floating-fade-in"
    >
      {!minimized ? (
        <div className="interactive-block dark-block bg-[#071829] border border-[#c5a880]/60 text-white rounded-2xl sm:rounded-full shadow-2xl pl-3.5 sm:pl-4 pr-2.5 py-2 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 transition-all max-w-full">
          {/* Bloco Informativo de Autoridade (Apenas bloco informativo, sem disparar formulário) */}
          <div className="flex items-center gap-2.5 select-none pr-1">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c5a880]" />
            </span>
            <div className="text-left">
              <div className="text-[11px] font-bold text-white tracking-wide leading-tight flex items-center gap-1.5">
                <span>Consulta Reservada</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#c5a880]/20 text-[#e2cda9] font-medium uppercase tracking-wider">
                  Direto
                </span>
              </div>
              <div className="text-[9px] text-[#c5a880] font-medium leading-none mt-0.5">
                Dr. Givaldo Júnior • OAB/PR 100.231
              </div>
            </div>
          </div>

          {/* Botões de Ação Direta: Zap e Maps */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            {/* Botão do Zap */}
            <a
              href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de agendar uma consulta reservada.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-[10px] font-bold tracking-wider uppercase hover:opacity-95 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5 shadow"
              title="Abrir WhatsApp oficial do Dr. Givaldo Júnior"
            >
              <MessageCircle className="w-3 h-3 shrink-0" />
              <span>Zap</span>
            </a>

            {/* Botão do Maps */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#e2cda9] border border-[#c5a880]/40 text-[10px] font-bold tracking-wider uppercase hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow"
              title="Ver localização e rotas no Google Maps (Cascavel/PR)"
            >
              <MapPin className="w-3 h-3 text-[#c5a880] shrink-0" />
              <span>Maps</span>
            </a>

            {/* Botão de Minimizar */}
            <button
              onClick={() => setMinimized(true)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors ml-0.5"
              title="Minimizar aviso"
              aria-label="Minimizar aviso de consulta reservada"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Botão Flutuante Rápido - Zap */}
          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de agendar uma consulta reservada.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-xl text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer border border-white/20"
            title="Falar no WhatsApp com o Dr. Givaldo Júnior"
            aria-label="Falar no WhatsApp com o Dr. Givaldo Júnior"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Botão Flutuante Rápido - Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#071829] border-2 border-[#c5a880] shadow-xl text-[#c5a880] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            title="Ver escritório no Google Maps (Cascavel/PR)"
            aria-label="Ver escritório no Google Maps"
          >
            <MapPin className="w-5 h-5" />
          </a>

          {/* Botão de Restaurar Bloco */}
          <button
            onClick={() => setMinimized(false)}
            className="w-8 h-8 rounded-full bg-[#0b2138] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors shadow"
            title="Expandir Consulta Reservada"
            aria-label="Expandir detalhes da consulta reservada"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
};
