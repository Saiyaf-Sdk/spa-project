import { computed } from 'vue';
import { defineStore } from 'pinia';
import { session, updateSession } from '@/lib/session';
import type { LoginRequest } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => ({
  user: computed(() => session.value.user),
  isAuthenticated: computed(() => Boolean(session.value.user)),
  login: (form: LoginRequest) => updateSession('/auth/login', form),
  register: (form: LoginRequest & { firstName: string }) => updateSession('/auth/register', form),
  logout: () => updateSession('/auth/logout', {})
}));
