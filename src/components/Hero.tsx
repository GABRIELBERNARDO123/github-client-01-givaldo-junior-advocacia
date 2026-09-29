import React, { useEffect, useRef } from 'react';
import { Scale, ArrowRight, Lock, CheckCircle2, MessageCircle, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { getWhatsAppLink } from '../utils/whatsapp';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { trackWhatsAppClick } from '../utils/analytics';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de entrada sóbria e coreografada dos elementos do Hero
      gsap.from('.gsap-hero-badge', {
        y: -15,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-title', {
        y: 25,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-bullets', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      });

      gsap.from('.gsap-hero-photo', {
        scale: 0.95,
        opacity: 0,
        duration: 1.1,
        delay: 0.3,
        ease: 'power2.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="inicio" 
      className="relative bg-[#071829] text-white pt-8 pb-14 sm:pt-14 sm:pb-22 lg:pt-16 lg:pb-28 overflow-hidden border-b border-[#c5a880]/20 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center"
    >
      {/* 3D Elegante & Sóbrio com Three.js: Partículas de Luz Douradas e Linhas Orgânicas Reativas */}
      <ThreeHeroCanvas />

      {/* Gradiente Radial Sutil de Profundidade */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(197, 168, 128, 0.12) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(11, 33, 56, 0.45) 0%, transparent 65%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Coluna Esquerda: Posicionamento Estratégico, Autoridade e CTA da Primeira Dobra */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            
            {/* Tag de Verificação de Autoridade OAB */}
            <div className="gsap-hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#c5a880]/40 text-[11px] sm:text-xs font-semibold text-[#e2cda9] max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse shrink-0" />
              <span className="truncate">Givaldo Junior • Advogado OAB/PR 100.231</span>
            </div>

            {/* Headline Principal de Alto Impacto */}
            <h1 className="gsap-hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-semibold text-white leading-tight sm:leading-[1.18] text-balance">
              Protejo seus filhos, seu patrimônio e a sua{' '}
              <span className="text-[#e2cda9] italic font-serif">segurança jurídica</span>.
            </h1>

            {/* Subtítulo Concreto e Empático */}
            <p className="gsap-hero-desc text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl text-pretty">
              Atuação jurídica de alto padrão em <strong>Direito de Família</strong>, <strong>Recuperação de Crédito</strong> e <strong>Regularização de Imóveis</strong>. Condução pessoal pelo Dr. Givaldo Júnior, sem intermediários, com absoluto sigilo e rigor técnico.
            </p>

            {/* Pilares Estratégicos */}
            <div className="gsap-hero-bullets grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Divórcios Rápidos em Cartório & Judiciais</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Guarda Equilibrada & Pensão Proporcional</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Recuperação Ágil de Créditos e Execuções</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Regularização Registral de Imóveis & Posse</span>
              </div>
            </div>

            {/* CTAs Estratégicos: Visível na Primeira Dobra Sem Necessidade de Scroll e 100% Direto ao WhatsApp */}
            <div className="gsap-hero-cta pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de falar diretamente com o senhor sobre o meu caso.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero_first_fold_primary')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] hover:from-[#d8bd97] hover:to-[#be9f72] text-[#071829] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-xl shadow-black/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[46px] sm:min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
                <span>Fale com o Advogado no WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#atuacao"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-[#c5a880]/30 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[46px] sm:min-h-[48px]"
              >
                <span>Conhecer Minhas Áreas de Atuação</span>
              </a>
            </div>

            {/* Indicadores de Confiança / Sigilo Ético */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>Sigilo OAB/PR 100.231 assegurado</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                <Scale className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>Cascavel/PR • Presencial ou Online</span>
              </div>
            </div>

          </div>

          {/* Coluna Direita: Retrato Autoral do Dr. Givaldo Júnior com Moldura Nobre */}
          <div className="lg:col-span-5 relative flex justify-center gsap-hero-photo mt-4 lg:mt-0">
            <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[400px]">
              
              {/* Detalhes Dourados Geométricos de Canto */}
              <div className="absolute -top-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 border-t-2 border-r-2 border-[#c5a880]/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-24 h-24 sm:w-28 sm:h-28 border-b-2 border-l-2 border-[#c5a880]/40 rounded-bl-xl pointer-events-none" />

              {/* Quadro da Foto Oficial do Advogado */}
              <div className="interactive-block dark-block relative rounded-2xl overflow-hidden bg-[#0a192f] shadow-2xl border border-[#c5a880]/40 group cursor-pointer">
                <img 
                  src="/assets/IMG-20260926-WA0022.jpg" 
                  alt="Dr. Givaldo Júnior — Advogado OAB/PR 100.231" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="hero-image object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/givaldo-oficial.jpg';
                  }}
                />
                
                {/* Cartão de Fundo com Assinatura da Marca */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071829] via-[#071829]/90 to-transparent p-4 sm:p-5 pt-10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-2xl font-display font-bold text-white leading-tight">
                        Givaldo Junior
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#c5a880] font-semibold tracking-wide uppercase mt-0.5">
                        ADVOGADO — OAB/PR 100.231
                      </div>
                    </div>
                    <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#c5a880]/20 border border-[#c5a880]/40 text-[9px] sm:text-[10px] font-bold text-[#e2cda9] uppercase">
                      Paraná
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 font-light line-clamp-2">
                    "Defendo com firmeza os seus direitos e acolho com dedicação a sua história."
                  </p>
                </div>
              </div>

              {/* Selo Flutuante de Atendimento Direto */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white text-[#071829] p-2.5 sm:p-3 rounded-xl shadow-2xl border border-[#c5a880]/40 hidden xs:flex items-center gap-2.5 sm:gap-3 z-20">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F3] border border-[#c5a880]/30 flex items-center justify-center text-[#8a6828] shrink-0">
                  <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="pr-1">
                  <div className="text-[11px] sm:text-xs font-bold text-[#071829] uppercase tracking-wider">Atendimento Direto</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Você conversa com o Dr. Givaldo</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Indicador Suave de Rolagem */}
      <div className="relative z-10 flex justify-center pt-6 sm:pt-10 opacity-60 hover:opacity-100 transition-opacity">
        <a 
          href="#atuacao" 
          aria-label="Rolar para Áreas de Atuação"
          className="flex flex-col items-center text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-300 hover:text-[#c5a880] transition-colors"
        >
          <span>Conhecer Atuação</span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
        </a>
      </div>
    </section>
  );
};
