<template>
  <section class="relative mb-10 overflow-hidden rounded-3xl glass-card shadow-float">
    <!-- Decorative floating orbs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        class="float-slow absolute -left-16 -top-16 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-400/10"
      />
      <div
        class="float-medium absolute -right-20 top-8 h-56 w-56 rounded-full bg-ember-500/15 blur-3xl dark:bg-ember-500/10"
      />
      <div
        class="float-slow absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-brand-300/10 blur-2xl"
        style="animation-delay: -2s"
      />
    </div>

    <div class="relative grid gap-8 p-7 md:grid-cols-[1.5fr_1fr] md:items-center md:p-10 lg:p-12">
      <!-- Left: Copy -->
      <div>
        <p
          class="shimmer-badge mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-brand-500/15 dark:text-brand-200"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-brand-500 pulse-glow" />
          Data-Driven Store
        </p>

        <h1
          class="animate-fade-up font-display text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-[3.4rem]"
        >
          <span class="text-slate-900 dark:text-slate-100">Discover </span>
          <span class="gradient-text">curated products</span>
          <span class="text-slate-900 dark:text-slate-100"> with a modern shopping experience.</span>
        </h1>

        <p
          class="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
          style="animation-delay: 0.12s"
        >
          Browse hundreds of products, filter by category, inspect detailed specs,
          manage your cart, and experience a polished responsive interface — all
          powered by Vue 3 &amp; TypeScript.
        </p>

        <div
          class="animate-fade-up mt-6 flex flex-wrap items-center gap-3"
          style="animation-delay: 0.24s"
        >
          <a
            class="group inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
            href="#catalog"
          >
            Browse Catalog
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            class="inline-flex items-center gap-1 rounded-2xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-200"
            href="#catalog"
          >
            View All Categories
          </a>
        </div>
      </div>

      <!-- Right: Stats + Highlights -->
      <div
        class="animate-fade-up grid grid-cols-2 gap-3"
        style="animation-delay: 0.3s"
      >
        <!-- Products Stat -->
        <article
          class="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
        >
          <div class="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-brand-500/10 blur-xl transition group-hover:bg-brand-500/20" />
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Products
          </p>
          <p
            class="animate-count-pop mt-2 font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100"
            style="animation-delay: 0.4s"
          >
            {{ totalProducts }}
          </p>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Ready to explore</p>
        </article>

        <!-- Categories Stat -->
        <article
          class="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
        >
          <div class="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-ember-500/10 blur-xl transition group-hover:bg-ember-500/20" />
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Categories
          </p>
          <p
            class="animate-count-pop mt-2 font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100"
            style="animation-delay: 0.5s"
          >
            {{ categoryCount }}
          </p>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Diverse range</p>
        </article>

        <!-- Free Shipping Feature -->
        <article
          class="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
        >
          <div class="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-brand-400/10 blur-xl transition group-hover:bg-brand-400/20" />
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
          </div>
          <p class="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">Free Shipping</p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">Orders $120+</p>
        </article>

        <!-- Dual Currency Feature -->
        <article
          class="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
        >
          <div class="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-ember-500/10 blur-xl transition group-hover:bg-ember-500/20" />
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-ember-500/10 text-ember-600 dark:bg-ember-500/20 dark:text-ember-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">USD &amp; LKR</p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">Dual currency</p>
        </article>
      </div>
    </div>

    <!-- Bottom decorative gradient bar -->
    <div
      class="h-1 w-full bg-gradient-to-r from-brand-500 via-brand-400 to-ember-500"
      aria-hidden="true"
    />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  totalProducts: number;
  categoryCount: number;
}>();
</script>
