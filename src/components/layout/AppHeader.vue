<template>
  <header class="sticky top-0 z-40 w-full">
    <!-- Clean Minimalist Announcement Bar -->
    <div class="bg-neutral-950 px-4 py-2 text-center text-[11px] font-medium tracking-widest text-neutral-300">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <span class="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400">EST. 2026 • GENÈVE • PARIS • NEW YORK</span>
        <div class="flex-1 text-center">
          <span class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span>COMPLIMENTARY CONCIERGE COURIER OVER $150 • CODE: <strong class="text-white">VIP15</strong> FOR 15% OFF</span>
          </span>
        </div>
        <span class="hidden sm:inline-block text-[10px] tracking-widest text-neutral-400">WHITE-GLOVE ATELIER</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/90">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <!-- Brand Crest & Logo -->
        <RouterLink to="/" class="group flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 transition group-hover:scale-105">
            <span class="font-brand text-sm font-bold tracking-tighter">LM</span>
          </div>
          <div class="flex flex-col">
            <span class="font-brand text-lg font-bold tracking-[0.2em] text-neutral-900 transition-colors group-hover:text-gold-600 dark:text-white dark:group-hover:text-gold-400">
              LUMEN
            </span>
            <span class="font-sans text-[9px] font-semibold tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-500">
              Haute Maison
            </span>
          </div>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-2 md:flex">
          <RouterLink
            to="/"
            class="rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            The Atelier
          </RouterLink>

          <RouterLink
            to="/catalog"
            class="rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            Catalog
          </RouterLink>

          <RouterLink
            to="/#categories"
            class="rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            Departments
          </RouterLink>

          <!-- Wishlist trigger -->
          <RouterLink
            to="/wishlist"
            class="flex items-center gap-1.5 rounded-full px-3.5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            :class="{ '!bg-neutral-100 dark:!bg-neutral-800 text-neutral-950 dark:text-white font-bold': $route.path === '/wishlist' }"
          >
            <svg
              :class="['h-3.5 w-3.5 transition-colors', wishlistCount > 0 ? 'text-rose-500 fill-current' : 'text-neutral-400 group-hover:text-rose-500']"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Wishlist</span>
            <span
              v-if="wishlistCount > 0"
              class="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm"
            >
              {{ wishlistCount }}
            </span>
          </RouterLink>

          <!-- Shopping Bag -->
          <RouterLink
            to="/cart"
            class="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 transition hover:bg-neutral-900 hover:text-white hover:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-white dark:hover:text-neutral-950"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Bag</span>
            <span
              v-if="cartCount > 0"
              class="flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-neutral-950"
            >
              {{ cartCount }}
            </span>
          </RouterLink>
        </nav>

        <!-- Right Controls -->
        <div class="flex items-center gap-2.5">
          <!-- Ambient Day / Night Switcher -->
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            type="button"
            :title="isDark ? 'Switch to Daylight' : 'Switch to Midnight'"
            @click="toggleTheme"
          >
            <!-- Sun -->
            <svg v-if="isDark" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon -->
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Client Portal -->
          <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            class="hidden rounded-full bg-neutral-900 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:inline-flex"
          >
            Client Login
          </RouterLink>

          <div
            v-else
            class="hidden items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 sm:flex"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span class="font-semibold">{{ firstName }}</span>
            <span class="text-neutral-400">|</span>
            <button
              class="font-semibold text-neutral-500 hover:text-rose-600 dark:text-neutral-400"
              type="button"
              @click="logout"
            >
              Sign Out
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700 md:hidden dark:border-neutral-800 dark:text-neutral-200"
            type="button"
            @click="mobileOpen = !mobileOpen"
          >
            <svg v-if="!mobileOpen" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div
        v-if="mobileOpen"
        class="border-t border-neutral-200 bg-white px-4 py-4 md:hidden dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div class="flex flex-col gap-2">
          <RouterLink
            to="/"
            class="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            @click="mobileOpen = false"
          >
            The Atelier
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            @click="mobileOpen = false"
          >
            Catalog
          </RouterLink>
          <RouterLink
            to="/#categories"
            class="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            @click="mobileOpen = false"
          >
            Departments
          </RouterLink>
          <RouterLink
            to="/wishlist"
            class="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            @click="mobileOpen = false"
          >
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 text-rose-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Saved Wishlist</span>
            </div>
            <span
              v-if="wishlistCount > 0"
              class="rounded-full bg-rose-600 px-2 py-0.5 text-xs font-bold text-white"
            >
              {{ wishlistCount }} items
            </span>
          </RouterLink>
          <RouterLink
            to="/cart"
            class="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            @click="mobileOpen = false"
          >
            <span>Shopping Bag</span>
            <span class="rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-bold text-white dark:bg-white dark:text-neutral-950">
              {{ cartCount }} items
            </span>
          </RouterLink>

          <div class="my-2 border-t border-neutral-200 dark:border-neutral-800" />

          <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            class="rounded-full bg-neutral-900 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white dark:bg-white dark:text-neutral-950"
            @click="mobileOpen = false"
          >
            Client Login
          </RouterLink>
          <button
            v-else
            class="rounded-full border border-neutral-200 px-4 py-2 text-center text-xs font-bold text-neutral-700 dark:border-neutral-800 dark:text-neutral-200"
            type="button"
            @click="logout"
          >
            Sign Out ({{ firstName }})
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useTheme } from '@/composables/useTheme';

const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const route = useRoute();

const mobileOpen = ref(false);
const { isDark, toggleTheme } = useTheme();

const cartCount = computed(() => cartStore.itemCount);
const wishlistCount = computed(() => wishlistStore.itemCount);
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
