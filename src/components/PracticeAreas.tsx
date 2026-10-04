import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { practiceAreas } from '../data/legalData';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Users, 
  Coins, 
  Building2, 
  ScrollText, 
  Check, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Sparkles,
  Award,
  Scale,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

interface PracticeAreasProps {
  onSelectArea?: (areaTitle: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(practiceAreas[0].id);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const detailCardRef = useRef<HTMLDivElement | null>(null);
  
  // Touch Gestures State para deslizamento no Card de Detalhes
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Revelação GSAP sincronizada com o ScrollTrigger
      gsap.from('.gsap-practice-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.gsap-practice-grid', {
        scrollTrigger: {
          trigger: '.gsap-practice-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case 'direito-familia':
        return <Users className="w-5 h-5 text-[#c5a880]" />;
      case 'pensao-alimenticia':
        return <Scale className="w-5 h-5 text-[#c5a880]" />;
      case 'guarda-menores':
        return <ShieldCheck className="w-5 h-5 text-[#c5a880]" />;
      case 'direito-convivencia':
        return <CalendarDays className="w-5 h-5 text-[#c5a880]" />;
      case 'recuperacao-credito':
        return <Coins className="w-5 h-5 text-[#c5a880]" />;
      case 'regularizacao-imoveis':
        return <Building2 className="w-5 h-5 text-[#c5a880]" />;
      case 'divorcio-consensual':
        return <HeartHandshake className="w-5 h-5 text-[#c5a880]" />;
      case 'divorcio-litigioso':
        return <ShieldAlert className="w-5 h-5 text-[#c5a880]" />;
      case 'partilha-bens':
        return <Building2 className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <ScrollText className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  const currentIndex = practiceAreas.findIndex(a => a.id === selectedAreaId);
  const currentArea = practiceAreas[currentIndex] || practiceAreas[0];

  const familyAreas = practiceAreas.filter(a => a.category === 'familia');
  const complementaryAreas = practiceAreas.filter(a => a.category === 'complementar');

  const goToNextArea = () => {
    if (currentIndex < practiceAreas.length - 1) {
      setSelectedAreaId(practiceAreas[currentIndex + 1].id);
    } else {
      setSelectedAreaId(practiceAreas[0].id);
    }
  };

  const goToPrevArea = () => {
    if (currentIndex > 0) {
      setSelectedAreaId(practiceAreas[currentIndex - 1].id);
    } else {
      setSelectedAreaId(practiceAreas[practiceAreas.length - 1].id);
    }
  };

  // Manipuladores de Gestos Touch para deslizar entre áreas
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // pixels mínimos para disparar gesto

    if (distance > minSwipeDistance) {
      // Deslizar para a esquerda -> próxima especialidade
      goToNextArea();
    } else if (distance < -minSwipeDistance) {
      // Deslizar para a direita -> especialidade anterior
      goToPrevArea();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const selectAndScroll = (id: string) => {
    setSelectedAreaId(id);
    // Em telas mobile, dá um scroll suave até o detalhe se o usuário tocar nas abas
    if (window.innerWidth < 1024 && detailCardRef.current) {
      detailCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="atuacao" 
      className="py-20 lg:py-28 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20 touch-pan-y"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12 reveal-init">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#8a6828] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8a6828]" />
            <span>Especialidades Jurídicas Estratégicas</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw+0.25rem,2.75rem)] font-display font-semibold text-[#071829] tracking-tight leading-tight">
            Direito de Família • Recuperação de Crédito • Regularização de Imóveis
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-light">
            O <strong>Direito de Família</strong> é a área de maior destaque do escritório, conduzida com proteção prioritária aos filhos e ao patrimônio. Também atuo com excelência técnica na <strong>Recuperação de Crédito (Cobrança)</strong> e na <strong>Regularização Registral de Imóveis</strong>.
          </p>
        </div>

        {/* Barra de Seleção Touch Horizontal em Telas Pequenas/Médias (Mobile & Tablet) */}
        <div className="lg:hidden mb-8 reveal-init">
          <div className="flex items-center justify-between px-1 mb-2.5 text-xs text-slate-500">
            <span className="font-semibold text-[#8a6828] flex items-center gap-1">
              <span className="text-sm">👆</span> Toque ou deslize as especialidades:
            </span>
            <span className="text-[11px] font-bold text-[#071829]">
              {currentIndex + 1} de {practiceAreas.length}
            </span>
          </div>

          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x gap-2 pb-2 -mx-4 px-4">
            {practiceAreas.map((area, idx) => {
              const isActive = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  onClick={() => selectAndScroll(area.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 snap-start flex items-center gap-2 transition-all active:scale-95 touch-manipulation min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-[#071829] text-white shadow-md border border-[#c5a880]'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-[#c5a880]/60'
                  }`}
                >
                  <div className={`p-1 rounded-md ${isActive ? 'bg-white/10 text-[#c5a880]' : 'bg-[#FAF8F3] text-[#8a6828]'}`}>
                    {getIcon(area.id)}
                  </div>
                  <span className="whitespace-nowrap">{area.title}</span>
                  {area.id === 'direito-familia' && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#c5a880] text-[#071829]">
                      Principal
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Layout com Suporte a Gestos de Toque (Motion.dev) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-init">
          
          {/* Coluna Esquerda: Seletor Interativo para Desktop */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            
            {/* Bloco 1: Direito de Família */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6828]">
                  <Award className="w-4 h-4 text-[#c5a880]" />
                  <span>Direito de Família (Destaque Principal)</span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#8a6828]">
                  Especialidade
                </span>
              </div>

              {familyAreas.map((area) => {
                const isActive = area.id === selectedAreaId;
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => setSelectedAreaId(area.id)}
                    whileHover={{ scale: 1.012, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer touch-manipulation min-h-[48px] ${
                      isActive
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow-xl shadow-[#071829]/15 ring-2 ring-[#c5a880]/30'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:border-[#c5a880]/60 hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive ? 'bg-white/10 text-[#c5a880]' : 'bg-[#FAF8F3] text-[#8a6828] group-hover:bg-[#c5a880]/15'
                      }`}>
                        {getIcon(area.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-display font-semibold ${
                            isActive ? 'text-white' : 'text-[#071829]'
                          }`}>
                            {area.title}
                          </span>
                          {area.id === 'direito-familia' && (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#c5a880] text-[#071829]">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 font-light line-clamp-1 ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {area.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#c5a880] translate-x-1' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Bloco 2: Outras Especialidades Relevantes */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Coins className="w-4 h-4 text-[#c5a880]" />
                  <span>Especialidades Complementares</span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Atuação Estratégica
                </span>
              </div>

              {complementaryAreas.map((area) => {
                const isActive = area.id === selectedAreaId;
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => setSelectedAreaId(area.id)}
                    whileHover={{ scale: 1.012, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer touch-manipulation min-h-[48px] ${
                      isActive
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow-xl shadow-[#071829]/15 ring-2 ring-[#c5a880]/30'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:border-[#c5a880]/60 hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive ? 'bg-white/10 text-[#c5a880]' : 'bg-[#FAF8F3] text-[#8a6828] group-hover:bg-[#c5a880]/15'
                      }`}>
                        {getIcon(area.id)}
                      </div>
                      <div>
                        <span className={`text-sm sm:text-base font-display font-semibold ${
                          isActive ? 'text-white' : 'text-[#071829]'
                        }`}>
                          {area.title}
                        </span>
                        <p className={`text-xs mt-0.5 font-light line-clamp-1 ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {area.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#c5a880] translate-x-1' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`} />
                  </motion.button>
                );
              })}
            </div>

          </div>

          {/* Coluna Direita: Cartão Estratégico com GESTOS DE TOUCH (SWIPE) */}
          <div ref={detailCardRef} className="lg:col-span-7 lg:sticky lg:top-24">
            <motion.div
              key={currentArea.id}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="bg-white rounded-2xl border border-[#c5a880]/30 p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 space-y-6 sm:space-y-7 relative select-none touch-pan-y"
            >
              {/* Barra superior de toque para mobile (indicação de gesto) */}
              <div className="lg:hidden flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  👈 Deslize para trocar de área 👉
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={goToPrevArea}
                    aria-label="Especialidade anterior"
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-90 touch-manipulation cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToNextArea}
                    aria-label="Próxima especialidade"
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-90 touch-manipulation cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ribbon de Destaque */}
              <div className="bg-[#FAF8F3] border border-[#c5a880]/40 rounded-xl p-3.5 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#8a6828] font-bold">
                  <Award className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Atendimento Pessoal e Direto</span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium">
                  Dr. Givaldo Júnior • OAB/PR 100.231
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8a6828]">
                  {currentArea.badge}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  Atendimento em Cascavel/PR & Digital
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#071829]">
                  {currentArea.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-light">
                  {currentArea.description}
                </p>
              </div>

              {/* Destaques de Como Atua */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Como atuo para proteger você nesta área:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentArea.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-[#FAF8F3] p-3 rounded-lg border border-[#c5a880]/20">
                      <Check className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfil Ideal */}
              <div className="p-4 rounded-xl bg-[#071829] text-white space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#c5a880] font-bold">
                  Quando você deve me procurar:
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {currentArea.idealFor}
                </p>
              </div>

              {/* Ação Direta no WhatsApp com Toque Tátil */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Deseja tirar dúvidas ou dar início ao procedimento?
                </div>
                <motion.a
                  href={getWhatsAppLink(`Olá, Dr. Givaldo Júnior. Gostaria de orientações sobre: ${currentArea.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('practice_area_card_btn', currentArea.title)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="btn-tactile-gold w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 min-h-[46px] touch-manipulation group"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Falar Sobre {currentArea.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
