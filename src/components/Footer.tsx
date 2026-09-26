import React from 'react';
import { Phone, Mail, Instagram, MapPin, Shield, ArrowUp, MessageCircle, AlertCircle } from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenNotFound?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy, onOpenNotFound }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040D17] text-slate-300 border-t border-[#c5a880]/20 pt-16 pb-16 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center">
              <img 
                src="/assets/favicon-removebg-preview.png" 
                alt="Logotipo Oficial Dr. Givaldo Júnior Advocacia — OAB/PR 100.231" 
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain filter drop-shadow-[0_2px_10px_rgba(197,168,128,0.25)]" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('favicon.png')) {
                    target.src = '/assets/favicon.png';
                  } else if (!target.src.includes('logo-givaldo-gold.svg')) {
                    target.src = '/assets/logo-givaldo-gold.svg';
                  }
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm pt-2">
              Advocacia estratégica e resolutiva com atendimento pessoal pelo Dr. Givaldo Júnior. Rigor ético, profundidade técnica e sigilo absoluto garantidos pela OAB/PR 100.231.
            </p>

            <div className="pt-2 text-xs text-[#c5a880] font-medium flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Inscrito na Ordem dos Advogados do Brasil • OAB/PR 100.231</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c5a880]">
              Navegação
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#inicio" className="hover:text-[#c5a880] transition-colors">Início</a>
              </li>
              <li>
                <a href="#atuacao" className="hover:text-[#c5a880] transition-colors">Áreas de Atuação</a>
              </li>
              <li>
                <a href="#advogado" className="hover:text-[#c5a880] transition-colors">Sobre o Advogado</a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-[#c5a880] transition-colors">Como Conduzo Sua Causa</a>
              </li>
              <li>
                <a href="#casos-resolvidos" className="hover:text-[#c5a880] transition-colors">Casos Resolvidos</a>
              </li>
              <li>
                <a href="#documentos" className="hover:text-[#c5a880] transition-colors">Documentos Necessários</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#c5a880] transition-colors">Contato & Avaliação</a>
              </li>
              <li>
                <a href="#escritorio" className="hover:text-[#c5a880] transition-colors">Localização em Cascavel</a>
              </li>
              {onOpenNotFound && (
                <li>
                  <button 
                    onClick={onOpenNotFound}
                    className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-300"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Página 404 Personalizada</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c5a880]">
              Fale Comigo Diretamente
            </div>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{officeInfo.address.neighborhood}, {officeInfo.address.city} – {officeInfo.address.state}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a 
                  href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de tirar uma dúvida pelo WhatsApp.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  WhatsApp: {officeInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a href={`mailto:${officeInfo.email}`} className="hover:text-white transition-colors">
                  {officeInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Instagram className="w-4 h-4 text-[#c5a880] shrink-0" />
                <a 
                  href={officeInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @givaldojradv
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#c5a880] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Voltar ao topo da página</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Ethical Disclaimer & LGPD */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>
              © {new Date().getFullYear()} Givaldo Junior Advocacia • OAB/PR 100.231. Todos os direitos reservados.
            </p>
            {onOpenPrivacyPolicy && (
              <button
                onClick={onOpenPrivacyPolicy}
                className="text-[#c5a880] hover:text-white underline underline-offset-2 cursor-pointer transition-colors"
              >
                Privacidade & Conformidade LGPD (Lei 13.709/18)
              </button>
            )}
          </div>
          <p className="max-w-md text-center md:text-right font-light">
            Este site possui caráter institucional e informativo, em estrita conformidade com o Provimento nº 205/2021 e o Código de Ética e Disciplina da OAB.
          </p>
        </div>

      </div>
    </footer>
  );
};
