<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200/50 bg-white/65 backdrop-blur-xl backdrop-saturate-150 dark:border-slate-700/40 dark:bg-slate-950/65"
  >
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo -->
      <RouterLink
        class="flex items-center gap-2.5 font-display text-xl font-bold text-slate-800 transition hover:opacity-80 dark:text-slate-100"
        to="/"
      >
        <span
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-extrabold text-white shadow-md shadow-brand-600/30"
        >
          LC
        </span>
        <span>Lumen<span class="text-brand-600 dark:text-brand-400">Cart</span></span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          class="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-brand-50 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
          to="/"
        >
          Shop
        </RouterLink>
        <RouterLink
          class="relative rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-brand-50 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
          to="/cart"
        >
          Cart
          <span
            v-if="cartCount > 0"
            class="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ember-500 text-[10px] font-bold text-white shadow-sm"
          >
            {{ cartCount > 9 ? '9+' : cartCount }}
          </span>
        </RouterLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          class="group rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-600 transition-all duration-200 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300"
          type="button"
          title="Toggle theme"
          @click="toggleTheme"
        >
          <!-- Sun icon (shown in dark mode) -->
          <svg v-if="isDark" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Login / User -->
        <RouterLink
          v-if="!isAuthenticated"
          class="hidden rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg sm:inline-flex"
          to="/login"
        >
          Log In
        </RouterLink>

        <div
          v-else
          class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 sm:flex"
        >
          <span class="font-semibold">{{ firstName }}</span>
          <button
            class="rounded-lg bg-ember-500 px-2.5 py-1 font-bold text-white transition hover:bg-ember-600"
            type="button"
            @click="logout"
          >
            Log Out
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="inline-flex items-center justify-center rounded-xl border border-slate-300 p-2 text-slate-700 transition hover:border-brand-400 md:hidden dark:border-slate-600 dark:text-slate-200"
          type="button"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileOpen"
      class="border-t border-slate-200/70 px-4 py-3 md:hidden dark:border-slate-700/60"
    >
      <div class="flex flex-col gap-1">
        <RouterLink
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/"
        >
          Shop
        </RouterLink>
        <RouterLink
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/cart"
        >
          Cart ({{ cartCount }})
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/login"
        >
          Log In
        </RouterLink>
        <button
          v-else
          class="rounded-xl bg-ember-500 px-4 py-2.5 text-left text-sm font-bold text-white transition hover:bg-ember-600"
          type="button"
          @click="logout"
        >
          Log Out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useTheme } from '@/composables/useTheme';

const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();

const mobileOpen = ref(false);
const { isDark, toggleTheme } = useTheme();

const cartCount = computed(() => cartStore.itemCount);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const firstName = computed(() => authStore.user?.firstName ?? 'Member');

function logout(): void {
  authStore.logout();
  mobileOpen.value = false;
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  }
);
</script>
