import React from 'react';
import { ShieldCheck, UserX, UserCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      aspect: "Quem atende e conduz seu caso",
      generalist: "Advogados iniciantes, estagiários ou triagens genéricas",
      givaldo: "Atendimento 100% pessoal e direto comigo, Dr. Givaldo Júnior",
      isHighlight: true
    },
    {
      aspect: "Estratégia de Divórcio",
      generalist: "Leva diretamente para briga judicial demorada para cobrar mais",
      givaldo: "Priorizo a via em cartório mais rápida e econômica, com firmeza no litígio se necessário"
    },
    {
      aspect: "Proteção dos Filhos",
      generalist: "Foco apenas em números e pedidos genéricos de alimentos",
      givaldo: "Blindagem contra Alienação Parental e cronograma de convivência pacífico e saudável"
    },
    {
      aspect: "Partilha de Patrimônio",
      generalist: "Não investiga empresas, quotas ou patrimônio omitido pelo outro",
      givaldo: "Apuração minuciosa e medidas liminares de bloqueio cautelar de ativos"
    },
    {
      aspect: "Comunicação e Andamentos",
      generalist: "Cliente passa semanas sem retorno e sem entender o juridiquês",
      givaldo: "Explico cada passo em linguagem transparente, acessível e sem jargões"
    },
    {
      aspect: "Sigilo e Discrição",
      generalist: "Tratamento impessoal em escritórios de massa",
      givaldo: "Absoluto sigilo profissional, com atendimento reservado e humanizado"
    }
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-20 lg:py-28 bg-[#071829] text-white border-b border-[#c5a880]/20 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-2">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span>Diferenciais da Minha Atuação</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
            Por que confiar a sua história ao meu cuidado profissional?
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-300 leading-relaxed font-light">
            No Direito de Família, uma decisão jurídica precipitada pode comprometer o futuro dos seus filhos e o patrimônio de uma vida inteira. Veja a diferença de ser atendido pessoalmente por mim.
          </p>
        </div>

        {/* 1. Mobile Cards View (md:hidden) - Perfeita Responsividade sem Rolagem Horizontal */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border ${
                row.isHighlight 
                  ? 'bg-[#0c2a47] border-[#c5a880] shadow-lg ring-1 ring-[#c5a880]/30' 
                  : 'bg-[#081d33] border-white/10'
              } space-y-3`}
            >
              <div className="text-xs font-bold text-[#c5a880] uppercase tracking-wider border-b border-white/10 pb-1.5">
                {row.aspect}
              </div>

              {/* Comparativo Dr. Givaldo */}
              <div className="p-3 rounded-lg bg-[#071829] border border-[#c5a880]/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#e2cda9]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                  <span>Com Dr. Givaldo Júnior:</span>
                </div>
                <p className="text-xs text-white leading-relaxed pl-5 font-medium">
                  {row.givaldo}
                </p>
              </div>

              {/* Advocacia Tradicional */}
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <UserX className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Advocacia Comum:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-4 font-light">
                  {row.generalist}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop Table View (hidden md:block) */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#081d33]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0b2138] border-b border-white/10 text-xs sm:text-sm uppercase tracking-wider">
                <th className="py-5 px-6 font-semibold text-slate-300 w-1/3">
                  Critério de Avaliação
                </th>
                <th className="py-5 px-6 font-medium text-slate-400 w-1/3">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-slate-400" />
                    <span>Advocacia Tradicional / Generalista</span>
                  </div>
                </th>
                <th className="py-5 px-6 font-bold text-[#e2cda9] bg-[#0c2a47] border-l border-[#c5a880]/30 w-1/3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#c5a880]" />
                    <span>Comigo, Dr. Givaldo Júnior</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonRows.map((row, index) => (
                <tr 
                  key={index}
                  className={`transition-all duration-200 group/row hover:bg-white/[0.06] ${
                    row.isHighlight ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-medium text-slate-200 group-hover/row:text-[#c5a880] transition-colors">
                    {row.aspect}
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-light leading-relaxed">
                    {row.generalist}
                  </td>
                  <td className="py-4 px-6 text-[#f5ebd7] font-medium bg-[#0c2a47]/50 border-l border-[#c5a880]/20 group-hover/row:bg-[#0f3458]/70 transition-colors leading-relaxed">
                    {row.givaldo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA - Direct to WhatsApp */}
        <div className="mt-10 text-center">
          <a
            href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de falar com o senhor sobre minha causa.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('comparison_bottom_cta')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#b09164] hover:from-[#d4b78f] hover:to-[#be9f70] text-[#071829] font-bold text-xs uppercase tracking-wide shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 min-h-[46px]"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Falar Diretamente Comigo no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
