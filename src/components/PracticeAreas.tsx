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

  const currentArea = practiceAreas.find(a => a.id === selectedAreaId) || practiceAreas[0];

  const familyAreas = practiceAreas.filter(a => a.category === 'familia');
  const complementaryAreas = practiceAreas.filter(a => a.category === 'complementar');

  return (
    <section 
      ref={sectionRef}
      id="atuacao" 
      className="py-20 lg:py-28 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 gsap-practice-title">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-xs font-bold uppercase tracking-wider text-[#8a6828] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8a6828]" />
            <span>Especialidades Jurídicas Estratégicas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#071829] tracking-tight leading-tight">
            Direito de Família • Recuperação de Crédito • Regularização de Imóveis
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-light">
            O <strong>Direito de Família</strong> é a área de maior destaque do escritório, conduzida com proteção prioritária aos filhos e ao patrimônio. Também atuo com excelência técnica na <strong>Recuperação de Crédito (Cobrança)</strong> e na <strong>Regularização Registral de Imóveis</strong>.
          </p>
        </div>

        {/* Dual Layout com Suporte a Gestos de Toque (Motion.dev) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start gsap-practice-grid">
          
          {/* Coluna Esquerda: Seletor Interativo com Toque Suave (Motion.dev) */}
          <div className="lg:col-span-5 space-y-6">
            
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
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
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

            {/* Bloco 2: Recuperação de Crédito & Regularização de Imóveis */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Building2 className="w-3.5 h-3.5 text-[#8a6828]" />
                <span>Crédito & Regularização Imobiliária</span>
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
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow-xl shadow-[#071829]/15 ring-2 ring-[#c5a880]/30'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:border-[#c5a880]/60 hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive ? 'bg-white/10 text-[#c5a880]' : 'bg-slate-100 text-slate-600 group-hover:text-[#8a6828]'
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

          </div>

          {/* Coluna Direita: Cartão Estratégico com Transição Suave e Toque */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <motion.div
              key={currentArea.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-[#c5a880]/30 p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 space-y-7"
            >
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
                <span className="px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#8a6828] text-xs font-semibold tracking-wide uppercase">
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

              {/* Ação Direta no WhatsApp com Toque Suave (Motion.dev) */}
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
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] hover:from-[#d8bd97] hover:to-[#be9f72] text-[#071829] font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Falar Sobre {currentArea.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
