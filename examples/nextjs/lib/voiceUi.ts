export const voiceThemes = ['dark', 'light'] as const;
export type VoiceTheme = (typeof voiceThemes)[number];

export const voiceThemeStorageKey = 'voice-ui-theme';
export const voiceDensityStorageKey = 'voice-ui-density';

export const voiceStates = [
  'connecting',
  'listening',
  'thinking',
  'speaking',
  'disconnected',
] as const;

export type VoiceState = (typeof voiceStates)[number];
export type VoiceDensity = 'comfortable' | 'compact';

export const voiceThemeLabel: Record<VoiceTheme, string> = {
  dark: 'Темная',
  light: 'Светлая',
};

export const resolveVoiceThemeClass = (theme: VoiceTheme): string => {
  switch (theme) {
    case 'light':
      return 'themeLight';
    default:
      return 'themeDark';
  }
};

export const normalizeVoiceState = (state: string): VoiceState => {
  if (state === 'initializing' || state === 'connecting') return 'connecting';
  if (state === 'listening') return 'listening';
  if (state === 'thinking') return 'thinking';
  if (state === 'speaking') return 'speaking';
  return 'disconnected';
};

export const getStoredVoiceTheme = (fallback: VoiceTheme = 'dark'): VoiceTheme => {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = window.localStorage.getItem(voiceThemeStorageKey) as VoiceTheme | null;
    return stored && voiceThemes.includes(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
};

export const setStoredVoiceTheme = (theme: VoiceTheme): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(voiceThemeStorageKey, theme);
  } catch {
    // Ignore storage failures and keep runtime state only.
  }
};

export const getStoredVoiceDensity = (fallback: VoiceDensity = 'comfortable'): VoiceDensity => {
  if (typeof window === 'undefined') return fallback;
  try {
    return window.localStorage.getItem(voiceDensityStorageKey) === 'compact' ? 'compact' : fallback;
  } catch {
    return fallback;
  }
};

export const setStoredVoiceDensity = (density: VoiceDensity): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(voiceDensityStorageKey, density);
  } catch {
    // Ignore storage failures and keep runtime state only.
  }
};
