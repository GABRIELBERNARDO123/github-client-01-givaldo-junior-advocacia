import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Type, 
  Sliders, 
  RotateCcw, 
  X, 
  Sparkles, 
  Keyboard, 
  Check, 
  MoveHorizontal,
  MousePointer,
  Ear,
  HelpCircle
} from 'lucide-react';
import { 
  AccessibilitySettings, 
  defaultSettings, 
  loadAccessibilitySettings, 
  saveAccessibilitySettings, 
  applyAccessibilityToDom,
  FontSizeOption,
  ContrastOption
} from '../utils/accessibility';

interface AccessibilityToolbarProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [mouseY, setMouseY] = useState(250);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Carrega configurações salvas na inicialização
  useEffect(() => {
    const loaded = loadAccessibilitySettings();
    setSettings(loaded);
    applyAccessibilityToDom(loaded);
    if (onSettingsChange) onSettingsChange(loaded);
  }, []);

  // Atalhos de teclado globais (Alt + A para acessibilidade, Alt + 1 para conteúdo, Alt + T para topo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A: Abre/fecha painel de acessibilidade
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Alt + 1: Pula direto para o conteúdo principal
      if (e.altKey && (e.key === '1' || e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
          announce('Navegado para o conteúdo principal');
        }
      }

      // Alt + T: Volta ao topo
      if (e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        announce('Página rolada para o topo');
      }

      // Escape: Fecha o painel de acessibilidade
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Régua de leitura que segue o cursor
  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingGuide]);

  // Atualiza e persiste configurações
  const updateSettings = (newSettings: AccessibilitySettings, announcementMsg?: string) => {
    setSettings(newSettings);
    saveAccessibilitySettings(newSettings);
    applyAccessibilityToDom(newSettings);
    if (onSettingsChange) onSettingsChange(newSettings);
    if (announcementMsg) {
      announce(announcementMsg);
    }
  };

  const announce = (msg: string) => {
    setLiveAnnouncement(msg);
    setTimeout(() => setLiveAnnouncement(''), 3500);
  };

  // Ajustes de tamanho de fonte
  const handleFontSize = (size: FontSizeOption) => {
    const labels = {
      normal: 'Tamanho padrão de texto (100%)',
      large: 'Texto grande ativado (115%)',
      xlarge: 'Texto extra grande ativado (130%)',
      xxlarge: 'Texto máximo ativado (145%)'
    };
    updateSettings({ ...settings, fontSize: size }, labels[size]);
  };

  // Ajustes de contraste
  const handleContrast = (contrast: ContrastOption) => {
    const labels = {
      default: 'Contraste visual padrão restaurado',
      'high-contrast-dark': 'Modo Alto Contraste Noturno ativado (WCAG AAA - Amarelo e Preto)',
      'high-contrast-light': 'Modo Alto Contraste Claro ativado (Preto e Branco)',
      grayscale: 'Modo Monocromático em tons de cinza ativado'
    };
    updateSettings({ ...settings, contrast }, labels[contrast]);
  };

  // Reset de todas as opções
  const handleReset = () => {
    updateSettings(defaultSettings, 'Todas as configurações de acessibilidade foram redefinidas para o padrão');
  };

  // Ativação do VLibras (robusto para celular e desktop)
  const handleActivateVLibras = () => {
    // 1. Fecha o painel no celular para que o modal não cubra o intérprete
    setIsOpen(false);

    const w = window as any;

    // 2. Método nativo oficial da suíte VLibras moderna (v7)
    if (w.VLibrasWidget && typeof w.VLibrasWidget.open === 'function') {
      try {
        w.VLibrasWidget.open();
        announce('Assistente de Língua Brasileira de Sinais (VLibras) acionado');
        return;
      } catch (err) {
        console.warn('Erro ao abrir VLibrasWidget:', err);
      }
    }

    // 3. Clique no botão dentro do Shadow DOM do wrapper oficial
    const shadowWrapper = document.getElementById('vlibras-access-wrapper');
    if (shadowWrapper && shadowWrapper.shadowRoot) {
      const shadowBtn = shadowWrapper.shadowRoot.querySelector('#vlibras-button') as HTMLElement | null;
      if (shadowBtn) {
        shadowBtn.click();
        announce('Assistente de Língua Brasileira de Sinais (VLibras) acionado');
        return;
      }
    }

    // 4. Clique na referência direta guardada pelo widget
    if (w.VLibrasWidget?.initBtn) {
      w.VLibrasWidget.initBtn.click();
      announce('Assistente de Língua Brasileira de Sinais (VLibras) acionado');
      return;
    }

    // 5. Fallback com injeção sob demanda se a rede móvel atrasou o carregamento
    if (!document.getElementById('vlibras-fallback-script')) {
      announce('Carregando intérprete de Libras no seu aparelho...');
      const script = document.createElement('script');
      script.id = 'vlibras-fallback-script';
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.onload = () => {
        setTimeout(() => {
          if (w.VLibrasWidget?.open) {
            w.VLibrasWidget.open();
            announce('Intérprete de Libras ativado');
          } else if (w.VLibras?.Widget) {
            new w.VLibras.Widget({ rootPath: 'https://vlibras.gov.br/app', position: 'R' });
            setTimeout(() => {
              w.VLibrasWidget?.open?.();
            }, 300);
          }
        }, 300);
      };
      document.body.appendChild(script);
    }
  };

  return (
    <>
      {/* Barra de Aviso Superior: sempre visível quando qualquer modo de contraste estiver ativo, permitindo voltar ao padrão em 1 toque */}
      {settings.contrast !== 'default' && (
        <aside 
          id="accessibility-quick-banner"
          aria-label="Aviso de alto contraste ativo"
          className="fixed top-0 left-0 right-0 z-[9999] bg-[#facc15] text-[#000000] px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold shadow-xl flex items-center justify-between border-b-2 border-black"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 shrink-0 text-black" />
            <span>
              Modo de Acessibilidade Ativo: {
                settings.contrast === 'high-contrast-dark' ? 'Alto Contraste Noturno (WCAG AAA)' :
                settings.contrast === 'high-contrast-light' ? 'Alto Contraste Claro' : 'Monocromático'
              }
            </span>
          </div>
          <button
            onClick={() => handleContrast('default')}
            className="px-3 py-1.5 bg-black text-[#facc15] hover:bg-neutral-900 rounded font-bold uppercase tracking-wider text-xs border border-[#facc15] cursor-pointer shadow-md flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
            aria-label="Restaurar cores e visual padrão do site"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Voltar ao Padrão</span>
          </button>
        </aside>
      )}

      {/* Região oculta para leitores de tela anunciarem alterações dinâmicas */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Régua de Leitura Acessível (Guia Visual de Foco) */}
      {settings.readingGuide && (
        <div 
          className="pointer-events-none fixed left-0 right-0 z-[9990] h-10 border-y-2 border-amber-400 bg-amber-400/20 transition-all duration-75 ease-out shadow-sm"
          style={{ top: `${mouseY - 20}px` }}
          aria-hidden="true"
        />
      )}

      {/* Botões Flutuantes de Acessibilidade & Libras (lado esquerdo para não conflitar com WhatsApp) */}
      <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-5 z-40 flex items-center gap-2">
        <button
          ref={toggleButtonRef}
          id="accessibility-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
          aria-label="Abrir Painel de Acessibilidade e Recursos para Deficiências Físicas e Visuais (Atalho: Alt + A)"
          title="Opções de Acessibilidade e Legibilidade (Alt + A)"
          className="group h-12 px-3.5 sm:px-4 rounded-full bg-[#071829] text-white border-2 border-[#c5a880] shadow-2xl hover:bg-[#0d2a47] focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:outline-none flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Símbolo Internacional de Acessibilidade da ONU / WCAG */}
          <div className="w-6 h-6 rounded-full bg-[#c5a880] text-[#071829] flex items-center justify-center font-bold text-xs shrink-0">
            <svg 
              className="w-4 h-4 fill-current" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#e2cda9] hidden sm:inline">
            Acessibilidade
          </span>
          <span className="hidden md:inline px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-slate-300 font-mono">
            Alt+A
          </span>
        </button>

        {/* Botão de Acesso Rápido a Libras para Celular e Computador */}
        <button
          onClick={handleActivateVLibras}
          aria-label="Abrir Tradutor Oficial de Libras (VLibras) com avatar 3D"
          title="Tradutor em Língua Brasileira de Sinais (Libras)"
          className="h-12 px-3 sm:px-3.5 rounded-full bg-[#1351b4] text-white border-2 border-white/80 shadow-2xl hover:bg-[#0d3b84] focus-visible:ring-4 focus-visible:ring-blue-300 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer font-bold text-xs"
        >
          <Ear className="w-4 h-4 shrink-0 text-white" />
          <span className="text-white text-[11px] uppercase tracking-wider">Libras</span>
        </button>
      </div>

      {/* Modal / Painel de Ferramentas de Acessibilidade */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-start sm:p-6 bg-black/70 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              toggleButtonRef.current?.focus();
            }
          }}
        >
          <div 
            ref={panelRef}
            id="accessibility-panel"
            className="w-full sm:max-w-lg bg-[#FAF9F5] text-[#071829] rounded-t-2xl sm:rounded-xl shadow-2xl border-2 border-[#c5a880] overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 sm:slide-in-from-left-6 duration-200"
          >
            {/* Cabeçalho do Painel */}
            <div className="bg-[#071829] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#c5a880]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c5a880] text-[#071829] flex items-center justify-center font-bold">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                  </svg>
                </div>
                <div>
                  <h2 id="accessibility-title" className="text-base sm:text-lg font-bold font-display text-white">
                    Recursos de Acessibilidade & Inclusão
                  </h2>
                  <p className="text-xs text-[#e2cda9]">
                    Adaptado para deficiências físicas, motoras e visuais
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  toggleButtonRef.current?.focus();
                }}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                aria-label="Fechar painel de acessibilidade (Tecla Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo de Opções com Rolagem */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              
              {/* 1. Tamanho do Texto */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-[#8a6828]" />
                    <span>Tamanho do Texto</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {settings.fontSize === 'normal' && 'Padrão (100%)'}
                    {settings.fontSize === 'large' && 'Grande (115%)'}
                    {settings.fontSize === 'xlarge' && 'Extra Grande (130%)'}
                    {settings.fontSize === 'xxlarge' && 'Máximo (145%)'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleFontSize('normal')}
                    aria-pressed={settings.fontSize === 'normal'}
                    className={`py-2.5 px-2 rounded font-semibold text-center border transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      settings.fontSize === 'normal'
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    100% (A)
                  </button>
                  <button
                    onClick={() => handleFontSize('large')}
                    aria-pressed={settings.fontSize === 'large'}
                    className={`py-2.5 px-2 rounded font-semibold text-center border transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      settings.fontSize === 'large'
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    115% (A+)
                  </button>
                  <button
                    onClick={() => handleFontSize('xlarge')}
                    aria-pressed={settings.fontSize === 'xlarge'}
                    className={`py-2.5 px-2 rounded font-semibold text-center border transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      settings.fontSize === 'xlarge'
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    130% (A++)
                  </button>
                  <button
                    onClick={() => handleFontSize('xxlarge')}
                    aria-pressed={settings.fontSize === 'xxlarge'}
                    className={`py-2.5 px-2 rounded font-semibold text-center border transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      settings.fontSize === 'xxlarge'
                        ? 'bg-[#071829] text-white border-[#c5a880] shadow'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    145% (A+++)
                  </button>
                </div>
              </div>

              {/* 2. Modos de Contraste e Cores */}
              <div>
                <label className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <Eye className="w-4 h-4 text-[#8a6828]" />
                  <span>Contraste Visual & Cores</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleContrast('default')}
                    aria-pressed={settings.contrast === 'default'}
                    className={`p-3 rounded border text-left flex items-center justify-between transition-all cursor-pointer min-h-[48px] ${
                      settings.contrast === 'default'
                        ? 'bg-[#071829] text-white border-[#c5a880]'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-medium">Padrão do Site</span>
                    {settings.contrast === 'default' && <Check className="w-4 h-4 text-[#c5a880]" />}
                  </button>

                  <button
                    onClick={() => handleContrast('high-contrast-dark')}
                    aria-pressed={settings.contrast === 'high-contrast-dark'}
                    className={`p-3 rounded border text-left flex items-center justify-between transition-all cursor-pointer min-h-[48px] ${
                      settings.contrast === 'high-contrast-dark'
                        ? 'bg-black text-yellow-300 border-yellow-400 ring-2 ring-yellow-400'
                        : 'bg-black text-yellow-300 border-slate-700 hover:opacity-90'
                    }`}
                  >
                    <span className="font-bold">Alto Contraste Noturno</span>
                    {settings.contrast === 'high-contrast-dark' && <Check className="w-4 h-4 text-yellow-300" />}
                  </button>

                  <button
                    onClick={() => handleContrast('high-contrast-light')}
                    aria-pressed={settings.contrast === 'high-contrast-light'}
                    className={`p-3 rounded border text-left flex items-center justify-between transition-all cursor-pointer min-h-[48px] ${
                      settings.contrast === 'high-contrast-light'
                        ? 'bg-white text-black border-black ring-2 ring-black font-bold'
                        : 'bg-white text-black border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold">Alto Contraste Claro</span>
                    {settings.contrast === 'high-contrast-light' && <Check className="w-4 h-4 text-black" />}
                  </button>

                  <button
                    onClick={() => handleContrast('grayscale')}
                    aria-pressed={settings.contrast === 'grayscale'}
                    className={`p-3 rounded border text-left flex items-center justify-between transition-all cursor-pointer min-h-[48px] ${
                      settings.contrast === 'grayscale'
                        ? 'bg-slate-700 text-white border-slate-400 ring-2 ring-slate-400'
                        : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span className="font-medium">Monocromático</span>
                    {settings.contrast === 'grayscale' && <Check className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>

              {/* 3. Legibilidade, Dislexia e Alinhamento */}
              <div>
                <label className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <Sliders className="w-4 h-4 text-[#8a6828]" />
                  <span>Legibilidade & Auxílios Visuais</span>
                </label>
                <div className="space-y-2">
                  {/* Fonte Sem Serifa Simples */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, readableFont: !settings.readableFont },
                      settings.readableFont ? 'Fonte padrão restaurada' : 'Fonte de alta legibilidade sem serifa ativada'
                    )}
                    aria-pressed={settings.readableFont}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Fonte de Alta Legibilidade</div>
                      <div className="text-[11px] text-slate-500">Tipografia sem serifa limpa para baixa visão e dislexia</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.readableFont ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.readableFont && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Espaçamento Ampliado de Linhas */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, increasedSpacing: !settings.increasedSpacing },
                      settings.increasedSpacing ? 'Espaçamento normal restaurado' : 'Espaçamento ampliado entre linhas ativado'
                    )}
                    aria-pressed={settings.increasedSpacing}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Espaçamento Ampliado</div>
                      <div className="text-[11px] text-slate-500">Aumenta espaço entre linhas e palavras para leitura confortável</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.increasedSpacing ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.increasedSpacing && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Destacar Links e Botões */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, highlightLinks: !settings.highlightLinks },
                      settings.highlightLinks ? 'Destaque de links desativado' : 'Destaque visual em todos os links ativado'
                    )}
                    aria-pressed={settings.highlightLinks}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Destacar Links e Botões</div>
                      <div className="text-[11px] text-slate-500">Sublinha e evidencia todas as áreas clicáveis da página</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.highlightLinks ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.highlightLinks && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* 4. Acessibilidade Motora & Física */}
              <div>
                <label className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <MoveHorizontal className="w-4 h-4 text-[#8a6828]" />
                  <span>Acessibilidade Motora & Física</span>
                </label>
                <div className="space-y-2">
                  {/* Régua de Leitura Guia */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, readingGuide: !settings.readingGuide },
                      settings.readingGuide ? 'Régua de leitura desativada' : 'Régua de leitura ativada'
                    )}
                    aria-pressed={settings.readingGuide}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Régua de Leitura / Guia de Foco</div>
                      <div className="text-[11px] text-slate-500">Linha horizontal que acompanha o cursor para evitar perda de linha</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.readingGuide ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.readingGuide && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Redução de Movimento */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, reducedMotion: !settings.reducedMotion },
                      settings.reducedMotion ? 'Movimento padrão restaurado' : 'Todas as animações foram desativadas'
                    )}
                    aria-pressed={settings.reducedMotion}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Desativar Animações e Efeitos</div>
                      <div className="text-[11px] text-slate-500">Evita tontura, cinetose e melhora desempenho para navegação motora</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.reducedMotion ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.reducedMotion && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Desativar Cursor Personalizado */}
                  <button
                    onClick={() => updateSettings(
                      { ...settings, disableCustomCursor: !settings.disableCustomCursor },
                      settings.disableCustomCursor ? 'Cursor temático reativado' : 'Cursor padrão do sistema ativado'
                    )}
                    aria-pressed={settings.disableCustomCursor}
                    className="w-full p-3 rounded border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer min-h-[48px]"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Cursor Padrão do Sistema</div>
                      <div className="text-[11px] text-slate-500">Desativa o anel decorativo para rastreadores de olho ou mouse de acessibilidade</div>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${settings.disableCustomCursor ? 'bg-[#071829] border-[#071829] text-white' : 'border-slate-300'}`}>
                      {settings.disableCustomCursor && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* 5. Tradutor em Libras (VLibras) */}
              <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-lg flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Ear className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-blue-900">Língua Brasileira de Sinais (Libras)</div>
                    <div className="text-[11px] text-blue-700">Tradução automática oficial via VLibras para pessoas surdas</div>
                  </div>
                </div>
                <button
                  onClick={handleActivateVLibras}
                  className="px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shrink-0 cursor-pointer min-h-[36px]"
                >
                  Abrir Libras
                </button>
              </div>

              {/* 6. Guia de Atalhos de Teclado */}
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-[11px] text-slate-700 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-slate-900">
                  <Keyboard className="w-4 h-4 text-[#8a6828]" />
                  <span>Atalhos de Teclado Rápidos:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-bold">Alt + A</kbd> : Abrir/fechar este painel</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-bold">Alt + 1</kbd> : Ir para o conteúdo principal</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-bold">Alt + T</kbd> : Voltar ao topo da página</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-bold">Esc</kbd> : Fechar janelas e modais</li>
                </ul>
              </div>

            </div>

            {/* Rodapé do Painel com Redefinição */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded text-slate-700 hover:text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent hover:border-red-200 min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  toggleButtonRef.current?.focus();
                }}
                className="px-5 py-2 rounded bg-[#071829] hover:bg-[#0c2842] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
              >
                Concluir
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
