<template>
  <section class="wrap page empty">
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p>Find your way back to the perfume collection.</p>
    <RouterLink to="/catalog" class="btn primary">Explore perfumes <ArrowRight /></RouterLink>
  </section>
</template>
<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';
</script>
