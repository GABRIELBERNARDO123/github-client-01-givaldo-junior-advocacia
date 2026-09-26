import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clientResolvedCases } from '../data/legalData';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  Sparkles, 
  Award, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

type FilterCategory = 'all' | 'agilidade' | 'comunicacao' | 'resultado';

export const ResolvedCases: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredCases = clientResolvedCases.filter((item) => {
    if (selectedFilter === 'all') return true;
    const textLower = (item.reviewText + ' ' + item.highlight).toLowerCase();
    if (selectedFilter === 'agilidade') {
      return textLower.includes('rápida') || textLower.includes('ágeis') || textLower.includes('agilidade') || textLower.includes('tempo');
    }
    if (selectedFilter === 'comunicacao') {
      return textLower.includes('cobrando') || textLower.includes('devolutivas') || textLower.includes('atualizando') || textLower.includes('esperando') || textLower.includes('tirou');
    }
    if (selectedFilter === 'resultado') {
      return textLower.includes('resultado') || textLower.includes('resolve') || textLower.includes('solução') || textLower.includes('excepcionais') || textLower.includes('favorável');
    }
    return true;
  });

  // Atualiza o slide ativo com base no scroll horizontal do container touch
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    if (offsetWidth === 0) return;
    const newIndex = Math.round(scrollLeft / (offsetWidth * 0.85));
    setActiveSlide(Math.min(Math.max(newIndex, 0), filteredCases.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
      setActiveSlide(index);
    }
  };

  const handlePrev = () => {
    const prev = Math.max(activeSlide - 1, 0);
    scrollToSlide(prev);
  };

  const handleNext = () => {
    const next = Math.min(activeSlide + 1, filteredCases.length - 1);
    scrollToSlide(next);
  };

  return (
    <section 
      id="casos-resolvidos" 
      className="py-20 lg:py-28 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20 scroll-mt-24 touch-pan-y"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-xs font-bold uppercase tracking-wider text-[#8a6828] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8a6828]" />
            <span>Casos Resolvidos • Avaliações Reais no Google</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#071829] tracking-tight leading-tight">
            O que nossos clientes dizem sobre os casos que resolvi
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Depoimentos públicos e autênticos registrados no Google Reviews por quem confiou a condução de suas causas ao Dr. Givaldo Júnior. Transparência, agilidade e comprometimento comprovados por quem viveu a experiência.
          </p>

          {/* Social Proof Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#c5a880]/40 shadow-sm text-xs font-medium text-slate-700">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-[#071829]">5.0 / 5.0</span>
              <span className="text-slate-400">• Google Reviews</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#c5a880]/40 shadow-sm text-xs font-medium text-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Avaliações Verificadas</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#c5a880]/40 shadow-sm text-xs font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-[#8a6828]" />
              <span>Devolutivas sem precisar cobrar</span>
            </div>
          </div>
        </div>

        {/* Filter Pills com Suporte a Scroll Touch Horizontal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar touch-pan-x py-1 flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedFilter('all');
                setActiveSlide(0);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 cursor-pointer touch-manipulation min-h-[44px] ${
                selectedFilter === 'all'
                  ? 'bg-[#071829] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#c5a880]/60 hover:bg-[#FAF8F3]'
              }`}
            >
              Todos os Casos ({clientResolvedCases.length})
            </button>
            <button
              onClick={() => {
                setSelectedFilter('agilidade');
                setActiveSlide(0);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 cursor-pointer touch-manipulation min-h-[44px] ${
                selectedFilter === 'agilidade'
                  ? 'bg-[#071829] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#c5a880]/60 hover:bg-[#FAF8F3]'
              }`}
            >
              ⚡ Agilidade & Rapidez
            </button>
            <button
              onClick={() => {
                setSelectedFilter('comunicacao');
                setActiveSlide(0);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 cursor-pointer touch-manipulation min-h-[44px] ${
                selectedFilter === 'comunicacao'
                  ? 'bg-[#071829] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#c5a880]/60 hover:bg-[#FAF8F3]'
              }`}
            >
              💬 Comunicação & Devolutivas
            </button>
            <button
              onClick={() => {
                setSelectedFilter('resultado');
                setActiveSlide(0);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 cursor-pointer touch-manipulation min-h-[44px] ${
                selectedFilter === 'resultado'
                  ? 'bg-[#071829] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#c5a880]/60 hover:bg-[#FAF8F3]'
              }`}
            >
              🏆 Resultados Favoráveis
            </button>
          </div>

          {/* Alternador de Modo de Visualização Touch / Grade */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode('carousel')}
              aria-label="Modo Carrossel Deslizável com Touch"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer min-h-[38px] ${
                viewMode === 'carousel'
                  ? 'bg-[#c5a880] text-[#071829] font-bold shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Deslizável (Touch)</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Modo Grade Completa"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer min-h-[38px] ${
                viewMode === 'grid'
                  ? 'bg-[#c5a880] text-[#071829] font-bold shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grade Completa</span>
            </button>
          </div>
        </div>

        {/* Dica visual de gesto touch no mobile */}
        {viewMode === 'carousel' && (
          <div className="lg:hidden flex items-center justify-between px-1 mb-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-sm">👆</span> Deslize para os lados para navegar
            </span>
            <span className="text-[11px] font-bold text-[#8a6828]">
              {activeSlide + 1} de {filteredCases.length}
            </span>
          </div>
        )}

        {/* Container Principal: Carrossel Touch Deslizável OU Grade */}
        {viewMode === 'carousel' ? (
          <div className="relative">
            {/* Faixa Deslizável com Suporte Touch Nativo (Scroll Snap + Gestos) */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x gap-4 sm:gap-6 pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {filteredCases.map((review) => (
                <article
                  key={review.id}
                  itemScope
                  itemType="https://schema.org/Review"
                  className="w-[86vw] xs:w-[82vw] sm:w-[380px] lg:w-[410px] shrink-0 snap-center bg-white rounded-2xl border border-[#c5a880]/30 p-6 sm:p-7 shadow-lg shadow-black/5 flex flex-col justify-between relative group hover:border-[#c5a880] transition-all active:scale-[0.985] touch-manipulation"
                >
                  <div>
                    {/* Card Top: Google icon & Aspas decorativas */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-[#4285F4]">
                          G
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500">Google Reviews</span>
                      </div>
                      <Quote className="w-6 h-6 text-[#c5a880]/40 group-hover:text-[#c5a880]/70 transition-colors" />
                    </div>

                    {/* Stars & Destaque do Caso */}
                    <div className="mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content={String(review.rating)} />
                      <meta itemProp="bestRating" content="5" />
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                      </div>

                      <div className="inline-block px-2.5 py-1 rounded bg-[#FAF8F3] border border-[#c5a880]/30 text-[11px] font-bold text-[#8a6828] leading-tight">
                        "{review.highlight}"
                      </div>
                    </div>

                    {/* Review Text */}
                    <p itemProp="reviewBody" className="text-sm text-slate-700 font-light leading-relaxed italic my-4">
                      "{review.reviewText}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#071829] to-[#122e4d] text-[#c5a880] font-bold text-xs flex items-center justify-center shadow-inner shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <h4 itemProp="name" className="text-sm font-bold text-[#071829] flex items-center gap-1">
                          {review.name}
                          <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {review.role} • {review.timeAgo}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Controles de Navegação Touch & Dots */}
            <div className="flex items-center justify-between mt-4">
              {/* Botão Anterior Touch */}
              <button
                onClick={handlePrev}
                disabled={activeSlide === 0}
                aria-label="Avaliação anterior"
                className="w-11 h-11 rounded-full bg-white border border-[#c5a880]/40 shadow text-[#071829] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F3] active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-[#8a6828]" />
              </button>

              {/* Indicadores de Slide (Dots interativos) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[200px] sm:max-w-none">
                {filteredCases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Ir para avaliação ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer touch-manipulation ${
                      activeSlide === idx
                        ? 'w-7 h-2.5 bg-[#8a6828]'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-[#c5a880]/60'
                    }`}
                  />
                ))}
              </div>

              {/* Botão Próximo Touch */}
              <button
                onClick={handleNext}
                disabled={activeSlide >= filteredCases.length - 1}
                aria-label="Próxima avaliação"
                className="w-11 h-11 rounded-full bg-white border border-[#c5a880]/40 shadow text-[#071829] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F3] active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-[#8a6828]" />
              </button>
            </div>
          </div>
        ) : (
          /* Modo Grade Completa */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCases.map((review) => (
              <article
                key={review.id}
                itemScope
                itemType="https://schema.org/Review"
                className="bg-white rounded-2xl border border-[#c5a880]/30 p-6 sm:p-7 shadow-lg shadow-black/5 flex flex-col justify-between relative group hover:border-[#c5a880] transition-colors active:scale-[0.985] touch-manipulation"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-[#4285F4]">
                        G
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">Google Reviews</span>
                    </div>
                    <Quote className="w-6 h-6 text-[#c5a880]/40 group-hover:text-[#c5a880]/70 transition-colors" />
                  </div>

                  <div className="mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(review.rating)} />
                    <meta itemProp="bestRating" content="5" />
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                    </div>

                    <div className="inline-block px-2.5 py-1 rounded bg-[#FAF8F3] border border-[#c5a880]/30 text-[11px] font-bold text-[#8a6828] leading-tight">
                      "{review.highlight}"
                    </div>
                  </div>

                  <p itemProp="reviewBody" className="text-sm text-slate-700 font-light leading-relaxed italic my-4">
                    "{review.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#071829] to-[#122e4d] text-[#c5a880] font-bold text-xs flex items-center justify-center shadow-inner">
                      {review.initials}
                    </div>
                    <div>
                      <h4 itemProp="name" className="text-sm font-bold text-[#071829] flex items-center gap-1">
                        {review.name}
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                      </h4>
                      <div className="text-[11px] text-slate-500">
                        {review.role} • {review.timeAgo}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Banner de Chamada / CTA Inferior com Alvos de Toque Confortáveis */}
        <div className="mt-14 sm:mt-16 bg-gradient-to-br from-[#071829] via-[#0b2238] to-[#071829] rounded-2xl p-8 sm:p-10 border border-[#c5a880]/40 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                <Award className="w-4 h-4 text-[#c5a880]" />
                <span>Atendimento Direto com Dr. Givaldo Júnior • OAB/PR 100.231</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
                Quer que sua causa seja a próxima resolvida com agilidade e técnica?
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Você será atendido pessoalmente pelo titular do escritório, com sigilo absoluto, transparência sobre opções e honorários justos, e atualizações regulares sobre cada andamento.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <motion.a
                href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Vi as avaliações dos seus casos resolvidos e gostaria de avaliar a minha situação jurídica.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('resolved_cases_cta_btn', 'casos_resolvidos')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] hover:from-[#d8bd97] hover:to-[#be9f72] text-[#071829] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer min-h-[48px] touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Avaliar Meu Caso no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
