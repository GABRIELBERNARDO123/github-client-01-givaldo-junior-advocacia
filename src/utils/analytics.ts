// Utilitário de rastreamento e eventos para Google Analytics (gtag) e Meta Pixel (fbq)
// Pronto para receber o ID de medição (ex: G-XXXXXXXXXX) e ID do Pixel (ex: 1234567890)

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    // 1. Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...eventParams });
    }

    // 2. Meta Pixel
    if (typeof window.fbq === 'function') {
      if (eventName === 'contact_whatsapp') {
        window.fbq('track', 'Contact', eventParams);
      } else if (eventName === 'schedule_consultation') {
        window.fbq('track', 'Schedule', eventParams);
      } else {
        window.fbq('trackCustom', eventName, eventParams);
      }
    }
  } catch (error) {
    // Silencioso em produção para não interromper fluxo do usuário
  }
};

export const trackWhatsAppClick = (source: string, contextMessage?: string) => {
  trackEvent('contact_whatsapp', {
    source,
    context: contextMessage || 'Givaldo Junior Advocacia',
    timestamp: new Date().toISOString()
  });
};

export const trackFormSubmit = (area: string, modality: string) => {
  trackEvent('schedule_consultation', {
    practice_area: area,
    modality,
    timestamp: new Date().toISOString()
  });
};
