<template>
  <div class="relative flex min-h-screen flex-col overflow-x-hidden transition-colors">
    <!-- Ambient Gold Dust Atmosphere -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 opacity-30 dark:opacity-40"
      style="background-image: radial-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px); background-size: 32px 32px;"
      aria-hidden="true"
    />
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
</script>
