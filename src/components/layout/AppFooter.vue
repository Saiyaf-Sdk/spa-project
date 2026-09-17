<template>
  <footer class="mt-12 border-t border-slate-200/60 dark:border-slate-700/50">
    <div
      class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div class="grid gap-8 md:grid-cols-3">
        <!-- Brand Column -->
        <div>
          <div class="flex items-center gap-2.5 font-display text-lg font-bold text-slate-800 dark:text-slate-100">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-extrabold text-white"
            >
              LC
            </span>
            <span>Lumen<span class="text-brand-600 dark:text-brand-400">Cart</span></span>
          </div>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            A modern e-commerce SPA experience built with Vue 3, TypeScript, and Tailwind CSS.
            Prices shown in both USD and LKR.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Links
          </h3>
          <ul class="mt-3 space-y-2">
            <li>
              <RouterLink
                class="text-sm text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                to="/"
              >
                Shop All Products
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="text-sm text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                to="/cart"
              >
                Shopping Cart
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="text-sm text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                to="/login"
              >
                Account Login
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Built With
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tech in techStack"
              :key="tech"
              class="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200/60 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-700/50 dark:text-slate-400"
      >
        <p>&copy; {{ year }} Lumen Cart. All rights reserved.</p>
        <p>Powered by DummyJSON API</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear();
const techStack = ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'Vue Router', 'DummyJSON'];
</script>
