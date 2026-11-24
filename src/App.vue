<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">Skip to content</a>
    <p v-if="storeError" role="alert" class="error-banner">
      {{ storeError }} <button type="button" @click="storeError = ''">Dismiss</button>
    </p>
    <AppHeader />
    <main id="main" tabindex="-1">
      <RouterView v-if="ready" :key="session.shopper" />
      <p v-else-if="loadError" role="alert">
        {{ loadError }} <button class="underline" @click="start">Retry</button>
      </p>
      <p v-else role="status">Opening the boutique…</p>
    </main>
    <AppFooter />
    <Transition name="notice"
      ><div v-if="notice" class="notice" role="status">
        {{ notice }} <button aria-label="Dismiss notification" @click="notice = ''">×</button>
      </div></Transition
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { notice } from '@/lib/notice';
import { initialize, inOrder, refreshSession, session, storeError } from '@/lib/session';
import { RouterView } from 'vue-router';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
const ready = ref(false);
const loadError = ref('');
async function start() {
  loadError.value = '';
  try {
    await initialize();
    ready.value = true;
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Cannot open the store.';
  }
}
function syncWhenVisible() {
  if (ready.value && document.visibilityState === 'visible') {
    void inOrder(refreshSession).catch((error) => {
      storeError.value = error.message;
    });
  }
}
onMounted(() => {
  void start();
  document.addEventListener('visibilitychange', syncWhenVisible);
});
onUnmounted(() => document.removeEventListener('visibilitychange', syncWhenVisible));
</script>
