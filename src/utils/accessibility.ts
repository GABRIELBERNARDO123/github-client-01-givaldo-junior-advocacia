// Gerenciamento centralizado de acessibilidade e legibilidade
// Conforme WCAG 2.1 / 2.2 Níveis AA e AAA e Lei Brasileira de Inclusão (Lei nº 13.146/2015)

export type FontSizeOption = 'normal' | 'large' | 'xlarge' | 'xxlarge';
export type ContrastOption = 'default' | 'high-contrast-dark' | 'high-contrast-light' | 'grayscale';

export interface AccessibilitySettings {
  fontSize: FontSizeOption;
  contrast: ContrastOption;
  readableFont: boolean;
  increasedSpacing: boolean;
  highlightLinks: boolean;
  reducedMotion: boolean;
  readingGuide: boolean;
  disableCustomCursor: boolean;
}

export const defaultSettings: AccessibilitySettings = {
  fontSize: 'normal',
  contrast: 'default',
  readableFont: false,
  increasedSpacing: false,
  highlightLinks: false,
  reducedMotion: false,
  readingGuide: false,
  disableCustomCursor: false,
};

const STORAGE_KEY = 'givaldo_acessibilidade_settings_v1';

export const loadAccessibilitySettings = (): AccessibilitySettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Não foi possível ler configurações de acessibilidade:', e);
  }
  return defaultSettings;
};

export const saveAccessibilitySettings = (settings: AccessibilitySettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Não foi possível salvar configurações de acessibilidade:', e);
  }
};

export const applyAccessibilityToDom = (settings: AccessibilitySettings): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const body = document.body;

  // 1. Tamanho da Fonte
  body.classList.remove('acc-font-large', 'acc-font-xlarge', 'acc-font-xxlarge');
  if (settings.fontSize === 'large') body.classList.add('acc-font-large');
  else if (settings.fontSize === 'xlarge') body.classList.add('acc-font-xlarge');
  else if (settings.fontSize === 'xxlarge') body.classList.add('acc-font-xxlarge');

  // 2. Contraste
  body.classList.remove('acc-contrast-dark', 'acc-contrast-light', 'acc-grayscale');
  if (settings.contrast === 'high-contrast-dark') {
    body.classList.add('acc-contrast-dark');
  } else if (settings.contrast === 'high-contrast-light') {
    body.classList.add('acc-contrast-light');
  } else if (settings.contrast === 'grayscale') {
    body.classList.add('acc-grayscale');
  }

  // 3. Fonte de Alta Legibilidade (para baixa visão e dislexia)
  if (settings.readableFont) {
    body.classList.add('acc-readable-font');
  } else {
    body.classList.remove('acc-readable-font');
  }

  // 4. Espaçamento Ampliado de Linhas e Palavras
  if (settings.increasedSpacing) {
    body.classList.add('acc-spacing');
  } else {
    body.classList.remove('acc-spacing');
  }

  // 5. Destacar Links e Botões
  if (settings.highlightLinks) {
    body.classList.add('acc-highlight-links');
  } else {
    body.classList.remove('acc-highlight-links');
  }

  // 6. Redução de Movimento
  if (settings.reducedMotion) {
    body.classList.add('acc-reduced-motion');
    root.style.scrollBehavior = 'auto';
  } else {
    body.classList.remove('acc-reduced-motion');
    root.style.scrollBehavior = 'smooth';
  }

  // 7. Desativar Cursor Personalizado (reverte para o cursor nativo do sistema operacional)
  if (settings.disableCustomCursor) {
    body.classList.add('acc-default-cursor');
  } else {
    body.classList.remove('acc-default-cursor');
  }
};
