import { computed, ref } from 'vue';
import { THEME_STORAGE_KEY } from '@/lib/constants';

type ThemeMode = 'light' | 'dark';

const mode = ref<ThemeMode>('light');
let initialized = false;

function detectPreferredTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(next: ThemeMode): void {
  mode.value = next;
  document.documentElement.classList.toggle('dark', next === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, next);
}

export function useTheme() {
  if (!initialized) {
    applyTheme(detectPreferredTheme());
    initialized = true;
  }

  const isDark = computed(() => mode.value === 'dark');

  function toggleTheme(): void {
    applyTheme(isDark.value ? 'light' : 'dark');
  }

  return {
    mode,
    isDark,
    toggleTheme,
    setTheme: applyTheme
  };
}

