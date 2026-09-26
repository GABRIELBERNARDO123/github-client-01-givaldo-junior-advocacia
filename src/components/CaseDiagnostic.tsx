import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Shield, 
  Calendar, 
  AlertCircle, 
  Clock, 
  FileText,
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';
import { officeInfo } from '../data/legalData';

interface CaseDiagnosticProps {
  onOpenConsultationWithData?: (summary: string) => void;
}

export const CaseDiagnostic: React.FC<CaseDiagnosticProps> = ({ onOpenConsultationWithData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    caseType: '',
    hasKids: '',
    assets: '',
    dialogue: ''
  });

  const steps = [
    {
      id: 1,
      key: 'caseType',
      title: 'Qual é o foco principal da sua situação familiar hoje?',
      subtitle: 'Selecione a demanda central para que possamos traçar a linha de ação jurídica mais eficiente.',
      options: [
        {
          value: 'divorcio_consensual',
          title: 'Divórcio com Acordo (Consensual)',
          desc: 'Queremos resolver a separação de forma pacífica, rápida e com respeito mútuo.'
        },
        {
          value: 'divorcio_litigioso',
          title: 'Divórcio com Conflito ou Impasse',
          desc: 'Divergências severas, falta de diálogo ou cônjuge que se recusa a assinar/negociar.'
        },
        {
          value: 'guarda_filhos',
          title: 'Guarda e Convivência com os Filhos',
          desc: 'Definição de regime de convivência, residência base ou prevenção de alienação parental.'
        },
        {
          value: 'pensao_alimenticia',
          title: 'Pensão Alimentícia (Fixação ou Revisão)',
          desc: 'Garantir sustento adequado para os filhos ou readequar valor a uma nova realidade.'
        },
        {
          value: 'partilha_patrimonio',
          title: 'Partilha de Bens, Imóveis ou Empresas',
          desc: 'Divisão justa de patrimônio comum, quotas societárias ou investimentos.'
        },
        {
          value: 'uniao_estavel',
          title: 'Dissolução de União Estável',
          desc: 'Término de união sem certidão de casamento formal no civil.'
        }
      ]
    },
    {
      id: 2,
      key: 'hasKids',
      title: 'Existem filhos menores de idade ou incapazes envolvidos?',
      subtitle: 'A presença de menores define requisitos legais para a escolha entre cartório ou procedimento judicial.',
      options: [
        {
          value: 'com_menores',
          title: 'Sim, temos filhos menores ou dependentes',
          desc: 'Demanda atenção especial à guarda, convivência e fixação de alimentos.'
        },
        {
          value: 'apenas_maiores',
          title: 'Apenas filhos maiores de 18 anos',
          desc: 'Permite procedimentos mais rápidos e desburocratizados em cartório.'
        },
        {
          value: 'sem_filhos',
          title: 'Não temos filhos em comum',
          desc: 'Foco exclusivo na partilha patrimonial e na dissolução civil do vínculo.'
        }
      ]
    },
    {
      id: 3,
      key: 'assets',
      title: 'Qual é o perfil do patrimônio construído durante a união?',
      subtitle: 'Identificar os bens é crucial para evitar prejuízos na partilha ou tentativas de ocultação.',
      options: [
        {
          value: 'patrimonio_relevante',
          title: 'Patrimônio Relevante (Imóveis, Empresas, Aplicações)',
          desc: 'Exige apuração contábil minuciosa, avaliação de mercado e proteção contra desvios.'
        },
        {
          value: 'bens_moderados',
          title: 'Bens Simples (Veículo, Residência Financiada)',
          desc: 'Divisão objetiva dos ativos e quitação proporcional de eventuais financiamentos.'
        },
        {
          value: 'sem_bens',
          title: 'Não há bens materiais a serem divididos',
          desc: 'Processo mais ágil, dispensando cálculos e levantamentos patrimoniais complexos.'
        }
      ]
    },
    {
      id: 4,
      key: 'dialogue',
      title: 'Como está o canal de comunicação entre você e a outra parte?',
      subtitle: 'O nível de serenidade determina se a prioridade será o acordo em cartório ou medidas judiciais protetivas.',
      options: [
        {
          value: 'dialogo_bom',
          title: 'Diálogo Aberto e Colaborativo',
          desc: 'Ambos querem resolver sem brigas e com agilidade documental.'
        },
        {
          value: 'dialogo_tenso',
          title: 'Relação Tensa, porém com possibilidade de acordo',
          desc: 'Necessita de um advogado mediador para conduzir as cláusulas com neutralidade técnica.'
        },
        {
          value: 'bloqueio_total',
          title: 'Bloqueio Total / Ameaças / Conflito Grave',
          desc: 'Exige intervenção jurídica imediata, pedidos liminares e preservação de segurança.'
        }
      ]
    }
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(5); // Show result
    }
  };

  const handleReset = () => {
    setAnswers({
      caseType: '',
      hasKids: '',
      assets: '',
      dialogue: ''
    });
    setCurrentStep(1);
  };

  // Generate customized psychological & technical diagnosis
  const getDiagnosis = () => {
    const isCartorioPotential = 
      (answers.caseType === 'divorcio_consensual' || answers.caseType === 'uniao_estavel') &&
      answers.hasKids !== 'com_menores' &&
      answers.dialogue === 'dialogo_bom';

    const isUrgentProtective =
      answers.dialogue === 'bloqueio_total' ||
      answers.caseType === 'divorcio_litigioso' ||
      (answers.assets === 'patrimonio_relevante' && answers.dialogue !== 'dialogo_bom');

    let proceduralTrack = '';
    let estimatedTime = '';
    let keyRecommendation = '';
    let humanMessage = '';

    if (isCartorioPotential) {
      proceduralTrack = 'Via Extrajudicial em Cartório (Tabelionato de Notas)';
      estimatedTime = 'Média de 3 a 15 dias úteis';
      keyRecommendation = 'Redação de Escritura Pública com partilha precisa e encerramento limpo, evitando filas do fórum e taxas desnecessárias.';
      humanMessage = 'O seu caso reúne as condições ideais para ser resolvido com extrema discrição e rapidez. Com a assessoria do Dr. Givaldo, elaboramos a minuta de acordo que protege rigorosamente seus interesses patrimoniais sem gerar atrito.';
    } else if (isUrgentProtective) {
      proceduralTrack = 'Ação Judicial Estratégica com Pedidos Liminares Protetivos';
      estimatedTime = 'Medidas liminares em 24h a 72h; processo estruturado';
      keyRecommendation = 'Prioridade absoluta para blindagem de bens (arrolamento cautelar) e fixação de alimentos provisionais, resguardando a sua tranquilidade.';
      humanMessage = 'Identificamos que você está sob forte pressão e desequilíbrio de forças. Em momentos de conflito acentuado, a passividade é o maior risco. O Dr. Givaldo atuará com energia e técnica processual para colocar limites firmes e proteger o seu patrimônio e a sua dignidade.';
    } else {
      proceduralTrack = 'Procedimento Judicial Consensual ou Mediação Dirigida';
      estimatedTime = 'Homologação judicial em 30 a 60 dias úteis';
      keyRecommendation = 'Estruturação de plano de convivência dos filhos e protocolo de acordo para homologação pelo juiz com parecer favorável do Ministério Público.';
      humanMessage = 'Quando há filhos menores, a intervenção do Ministério Público é obrigatória por lei, mas havendo alinhamento técnico, o processo tramita de forma célere e segura, resguardando a rotina e a saúde mental das crianças.';
    }

    return {
      proceduralTrack,
      estimatedTime,
      keyRecommendation,
      humanMessage,
      isUrgentProtective
    };
  };

  const diagnosis = currentStep === 5 ? getDiagnosis() : null;

  const handleSendToWhatsApp = () => {
    const caseLabels: Record<string, string> = {
      divorcio_consensual: 'Divórcio Consensual',
      divorcio_litigioso: 'Divórcio Litigioso / Conflito',
      guarda_filhos: 'Guarda dos Filhos e Convivência',
      pensao_alimenticia: 'Pensão Alimentícia',
      partilha_patrimonio: 'Partilha de Patrimônio',
      uniao_estavel: 'Dissolução de União Estável'
    };

    const kidsLabels: Record<string, string> = {
      com_menores: 'Sim, há filhos menores',
      apenas_maiores: 'Apenas filhos maiores',
      sem_filhos: 'Não há filhos'
    };

    const assetsLabels: Record<string, string> = {
      patrimonio_relevante: 'Patrimônio Relevante (Imóveis/Empresas)',
      bens_moderados: 'Bens Moderados',
      sem_bens: 'Sem bens a partilhar'
    };

    const dialogueLabels: Record<string, string> = {
      dialogo_bom: 'Diálogo Bom/Amigável',
      dialogo_tenso: 'Relação Tensa',
      bloqueio_total: 'Bloqueio Total / Conflito Severo'
    };

    const text = `Olá, Dr. Givaldo Júnior! Acabei de realizar o Diagnóstico Preliminar no seu site e gostaria de agendar uma consulta jurídica reservada.\n\n*Resumo do Meu Caso:*\n• Situação: ${caseLabels[answers.caseType] || answers.caseType}\n• Filhos: ${kidsLabels[answers.hasKids] || answers.hasKids}\n• Patrimônio: ${assetsLabels[answers.assets] || answers.assets}\n• Diálogo com outra parte: ${dialogueLabels[answers.dialogue] || answers.dialogue}\n\nAguardo orientações para agendarmos o atendimento. Obrigado(a)!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${officeInfo.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <section id="diagnostico" className="py-20 bg-[#F4F1EA] text-[#071829] border-b border-[#c5a880]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071829]/5 border border-[#c5a880]/40 text-xs font-semibold uppercase tracking-wider text-[#8a6828] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#a8823b]" />
            <span>Triagem Sigilosa & Inteligência Jurídica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#071829] tracking-tight">
            Diagnóstico Preliminar do Seu Caso
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Em menos de 1 minuto, entenda qual é a rota jurídica mais segura e adequada para a sua realidade familiar antes de agendar a sua consulta com o Dr. Givaldo Júnior.
          </p>
        </div>

        {/* Diagnostic Interactive Card */}
        <div className="interactive-block bg-white rounded-xl shadow-xl shadow-[#071829]/5 border border-[#c5a880]/30 overflow-hidden cursor-pointer">
          
          {/* Progress Header */}
          <div className="bg-[#071829] text-white px-6 py-4 flex items-center justify-between border-b border-[#c5a880]/20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#c5a880] text-[#071829] font-bold text-xs flex items-center justify-center">
                {currentStep <= 4 ? currentStep : '✓'}
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                  {currentStep <= 4 ? `Etapa ${currentStep} de 4` : 'Análise Concluída'}
                </span>
                <p className="text-sm font-medium text-slate-200">
                  {currentStep <= 4 ? 'Mapeamento Estratégico' : 'Parecer Preliminar'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#c5a880]" />
              <span className="hidden sm:inline">100% Anônimo & Sigiloso</span>
            </div>
          </div>

          {/* Progress Line */}
          <div className="w-full bg-slate-100 h-1.5">
            <div 
              className="bg-gradient-to-r from-[#b09164] to-[#c5a880] h-1.5 transition-all duration-300"
              style={{ width: `${(Math.min(currentStep, 4) / 4) * 100}%` }}
            />
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-10">
            {currentStep <= 4 ? (
              <div
                key={currentStep}
                className="space-y-6 animate-fade-in hw-accelerate"
              >
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-[#071829]">
                      {steps[currentStep - 1].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {steps[currentStep - 1].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {steps[currentStep - 1].options.map((opt) => {
                      const isSelected = answers[steps[currentStep - 1].key as keyof typeof answers] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(steps[currentStep - 1].key, opt.value)}
                          className={`interactive-mini-block text-left p-4 rounded-lg border transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                            isSelected 
                              ? 'border-[#c5a880] bg-[#FAF8F3] shadow-md ring-1 ring-[#c5a880]' 
                              : 'border-slate-200 hover:border-[#c5a880]/70 hover:bg-[#FAF9F6] bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-sm text-[#071829] group-hover:text-[#8a6828] transition-colors">
                                {opt.title}
                              </span>
                              <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                                isSelected ? 'border-[#c5a880] bg-[#c5a880]' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Back button */}
                  {currentStep > 1 && (
                    <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#071829] font-medium transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Voltar à pergunta anterior
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Step 5: Diagnosis Result */
                <div
                  className="space-y-6 animate-fade-in hw-accelerate"
                >
                  <div className="interactive-mini-block p-4 sm:p-5 rounded-lg bg-[#FAF8F3] border border-[#c5a880]/40 flex items-start gap-4">
                    <div className="p-2.5 rounded-full bg-[#c5a880]/20 text-[#8a6828] shrink-0 mt-0.5">
                      <MessageSquareQuote className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8a6828]">
                        Avaliação Preliminar pelo Dr. Givaldo Júnior
                      </span>
                      <p className="text-sm text-slate-700 mt-1.5 leading-relaxed font-normal">
                        {diagnosis?.humanMessage}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="interactive-mini-block p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        <FileText className="w-4 h-4 text-[#8a6828]" />
                        <span>Rota Processual Indicada</span>
                      </div>
                      <p className="text-base font-display font-semibold text-[#071829]">
                        {diagnosis?.proceduralTrack}
                      </p>
                    </div>

                    <div className="interactive-mini-block p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        <Clock className="w-4 h-4 text-[#8a6828]" />
                        <span>Previsão Média de Resolução</span>
                      </div>
                      <p className="text-base font-display font-semibold text-[#071829]">
                        {diagnosis?.estimatedTime}
                      </p>
                    </div>
                  </div>

                  <div className="interactive-mini-block p-4 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900">Recomendação Estratégica Imediata: </strong>
                      {diagnosis?.keyRecommendation}
                    </div>
                  </div>

                  {/* Actions to Convert */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="flex-1 py-4 px-6 rounded-sm bg-gradient-to-r from-[#071829] to-[#0f2744] hover:from-[#0a223d] hover:to-[#173a63] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#c5a880]/40"
                    >
                      <span>Agendar Consulta com estes Dados</span>
                      <ArrowRight className="w-4 h-4 text-[#c5a880]" />
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-4 rounded-sm border border-slate-300 text-slate-600 hover:text-[#071829] hover:bg-slate-100 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Refazer Diagnóstico</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    * Esta triagem tem caráter informativo e de orientação prévia. O plano de ação definitivo é consolidado após a consulta jurídica formal e análise detalhada dos documentos.
                  </p>
                </div>
              )}
          </div>
        </div>

      </div>
    </section>
  );
};
