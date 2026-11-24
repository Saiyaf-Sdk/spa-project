<template>
  <footer class="footer">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <RouterLink class="wordmark" to="/"
            ><span>NEBO</span><small>PARFUMERIE</small></RouterLink
          >
          <p class="foot-intro">A considered edit of fine fragrance.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Explore</h2>
          <RouterLink to="/catalog">All perfumes</RouterLink
          ><RouterLink to="/scent-guide">Scent guide</RouterLink
          ><RouterLink to="/wishlist">Wishlist</RouterLink
          ><RouterLink to="/orders">My orders</RouterLink>
        </nav>
        <div>
          <h2>Letters from Nebo</h2>
          <p>Join the mailing list for perfume edits and scent notes.</p>
          <form class="newsletter" @submit.prevent="subscribe">
            <input
              aria-label="Newsletter email"
              autocomplete="email"
              type="email"
              maxlength="254"
              required
              v-model.trim="email"
              placeholder="Email address"
              @input="message = ''"
            /><button aria-label="Subscribe to newsletter" :disabled="busy"><ArrowRight /></button>
          </form>
          <p v-if="message" role="status">{{ message }}</p>
        </div>
      </div>
      <div class="foot-base">
        <span>© {{ new Date().getFullYear() }} Nebo Parfumerie</span
        ><button @click="toggleTheme">{{ isDark ? 'Light appearance' : 'Dark appearance' }}</button
        ><span>USD · LKR estimates at checkout</span>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight } from '@lucide/vue';
import { request } from '@/lib/api';
import { useTheme } from '@/composables/useTheme';
const { isDark, toggleTheme } = useTheme();
const email = ref(''),
  message = ref(''),
  busy = ref(false);
async function subscribe() {
  if (busy.value) return;
  busy.value = true;
  try {
    await request('/newsletter', { email: email.value });
    email.value = '';
    message.value = 'You’re on the list. Thank you for joining.';
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'Please try again.';
  } finally {
    busy.value = false;
  }
}
</script>
