import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, Video, Building2, MessageCircle } from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';

export const OfficeLocation: React.FC = () => {
  return (
    <section id="escritorio" className="py-20 lg:py-28 bg-[#071829] text-white border-b border-[#c5a880]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a880] mb-2">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span>Minha Presença Física & Atendimento Nacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            Meu escritório em Cascavel/PR e meu atendimento digital em todo o Brasil.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
            Estruturei meu espaço para garantir total discrição e conforto em reuniões presenciais, além de plataforma segura e sigilosa para você realizar sua consulta jurídica comigo por videoconferência onde quer que esteja.
          </p>
        </div>

        {/* Dual Grid: Contact Details + Office Facade Photo & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details & Modalities */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sede Card */}
            <div className="interactive-block dark-block p-6 rounded-xl bg-[#0b2138] border border-white/10 space-y-5 cursor-pointer">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#c5a880]/20 text-[#c5a880] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Minha Sede Presencial em Cascavel
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                    Florais do Paraná - R. das Perdizes dos Florais, 134 - bairro Florais do Paraná, Cascavel - PR, 85814-480
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-200">
                  <Clock className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Segunda a Sexta: 08:00 às 18:00 (com agendamento prévio)</span>
                </div>

                <a 
                  href={getWhatsAppLink('Olá, Dr. Givaldo. Gostaria de agendar uma visita presencial ou reunião por videoconferência.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#c5a880] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>WhatsApp: {officeInfo.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-slate-200">
                  <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>{officeInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Modalidades Card */}
            <div className="interactive-block dark-block p-6 rounded-xl bg-[#0b2138] border border-white/10 space-y-4 cursor-pointer">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                Como você prefere conversar comigo:
              </h4>

              <div className="space-y-3">
                <div className="interactive-mini-block p-3.5 rounded-lg bg-[#071829] border border-white/5 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Presencial em Cascavel</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      Reunião individualizada no escritório, com café e máxima discrição para tratar de documentos e partilha.
                    </div>
                  </div>
                </div>

                <div className="interactive-mini-block p-3.5 rounded-lg bg-[#071829] border border-white/5 flex items-start gap-3">
                  <Video className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Videoconferência Segura (Brasil & Exterior)</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      Consulta jurídica por vídeo com a mesma profundidade técnica, compartilhamento de tela e envio digital de documentos.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Office Facade Photo & Map Embed */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Authentic Facade Photo - Foto real enviada da sede física */}
            <div className="interactive-block dark-block rounded-xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-[#0b2138] relative cursor-pointer">
              <img 
                src="/assets/IMG-20260926-WA0024.jpg" 
                alt="Fachada do Escritório Dr. Givaldo Júnior - R. das Perdizes dos Florais, 134, Cascavel/PR"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[540px] object-cover sm:object-contain bg-[#071829]"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sede-oficial.jpg';
                }}
              />
              <div className="p-4 sm:p-5 bg-[#071829] border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">
                    Sede Presencial
                  </div>
                  <div className="text-base sm:text-lg font-display font-bold text-white">
                    Givaldo Júnior Advocacia • Cascavel/PR
                  </div>
                </div>
                <div className="text-xs text-slate-300">
                  R. das Perdizes dos Florais, 134
                </div>
              </div>
            </div>

            {/* Map / Route Card */}
            <div className="interactive-block dark-block p-4 sm:p-5 rounded-xl bg-[#0b2138] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left cursor-pointer">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">
                  Florais do Paraná • Cascavel/PR
                </div>
                <div className="text-xs text-slate-400">
                  R. das Perdizes dos Florais, 134 - Florais do Paraná, Cascavel - PR
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=R.+das+Perdizes+dos+Florais,+134+-+Florais+do+Paran%C3%A1,+Cascavel+-+PR,+85814-480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Ver no Maps</span>
                </a>

                <a
                  href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de agendar um atendimento presencial ou online em seu escritório.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#071829] bg-[#c5a880] hover:bg-[#d4b78f] transition-colors shrink-0 shadow flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Agendar no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
