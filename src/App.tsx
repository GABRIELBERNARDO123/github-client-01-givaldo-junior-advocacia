import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PracticeAreas } from './components/PracticeAreas';
import { ComparisonTable } from './components/ComparisonTable';
import { AboutLawyer } from './components/AboutLawyer';
import { ProcessSteps } from './components/ProcessSteps';
import { ResolvedCases } from './components/ResolvedCases';
import { DocumentChecklist } from './components/DocumentChecklist';
import { FaqSection } from './components/FaqSection';
import { ExecutiveContact } from './components/ExecutiveContact';
import { OfficeLocation } from './components/OfficeLocation';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { StickyMobileCta } from './components/StickyMobileCta';
import { ThemedCursor } from './components/ThemedCursor';
import { LgpdBanner } from './components/LgpdBanner';
import { LgpdModal } from './components/LgpdModal';
import { NotFoundModal } from './components/NotFoundModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { AccessibilitySettings, defaultSettings } from './utils/accessibility';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultSettings);

  // Ativa motor global de revelação suave por rolagem (Emil Kowalski style)
  useScrollReveal();

  // Listener para rota 404 via hash (#404)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#404' || window.location.pathname === '/404') {
        setIsNotFoundOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] text-[#071829] flex flex-col selection:bg-[#c5a880]/30 selection:text-[#071829] relative overflow-x-hidden">
      {/* Custom Themed Cursor (desativável para mobilidade reduzida / rastreadores) */}
      <ThemedCursor 
        disabled={accessibilitySettings.disableCustomCursor || accessibilitySettings.reducedMotion} 
      />

      {/* Navigation - Botões direcionam ao WhatsApp oficial e atalhos acessíveis */}
      <Header 
        onOpenAccessibility={() => {
          const btn = document.querySelector('[aria-controls="accessibility-panel"]') as HTMLButtonElement | null;
          btn?.click();
        }}
        onOpenNotFound={() => setIsNotFoundOpen(true)}
      />

      {/* Main Content Sections - Marcado com id="main-content" para leitores de tela e atalho Alt + 1 */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />

        <PracticeAreas />

        <ComparisonTable />

        <AboutLawyer />

        <ProcessSteps />

        <ResolvedCases />

        <DocumentChecklist />

        <FaqSection />

        <ExecutiveContact />

        <OfficeLocation />
      </main>

      {/* Footer com link direto para LGPD, WhatsApp e Rota 404 */}
      <Footer 
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenNotFound={() => setIsNotFoundOpen(true)}
      />

      {/* Barra e Painel de Acessibilidade Flutuante (Alt + A) */}
      <AccessibilityToolbar 
        onSettingsChange={(newSettings) => setAccessibilitySettings(newSettings)}
      />

      {/* Quadrinho "Consulta Reservada (Dr. Givaldo Júnior • OAB/PR 100.231)" com Zap e Maps diretos */}
      <FloatingConcierge />

      {/* CTA Fixo no Mobile (Sticky CTA) no rodapé da tela para conversão imediata sem formulários */}
      <StickyMobileCta />

      {/* Banner de Conformidade com a LGPD e Sigilo OAB */}
      <LgpdBanner 
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
      />

      {/* Modal Completo de Política de Privacidade e Proteção de Dados (LGPD) */}
      <LgpdModal 
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      {/* Página / Modal 404 Personalizada no Tema Jurídico */}
      <NotFoundModal 
        isOpen={isNotFoundOpen}
        onClose={() => setIsNotFoundOpen(false)}
      />
    </div>
  );
}
