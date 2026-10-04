import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Send, 
  Lock, 
  Clock, 
  Scale, 
  CheckCircle2, 
  MessageCircle, 
  UserCheck, 
  Phone, 
  Mail, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

interface FormData {
  name: string;
  phone: string;
  area: string;
  message: string;
  acceptedTerms: boolean;
}

export const ExecutiveContact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    area: 'Direito de Família',
    message: '',
    acceptedTerms: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const areaOptions = [
    'Direito de Família (Divórcio, Guarda, Pensão)',
    'Recuperação de Crédito & Cobrança Judicial',
    'Regularização de Imóveis & Usucapião',
    'Partilha de Bens & Planejamento Sucessório',
    'Outra Questão Jurídica Específica'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Por favor, informe seu WhatsApp ou telefone para contato.');
      return;
    }
    if (!formData.acceptedTerms) {
      setErrorMessage('É necessário confirmar o sigilo e termos de contato.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
    trackWhatsAppClick('executive_contact_form_submit', formData.area);

    // Formata a mensagem executiva para o WhatsApp oficial do Dr. Givaldo Júnior
    const formattedText = `Olá, Dr. Givaldo Júnior. Preenchi o formulário de contato executivo no site:
• Nome: ${formData.name.trim()}
• Telefone/WhatsApp: ${formData.phone.trim()}
• Área de Interesse: ${formData.area}
${formData.message.trim() ? `• Resumo do Caso: ${formData.message.trim()}` : ''}

Gostaria de agendar uma consulta e receber suas orientações jurídicas.`;

    const zapUrl = getWhatsAppLink(formattedText);
    
    // Abre WhatsApp suavemente
    setTimeout(() => {
      window.open(zapUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  return (
    <section 
      id="contato" 
      className="py-20 lg:py-28 bg-[#050f1a] text-white border-b border-[#c5a880]/20 relative overflow-hidden scroll-mt-20"
    >
      {/* Luz Atmosférica Sutil de Fundo */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(197, 168, 128, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(11, 33, 56, 0.45) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-init">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c5a880] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Atendimento Reservado & Contato Executivo</span>
          </div>
          <h2 className="text-[clamp(1.85rem,4vw+0.5rem,3.25rem)] font-display font-semibold text-white tracking-tight leading-tight">
            Inicie a proteção dos seus direitos com discrição e rigor técnico.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
            Preencha os campos abaixo para conversar diretamente com o <strong>Dr. Givaldo Júnior</strong>. Todas as informações compartilhadas são protegidas pelo sigilo profissional da advocacia (OAB/PR 100.231).
          </p>
        </div>

        {/* Dual Layout: Formulário Executivo Touch-Ready + Pilares de Credibilidade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Esquerda: Formulário Mobile-First Adaptado para Telas Verticais */}
          <div className="lg:col-span-7 bg-[#071829]/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#c5a880]/40 shadow-2xl relative reveal-init">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">Canal Seguro & Reservado</h3>
                  <p className="text-[11px] text-slate-400">Resposta ágil em até 1 hora útil</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#e2cda9] border border-[#c5a880]/30 hidden xs:inline-block">
                OAB/PR 100.231
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Campo Nome */}
              <div>
                <label htmlFor="exec-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Seu Nome Completo <span className="text-[#c5a880]">*</span>
                </label>
                <input
                  id="exec-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Gabriel Batista"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/15 focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/25 text-white placeholder-slate-500 text-sm transition-all outline-none"
                />
              </div>

              {/* Campo Telefone / WhatsApp */}
              <div>
                <label htmlFor="exec-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  WhatsApp ou Telefone com DDD <span className="text-[#c5a880]">*</span>
                </label>
                <input
                  id="exec-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(45) 99999-9999"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/15 focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/25 text-white placeholder-slate-500 text-sm transition-all outline-none tabular-nums"
                />
              </div>

              {/* Seletor de Especialidade / Área */}
              <div>
                <label htmlFor="exec-area" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Área de Interesse Principal <span className="text-[#c5a880]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="exec-area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-[#091f35] border border-white/15 focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/25 text-white text-sm transition-all outline-none appearance-none cursor-pointer pr-10"
                  >
                    {areaOptions.map((opt, i) => (
                      <option key={i} value={opt} className="bg-[#071829] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Mensagem Opcional / Resumo */}
              <div>
                <label htmlFor="exec-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Breve Resumo do Caso <span className="text-slate-500 font-normal lowercase">(opcional)</span>
                </label>
                <textarea
                  id="exec-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva brevemente o que aconteceu ou a sua urgência para que eu possa avaliar..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/15 focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/25 text-white placeholder-slate-500 text-sm transition-all outline-none resize-none"
                />
              </div>

              {/* Checkbox de Sigilo Ético & LGPD */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="exec-terms"
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded accent-[#c5a880] cursor-pointer"
                />
                <label htmlFor="exec-terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer select-none">
                  Compreendo que este contato é estritamente confidencial, conduzido sob o sigilo profissional da OAB e protegido pela Lei Geral de Proteção de Dados (LGPD).
                </label>
              </div>

              {/* Mensagem de Erro se houver */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Botão de Envio com Feedback Tátil */}
              <button
                type="submit"
                className="btn-tactile-gold w-full h-14 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-black/40 group mt-4 touch-manipulation"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>Enviar e Falar no WhatsApp com o Dr. Givaldo</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Sucesso imediato */}
              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium text-center animate-fade-in">
                  ✓ Abrindo WhatsApp oficial do Dr. Givaldo Júnior... Aguarde um instante!
                </div>
              )}
            </form>

          </div>

          {/* Coluna Direita: Autoridade, Credenciais e Canais Oficiais */}
          <div className="lg:col-span-5 space-y-6 reveal-scale">
            
            {/* Bloco de Atendimento Pessoal Sem Intermediários */}
            <div className="interactive-block dark-block p-6 sm:p-7 rounded-2xl bg-[#071829] border border-[#c5a880]/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center shrink-0 border border-[#c5a880]/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Atendimento Conduzido pelo Titular</h4>
                  <p className="text-xs text-[#c5a880]">Dr. Givaldo Júnior • OAB/PR 100.231</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Você conversa diretamente comigo desde o diagnóstico inicial. Sem triagens genéricas, estagiários ou terceirização da sua causa familiar.
              </p>
            </div>

            {/* Credenciais e Garantias Processuais */}
            <div className="interactive-block dark-block p-6 rounded-2xl bg-[#071829] border border-white/10 space-y-3.5">
              <div className="text-xs uppercase font-bold tracking-wider text-[#c5a880]">
                Garantias do Escritório:
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span><strong>Sigilo Absoluto:</strong> Reuniões protegidas por prerrogativa de sigilo da advocacia.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span><strong>Transparência de Honorários:</strong> Contratos claros e detalhados previamente, sem surpresas.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span><strong>Agilidade Processual:</strong> Protocolos e pedidos de liminar sem perda de tempo.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span><strong>Presencial ou 100% Online:</strong> Atendimento no escritório em Cascavel/PR ou por videoconferência em todo o Brasil.</span>
                </div>
              </div>
            </div>

            {/* Contato Direto Rápido */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Canais Oficiais Diretos:
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Telefone: <strong>{officeInfo.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="truncate">E-mail: <strong>{officeInfo.email}</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
