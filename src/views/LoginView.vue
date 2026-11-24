<template>
  <section class="wrap page account-page">
    <div class="account-image">
      <img src="/editorial/hero.jpg" alt="Amber glass and silk in the Nebo perfume studio" />
    </div>
    <div class="account-copy">
      <p class="eyebrow">Nebo account</p>
      <template v-if="authStore.isAuthenticated"
        ><h1>Welcome back.</h1>
        <p>You’re signed in as {{ authStore.user?.username }}.</p>
        <RouterLink class="btn primary" to="/orders">My orders <ArrowRight /></RouterLink
        ><button class="text-link" @click="authStore.logout()">Sign out</button></template
      >
      <template v-else
        ><h1>{{ registering ? 'Create an account' : 'Welcome back.' }}</h1>
        <p class="muted">Save perfumes you love and revisit your orders.</p>
        <form class="account-form" @submit.prevent="submitLogin">
          <label v-if="registering"
            >Full name<input
              v-model.trim="form.firstName"
              required
              maxlength="80"
              autocomplete="name"
          /></label>
          <label
            >Username<input
              v-model.trim="form.username"
              required
              minlength="3"
              maxlength="40"
              autocomplete="username"
          /></label>
          <label
            >Password<input
              type="password"
              v-model="form.password"
              required
              :minlength="registering ? 8 : 1"
              maxlength="128"
              :autocomplete="registering ? 'new-password' : 'current-password'"
          /></label>
          <p v-if="errorMessage" class="inline-status" role="alert">{{ errorMessage }}</p>
          <button class="btn primary" :disabled="loading">
            {{ loading ? 'Please wait…' : registering ? 'Create account' : 'Sign in' }}
            <ArrowRight />
          </button>
        </form>
        <button
          class="text-link"
          @click="
            registering = !registering;
            errorMessage = null;
          "
        >
          {{ registering ? 'Already a member? Sign in' : 'New to Nebo? Create an account' }}
        </button></template
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const registering = ref(false);
const form = reactive({ firstName: '', username: '', password: '' });

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const redirectPath = computed(() => {
  const target = route.query.redirect;
  return typeof target === 'string' &&
    ['/cart', '/orders', '/wishlist', '/catalog'].includes(target)
    ? target
    : '/';
});

async function submitLogin(): Promise<void> {
  loading.value = true;
  errorMessage.value = null;

  try {
    if (registering.value) await authStore.register(form);
    else await authStore.login(form);
    await router.push(redirectPath.value);
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Login failed. Please verify credentials.';
  } finally {
    loading.value = false;
  }
}
</script>
