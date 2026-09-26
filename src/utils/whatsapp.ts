// Utilitário central para direcionamento ao WhatsApp do Dr. Givaldo Júnior
// Número oficial solicitado: +55 45 99903-3123 (5545999033123)

export const WHATSAPP_PHONE_RAW = '5545999033123';
export const WHATSAPP_PHONE_DISPLAY = '+55 45 99903-3123';

export const getWhatsAppLink = (customMessage?: string): string => {
  const defaultText = 'Olá, Dr. Givaldo Júnior. Gostaria de uma orientação jurídica sobre a minha situação de Direito de Família/Sucessões.';
  const message = customMessage || defaultText;
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (customMessage?: string): void => {
  const url = getWhatsAppLink(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
};
