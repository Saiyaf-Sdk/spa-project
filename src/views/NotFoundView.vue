<template>
  <section class="mx-auto max-w-xl rounded-3xl glass-card p-8 text-center shadow-float">
    <p
      class="inline-flex rounded-full bg-ember-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ember-700 dark:text-amber-300"
    >
      404
    </p>
    <h1 class="mt-3 font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100">
      Page not found
    </h1>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
      The page you requested does not exist or may have moved.
    </p>
    <RouterLink
      class="mt-5 inline-flex rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
      to="/"
    >
      Return Home
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

