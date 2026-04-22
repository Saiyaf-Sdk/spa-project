<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-950/70"
  >
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <RouterLink
        class="flex items-center gap-2 font-display text-xl font-bold text-slate-800 dark:text-slate-100"
        to="/"
      >
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          LC
        </span>
        <span>Lumen Cart</span>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
          to="/"
        >
          Shop
        </RouterLink>
        <RouterLink
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
          to="/cart"
        >
          Cart ({{ cartCount }})
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-200"
          type="button"
          @click="toggleTheme"
        >
          {{ isDark ? 'Light' : 'Dark' }}
        </button>

        <RouterLink
          v-if="!isAuthenticated"
          class="hidden rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 sm:inline-flex"
          to="/login"
        >
          Log In
        </RouterLink>

        <div
          v-else
          class="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex"
        >
          <span class="font-semibold">{{ firstName }}</span>
          <button
            class="rounded-md bg-ember-500 px-2 py-1 font-semibold text-white transition hover:bg-ember-600"
            type="button"
            @click="logout"
          >
            Log Out
          </button>
        </div>

        <button
          class="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 md:hidden dark:border-slate-600 dark:text-slate-200"
          type="button"
          @click="mobileOpen = !mobileOpen"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="border-t border-slate-200/80 px-4 py-3 md:hidden dark:border-slate-700/70"
    >
      <div class="flex flex-col gap-2">
        <RouterLink
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/"
        >
          Shop
        </RouterLink>
        <RouterLink
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/cart"
        >
          Cart ({{ cartCount }})
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-brand-900/30"
          to="/login"
        >
          Log In
        </RouterLink>
        <button
          v-else
          class="rounded-lg bg-ember-500 px-3 py-2 text-sm font-semibold text-white"
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

