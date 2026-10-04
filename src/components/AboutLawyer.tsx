import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Scale, Award, Heart, CheckCircle2, MapPin, Building, Lock, MessageCircle } from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';

interface AboutLawyerProps {
  onOpenConsultation?: () => void;
}

export const AboutLawyer: React.FC<AboutLawyerProps> = () => {
  const [activeTab, setActiveTab] = useState<'filosofia' | 'atendimento' | 'estrutura'>('filosofia');

  return (
    <section id="advogado" className="py-20 lg:py-28 bg-[#FAF9F5] text-[#071829] border-b border-[#c5a880]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 reveal-init">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a6828] mb-2">
            <span className="w-6 h-[1.5px] bg-[#c5a880]" />
            <span>Quem Sou Eu & Meu Compromisso</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw+0.25rem,2.75rem)] font-display font-semibold text-[#071829] tracking-tight leading-tight">
            Minha advocacia é humanizada, ágil e focada em proteger o que mais importa para você.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-light">
            Conheça o profissional que estará à frente da sua causa. Comigo não há intermediários ou termos técnicos indecifráveis — apenas orientação jurídica transparente, estratégica e firme.
          </p>
        </div>

        {/* Main Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Prominent Solo Portrait of Dr. Givaldo Júnior */}
          <div className="lg:col-span-5 relative reveal-scale" itemScope itemType="https://schema.org/Person">
            <meta itemProp="jobTitle" content="Advogado" />
            <meta itemProp="identifier" content="OAB/PR 100.231" />
            <div className="relative mx-auto max-w-[420px]">
              
              {/* Gold Border Accent */}
              <div className="absolute -inset-2.5 border border-[#c5a880]/30 rounded-2xl pointer-events-none" />

              <div className="interactive-block dark-block relative rounded-2xl overflow-hidden bg-[#0a192f] shadow-2xl border border-[#c5a880]/40 cursor-pointer">
                <img 
                  itemProp="image"
                  src="/assets/givaldo-junior.jpg" 
                  alt="Dr. Givaldo Júnior - Advogado OAB/PR 100.231"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[490px] sm:h-[530px] object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                />

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071829] via-[#071829]/80 to-transparent p-6 pt-16 text-white">
                  <h3 itemProp="name" className="text-2xl font-display font-bold text-white">
                    Dr. Givaldo Júnior
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Inscrito na Ordem dos Advogados do Brasil (OAB/PR)
                  </p>
                  <p className="text-xs text-[#e2cda9] mt-2 font-serif italic">
                    "O Direito de Família exige de mim a firmeza de quem protege direitos e a sensibilidade de quem compreende dores humanas."
                  </p>
                </div>
              </div>

              {/* Physical Office Badge Below Photo */}
              <div className="interactive-block mt-4 p-3.5 rounded-xl bg-white border border-[#c5a880]/30 shadow-md flex items-center gap-3 cursor-pointer">
                <div className="p-2 rounded-lg bg-[#FAF8F3] text-[#8a6828] shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#071829]">Meu Escritório Próprio em Cascavel/PR</div>
                  <div className="text-[11px] text-slate-500">Estrutura reservada para nossas reuniões sigilosas</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Bio, Principles & Interactive Tab Details */}
          <div className="lg:col-span-7 space-y-7 reveal-init">
            
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#071829] leading-snug">
                Minha abordagem moderna e ética para a resolução de conflitos familiares.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-light">
                Construí a minha trajetória na advocacia pautado por dois pilares inegociáveis: <strong>profundidade técnica</strong> e <strong>respeito à dignidade da pessoa humana</strong>. Em momentos de separação, a perda do controle sobre o patrimônio ou o afastamento dos filhos geram angústia profunda. Por isso, garanto a você atendimento direto e pessoal comigo, com plano de ação desenhado sob medida para o seu caso.
              </p>
            </div>

            {/* Interactive Tab Switcher com Indicador Deslizante (LayoutId Spring) */}
            <div className="border-b border-slate-200 flex space-x-4 sm:space-x-6 text-[11px] sm:text-xs uppercase font-bold tracking-wider overflow-x-auto no-scrollbar pb-0.5 relative">
              <button
                onClick={() => setActiveTab('filosofia')}
                className={`pb-3 relative transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'filosofia' ? 'text-[#8a6828]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Minha Filosofia de Atuação
                {activeTab === 'filosofia' && (
                  <motion.span 
                    layoutId="aboutActiveTab"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" 
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('atendimento')}
                className={`pb-3 relative transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'atendimento' ? 'text-[#8a6828]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Atendimento Direto Comigo
                {activeTab === 'atendimento' && (
                  <motion.span 
                    layoutId="aboutActiveTab"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" 
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('estrutura')}
                className={`pb-3 relative transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'estrutura' ? 'text-[#8a6828]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Cascavel & Brasil
                {activeTab === 'estrutura' && (
                  <motion.span 
                    layoutId="aboutActiveTab"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a880]" 
                  />
                )}
              </button>
            </div>

            {/* Tab Contents com Animação Fluida */}
            <div className="min-h-[140px]">
              <AnimatePresence mode="wait">
                {activeTab === 'filosofia' && (
                  <motion.div 
                    key="filosofia"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Priorizo o Consenso Eficiente:</strong> Busco acordos bem redigidos que evitem anos de desgaste nos tribunais, poupando a sua saúde emocional e a da sua família.</span>
                    </div>
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Firmeza Processual no Litígio:</strong> Quando o outro lado adota postura abusiva ou tenta ocultar patrimônio, atuo com rigor técnico e rapidez com pedidos liminares.</span>
                    </div>
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Foco na Saúde dos seus Filhos:</strong> Garanto que a guarda e a pensão atendam às necessidades reais dos menores, afastando qualquer tentativa de alienação parental.</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'atendimento' && (
                  <motion.div 
                    key="atendimento"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <Lock className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Sem Delegação a Terceiros:</strong> O seu caso é analisado e conduzido diretamente por mim, Dr. Givaldo Júnior, garantindo precisão técnica em cada petição e audiência.</span>
                    </div>
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <ShieldCheck className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Segredo Profissional Rigoroso:</strong> Todas as nossas conversas, documentos e estratégias são estritamente sigilosos sob o estatuto da advocacia.</span>
                    </div>
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <Heart className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Comunicação Clara e Transparente:</strong> Passo a você atualizações em linguagem acessível sobre cada andamento processual, sem juridiquês desnecessário.</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'estrutura' && (
                  <motion.div 
                    key="estrutura"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <MapPin className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Meu Escritório Presencial em Cascavel/PR:</strong> Sede moderna no Bairro Florais do Paraná, com total privacidade e conforto para recebê-lo.</span>
                    </div>
                    <div className="interactive-mini-block p-3.5 rounded-xl bg-white border border-[#c5a880]/25 shadow-sm flex items-start gap-3 cursor-pointer">
                      <Scale className="w-4 h-4 text-[#8a6828] shrink-0 mt-0.5" />
                      <span><strong>Atendo Você em Todo o Brasil e Exterior:</strong> Utilizo processos 100% eletrônicos (PJe, Projudi e e-Proc) e videoconferências para representá-lo com máxima qualidade onde você estiver.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Action Button - Direct to WhatsApp com Física Tátil */}
            <div className="pt-2">
              <a
                href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Li sobre sua atuação e gostaria de agendar uma consulta sobre meu caso.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-gold px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] text-xs font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Agendar Consulta Comigo no WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
