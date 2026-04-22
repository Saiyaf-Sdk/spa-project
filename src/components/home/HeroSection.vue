<template>
  <section class="mb-8 overflow-hidden rounded-3xl glass-card shadow-float">
    <div class="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:items-end md:p-8">
      <div>
        <p
          class="mb-3 inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800 dark:bg-brand-900/40 dark:text-brand-100"
        >
          Data-Driven Store
        </p>
        <h1
          class="font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl dark:text-slate-100"
        >
          Shop curated products with a modern Vue SPA experience.
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Discover items, filter by categories, inspect detailed product data, manage your cart,
          and simulate authentication in one polished responsive interface.
        </p>
        <a
          class="mt-5 inline-flex rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          href="#catalog"
        >
          Browse Catalog
        </a>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <article class="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Products</p>
          <p class="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {{ totalProducts }}
          </p>
        </article>
        <article class="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Categories
          </p>
          <p class="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {{ categoryCount }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  totalProducts: number;
  categoryCount: number;
}>();
</script>

