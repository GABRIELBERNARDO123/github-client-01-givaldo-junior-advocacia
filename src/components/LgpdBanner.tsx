import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ExternalLink, Check } from 'lucide-react';

interface LgpdBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const LgpdBanner: React.FC<LgpdBannerProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('givaldo_lgpd_consent');
      if (!accepted) {
        // Exibe o banner suavemente após 1 segundo de navegação
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('givaldo_lgpd_consent', 'true');
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Aviso de Privacidade e Conformidade com a LGPD"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 bg-[#071829] border-t border-[#c5a880]/40 text-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Left text & icon */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#c5a880]/20 text-[#c5a880] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-light">
            <span className="font-semibold text-white block sm:inline mr-1">
              Conformidade LGPD & Sigilo Profissional OAB:
            </span>
            Este site respeita integralmente a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> e o sigilo profissional advocatício. Seus atendimentos são realizados diretamente via WhatsApp com criptografia de ponta a ponta, sem armazenamento de dados sensíveis em servidores públicos.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end pt-1 md:pt-0">
          <button
            onClick={onOpenPrivacyPolicy}
            className="text-xs text-[#e2cda9] hover:text-white underline underline-offset-4 decoration-[#c5a880]/60 hover:decoration-white transition-colors cursor-pointer whitespace-nowrap px-2 py-1"
          >
            Política de Privacidade
          </button>
          
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-sm bg-gradient-to-r from-[#c5a880] to-[#b09164] hover:from-[#d4b78f] hover:to-[#be9f70] text-[#071829] font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Concordar e Continuar</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
