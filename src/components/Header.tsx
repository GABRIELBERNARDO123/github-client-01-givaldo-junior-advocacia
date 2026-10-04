import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Shield, 
  Clock, 
  MessageCircle, 
  AlertCircle,
  Home,
  Scale,
  User,
  Compass,
  Award,
  HelpCircle,
  FileText,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { officeInfo } from '../data/legalData';
import { getWhatsAppLink } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

interface HeaderProps {
  onOpenAccessibility?: () => void;
  onOpenNotFound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAccessibility, onOpenNotFound }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const menuTouchStartY = useRef<number | null>(null);

  const handleMenuTouchStart = (e: React.TouchEvent) => {
    menuTouchStartY.current = e.targetTouches[0].clientY;
  };

  const handleMenuTouchEnd = (e: React.TouchEvent) => {
    if (menuTouchStartY.current === null) return;
    const currentY = e.changedTouches[0].clientY;
    // Se o usuário deslizou mais de 45px para cima, fecha o menu suavemente
    if (menuTouchStartY.current - currentY > 45) {
      setMobileMenuOpen(false);
    }
    menuTouchStartY.current = null;
  };

  const navLinks = [
    { label: 'Início', href: '#inicio', id: 'inicio', icon: Home, short: 'Início' },
    { label: 'Áreas de Atuação', href: '#atuacao', id: 'atuacao', icon: Scale, short: 'Atuação' },
    { label: 'Sobre o Advogado', href: '#advogado', id: 'advogado', icon: User, short: 'Sobre' },
    { label: 'Diferenciais', href: '#diferenciais', id: 'diferenciais', icon: CheckCircle2, short: 'Diferenciais' },
    { label: 'Metodologia', href: '#metodologia', id: 'metodologia', icon: Compass, short: 'Como Funciona' },
    { label: 'Casos Resolvidos', href: '#casos-resolvidos', id: 'casos-resolvidos', icon: Award, short: 'Casos' },
    { label: 'Documentos', href: '#documentos', id: 'documentos', icon: FileText, short: 'Documentos' },
    { label: 'Dúvidas', href: '#duvidas', id: 'duvidas', icon: HelpCircle, short: 'Dúvidas' },
    { label: 'Contato Executivo', href: '#contato', id: 'contato', icon: MessageCircle, short: 'Contato' },
    { label: 'Localização', href: '#escritorio', id: 'escritorio', icon: MapPin, short: 'Sede' }
  ];

  // Bloqueia rolagem do body quando o menu fullscreen está ativo no mobile
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Observador de seção ativa otimizado com requestAnimationFrame para evitar layout thrashing
  useEffect(() => {
    let ticking = false;
    let currentActive = 'inicio';

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 180;
          for (const link of navLinks) {
            const el = document.getElementById(link.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                if (currentActive !== link.id) {
                  currentActive = link.id;
                  setActiveSection(link.id);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Link de Atalho para Pular para o Conteúdo Principal (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[99999] focus:px-4 focus:py-3 focus:bg-[#c5a880] focus:text-[#071829] focus:font-bold focus:text-sm focus:rounded-md focus:shadow-2xl focus:ring-4 focus:ring-black focus:outline-none"
      >
        Pular para o conteúdo principal (Alt + 1)
      </a>

      <header className="sticky top-0 z-40 w-full bg-[#071829] border-b border-[#c5a880]/30 text-white shadow-2xl transition-all">
        {/* Top Utility Bar (visível em telas médias e grandes) */}
        <div className="hidden md:block bg-[#040D17] border-b border-white/10 py-1.5 text-xs text-[#a0aec0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
            <div className="flex items-center space-x-4 lg:space-x-6 min-w-0">
              <span className="flex items-center gap-1.5 text-[#e2cda9] truncate">
                <Shield className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span className="truncate font-semibold">Dr. Givaldo Júnior • Advogado OAB/PR 100.231</span>
              </span>
              <span className="hidden xl:flex items-center gap-1 text-slate-300 truncate">
                <MapPin className="w-3 h-3 text-[#c5a880] shrink-0" />
                <span>Cascavel/PR • Atendimento Presencial & Online em todo o Brasil</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-4 shrink-0">
              {/* Botão de Acessibilidade no Topo */}
              {onOpenAccessibility && (
                <button
                  onClick={onOpenAccessibility}
                  className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#e2cda9] hover:text-white transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                  title="Abrir Opções de Acessibilidade (Alt + A)"
                  aria-label="Abrir Opções de Acessibilidade (Atalho: Alt + A)"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                  </svg>
                  <span>Acessibilidade</span>
                </button>
              )}

              {/* Botão Teste 404 Personalizado */}
              {onOpenNotFound && (
                <button
                  onClick={onOpenNotFound}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-[10px] font-medium cursor-pointer hidden 2xl:flex items-center gap-1"
                  title="Testar Página 404 Personalizada"
                >
                  <AlertCircle className="w-3 h-3 text-[#c5a880]" />
                  <span>Erro 404</span>
                </button>
              )}

              <span className="hidden lg:flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-[#c5a880] shrink-0" />
                <span>Seg a Sex: 08:00 às 18:00</span>
              </span>

              <a 
                href={getWhatsAppLink('Olá, Dr. Givaldo. Gostaria de tirar uma dúvida jurídica pelo WhatsApp.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('header_top_bar_phone')}
                className="flex items-center gap-1.5 text-slate-200 hover:text-[#c5a880] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span className="tabular-nums">{officeInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha Principal de Navegação e Logotipo */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* LOGOTIPO OFICIAL DO DOUTOR (SOLICITADO PELO CLIENTE) */}
            <a 
              href="#inicio" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#inicio');
              }}
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0 py-1"
              aria-label="Dr. Givaldo Júnior Advogado — Página Inicial"
            >
              <div className="flex items-center gap-2 transition-transform group-hover:scale-[1.02]">
                <img 
                  src="/assets/favicon-removebg-preview.png" 
                  alt="Logotipo Oficial Dr. Givaldo Júnior Advocacia — OAB/PR 100.231" 
                  className="h-10 xs:h-11 sm:h-12 md:h-14 w-auto max-w-[170px] xs:max-w-[200px] sm:max-w-[250px] object-contain filter drop-shadow-[0_2px_10px_rgba(197,168,128,0.28)]" 
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
            </a>

            {/* Links de Navegação Desktop (visíveis a partir de telas lg) */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-xs font-semibold tracking-wide shrink-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`transition-colors py-2 px-1 relative group whitespace-nowrap ${
                      isActive ? 'text-[#c5a880] font-bold' : 'text-slate-200 hover:text-[#c5a880]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#c5a880] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} 
                    />
                  </a>
                );
              })}
            </nav>

            {/* Ações à Direita: CTA WhatsApp & Botão de Menu para Telas Pequenas */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Botão de Contato Direto WhatsApp com Física Tátil */}
              <a
                href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de conversar com o senhor sobre o meu caso.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('header_primary_cta')}
                aria-label="Falar no WhatsApp com o Dr. Givaldo Júnior"
                className="btn-tactile-gold h-9 sm:h-10 px-3 xs:px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] text-[11px] sm:text-xs font-bold tracking-wide shadow-lg shadow-black/30 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 shrink-0 min-h-[36px] sm:min-h-[40px]"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current" />
                <span>
                  <span className="hidden xs:inline">Falar no </span>WhatsApp
                </span>
              </a>

              {/* Botão Alternador do Menu em Telas Pequenas */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 px-2.5 sm:h-10 sm:px-3 rounded-lg border border-[#c5a880]/40 text-slate-100 hover:text-white bg-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#c5a880] cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors text-xs font-semibold"
                aria-label={mobileMenuOpen ? "Fechar menu de seções" : "Abrir menu de seções"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <>
                    <X className="w-4 h-4 text-[#c5a880]" />
                    <span className="text-[11px] sm:text-xs">Fechar</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4 text-[#c5a880]" />
                    <span className="text-[11px] sm:text-xs">Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* BARRA DE LINKS VISÍVEIS DIRETAMENTE EM TELAS PEQUENAS (MOBILE & TABLETS) */}
        {/* Resolve 100% o problema: os links da página ficam imediatamente visíveis e clicáveis em um scroll horizontal suave no topo do mobile */}
        <div className="lg:hidden border-t border-[#c5a880]/25 bg-[#051322]/95 backdrop-blur-md px-2.5 sm:px-4 py-2">
          <div className="flex items-center justify-between pb-1 px-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a880] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              Navegar pelas seções da página:
            </span>
            <span className="text-[9px] text-slate-400">Deslize para ver mais ➔</span>
          </div>

          <nav 
            aria-label="Navegação rápida de seções em dispositivos móveis"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all shrink-0 active:scale-95 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-[#c5a880] text-[#071829] shadow-md shadow-black/40 font-bold' 
                      : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#071829]' : 'text-[#c5a880]'}`} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* MENU FULLSCREEN MINIMALISTA DE ALTO PADRÃO PARA MOBILE (AWWWARDS STYLE) */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-50 bg-[#040c17]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 text-white overflow-y-auto overscroll-contain animate-fade-in"
          >
            {/* Topo do Menu Fullscreen: Logotipo Oficial & Botão Fechar Ergonômico */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/favicon-removebg-preview.png" 
                  alt="Dr. Givaldo Júnior Advocacia" 
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,168,128,0.3)]"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/favicon.png';
                  }}
                />
                <div>
                  <div className="text-xs font-display font-bold text-white tracking-wide">
                    Dr. Givaldo Júnior
                  </div>
                  <div className="text-[10px] text-[#c5a880] uppercase tracking-wider font-semibold">
                    OAB/PR 100.231
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="Fechar menu em tela cheia"
              >
                <X className="w-5 h-5 text-[#c5a880]" />
              </button>
            </div>

            {/* Navegação Principal em Tela Cheia com Tipografia Editorial Elegante */}
            <nav className="py-6 sm:py-8 space-y-2 sm:space-y-3 my-auto">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] mb-3">
                Navegação Executiva:
              </div>

              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`group flex items-center justify-between py-2.5 sm:py-3 transition-colors cursor-pointer border-b border-white/5 ${
                      isActive ? 'text-[#c5a880]' : 'text-slate-200 hover:text-[#c5a880]'
                    }`}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span className="text-xs font-cinzel text-[#c5a880]/60 font-semibold w-5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isActive ? 'text-[#c5a880]' : 'text-slate-500'}`} />
                  </a>
                );
              })}
            </nav>

            {/* Rodapé do Menu Fullscreen: Ações de Contato Direto & Autoridade */}
            <div className="pt-4 border-t border-white/10 shrink-0 space-y-3">
              <a
                href={getWhatsAppLink('Olá, Dr. Givaldo Júnior. Gostaria de conversar diretamente com o senhor.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackWhatsAppClick('fullscreen_menu_whatsapp');
                }}
                className="btn-tactile-gold w-full h-12 rounded-xl bg-gradient-to-r from-[#c5a880] via-[#d4b78f] to-[#b09164] text-[#071829] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>Falar no WhatsApp com o Dr. Givaldo</span>
              </a>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <a
                  href={`tel:${officeInfo.phoneRaw}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{officeInfo.phone}</span>
                </a>
                <span>Cascavel/PR • Atendimento Nacional</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
