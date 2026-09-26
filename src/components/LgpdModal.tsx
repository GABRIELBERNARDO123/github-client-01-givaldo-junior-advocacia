import React, { useEffect } from 'react';
import { ShieldCheck, X, Lock, CheckCircle2, FileText, Scale, MessageCircle } from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';

interface LgpdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LgpdModal: React.FC<LgpdModalProps> = ({ isOpen, onClose }) => {
  // Suporte à tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lgpd-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF9F5] text-[#071829] rounded-xl shadow-2xl border border-[#c5a880]/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#071829] text-white px-6 py-5 flex items-center justify-between border-b border-[#c5a880]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c5a880]/20 text-[#c5a880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="lgpd-modal-title" className="text-base sm:text-lg font-display font-bold text-white">
                Aviso de Privacidade e Proteção de Dados (LGPD)
              </h2>
              <p className="text-xs text-[#e2cda9] font-light">
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018) & Código de Ética da OAB
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Fechar (Escape)"
            aria-label="Fechar janela de política de privacidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#c5a880]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6828]">
              <Lock className="w-4 h-4 text-[#c5a880]" />
              <span>Compromisso Fundamental com a sua Privacidade</span>
            </div>
            <p className="text-slate-600 font-light">
              O escritório <strong>Dr. Givaldo Júnior Advocacia (OAB/PR 100.281)</strong> preza pela transparência, integridade e segurança das informações de seus clientes e consulentes. Este site opera como canal institucional e informativo, assegurando estrita conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong> e o <strong>Estatuto da Advocacia (Lei Federal nº 8.906/1994)</strong>.
            </p>
          </div>

          {/* Section 1: Controlador */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#c5a880]" />
              <span>1. Controlador dos Dados</span>
            </h3>
            <p className="text-slate-600 font-light">
              O controlador dos dados para fins desta política é o <strong>Dr. Givaldo Júnior</strong>, inscrito na OAB/PR sob o nº 100.281, com endereço profissional na R. das Perdizes dos Florais, 134, bairro Florais do Paraná, Cascavel/PR, CEP 85814-480.
            </p>
          </div>

          {/* Section 2: Comunicação Direta & Ausência de Banco de Dados */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
              <span>2. Canais Diretos & Não Armazenamento em Servidores Públicos</span>
            </h3>
            <p className="text-slate-600 font-light">
              Neste site, <strong>não mantemos banco de dados público ou servidor remoto armazenando cadastros, senhas ou mensagens sigilosas</strong>. Todos os botões de contato, agendamento e consulta direcionam a comunicação diretamente para o canal oficial de atendimento via aplicativo <strong>WhatsApp</strong>, usufruindo da criptografia de ponta a ponta nativa do mensageiro.
            </p>
          </div>

          {/* Section 3: Finalidade e Bases Legais */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c5a880]" />
              <span>3. Finalidades do Tratamento e Bases Legais</span>
            </h3>
            <p className="text-slate-600 font-light">
              Os eventuais dados compartilhados espontaneamente pelo consulente (tais como nome, telefone e descrição genérica de sua demanda) são utilizados unicamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 font-light">
              <li>Responder à sua solicitação de contato e prestar esclarecimentos prévios solicitados por você;</li>
              <li>Realizar o agendamento de consulta jurídica reservada (presencial ou online);</li>
              <li>Elaborar propostas de honorários e contratos de prestação de serviços advocatícios (Art. 7º, inc. V da LGPD).</li>
            </ul>
          </div>

          {/* Section 4: Sigilo Profissional */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#c5a880]" />
              <span>4. Sigilo Profissional da Advocacia</span>
            </h3>
            <p className="text-slate-600 font-light">
              Por força do Art. 7º, inciso XIX, do Estatuto da Advocacia e do Código de Ética e Disciplina da OAB, qualquer informação, relato ou documento compartilhado com o Dr. Givaldo Júnior é resguardado por <strong>sigilo profissional absoluto</strong>, não podendo ser divulgado, vendido ou repassado a terceiros em nenhuma hipótese.
            </p>
          </div>

          {/* Section 5: Direitos do Titular */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>5. Seus Direitos (Art. 18 da LGPD)</span>
            </h3>
            <p className="text-slate-600 font-light">
              A qualquer momento, como titular dos dados, você pode solicitar a confirmação da existência de tratamento, a correção de informações ou a eliminação de dados de contato mantidos em nossas agendas, bastando manifestar seu desejo diretamente através dos nossos canais de atendimento.
            </p>
          </div>

          {/* Section 6: Cookies */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#071829] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#c5a880]" />
              <span>6. Cookies e Navegação</span>
            </h3>
            <p className="text-slate-600 font-light">
              Este site utiliza apenas recursos estritamente técnicos de navegação (como armazenamento local da sua preferência de aceitação deste aviso) para melhorar sua experiência, sem cookies invasivos de rastreamento de comportamento ou comercialização com redes de publicidade.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Dúvidas sobre o tratamento de dados? Fale diretamente comigo.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de tirar uma dúvida sobre privacidade e tratamento de dados.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#071829] text-white hover:bg-[#0c2842] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Falar no WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#c5a880] hover:bg-[#d4b78f] text-[#071829] transition-colors cursor-pointer"
            >
              Entendido e Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
