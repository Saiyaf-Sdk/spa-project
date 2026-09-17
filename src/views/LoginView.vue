<template>
  <section class="mx-auto max-w-md pb-16 pt-8">
    <article class="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-10">
      <!-- Brand Header -->
      <div class="text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
          <span class="font-brand text-base font-bold">LM</span>
        </div>
        <span class="mt-4 inline-block font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
          Member Access
        </span>
        <h1 class="mt-1 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
          Client Sign In
        </h1>
        <p class="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          Log in to access your saved wishlist and checkout simulation.
        </p>
      </div>

      <!-- Login Form -->
      <form class="mt-8 space-y-4" @submit.prevent="submitLogin">
        <label class="flex flex-col gap-1.5 text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Username</span>
          <input
            v-model="form.username"
            class="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            required
            type="text"
          />
        </label>

        <label class="flex flex-col gap-1.5 text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Password</span>
          <input
            v-model="form.password"
            class="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            required
            type="password"
          />
        </label>

        <!-- One-Click Demo Autofill Box -->
        <div class="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/60">
          <div class="text-[11px] text-neutral-600 dark:text-neutral-400">
            Demo: <span class="font-mono font-bold text-neutral-900 dark:text-neutral-200">{{ demoUser.username }}</span>
          </div>
          <button
            class="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
            type="button"
            @click="autofillDemo"
          >
            Autofill
          </button>
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
        >
          {{ errorMessage }}
        </p>

        <button
          :disabled="loading"
          class="w-full rounded-full bg-neutral-900 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DEMO_USER } from '@/lib/constants';
import { useAuthStore } from '@/stores/auth';
import type { LoginRequest } from '@/types/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive<LoginRequest>({
  username: DEMO_USER.username,
  password: DEMO_USER.password,
  expiresInMins: 60
});

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const redirectPath = computed(() => {
  const target = route.query.redirect;
  return typeof target === 'string' && target.startsWith('/') ? target : '/';
});

const demoUser = DEMO_USER;

function autofillDemo(): void {
  form.username = DEMO_USER.username;
  form.password = DEMO_USER.password;
}

async function submitLogin(): Promise<void> {
  loading.value = true;
  errorMessage.value = null;

  try {
    await authStore.login(form);
    await router.push(redirectPath.value);
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed. Please verify credentials.';
  } finally {
    loading.value = false;
  }
}
</script>
