<template>
  <section class="wrap page orders-page">
    <div class="section-head">
      <div>
        <p class="eyebrow">Your account</p>
        <h1>My orders</h1>
      </div>
      <button v-if="user" class="text-link" @click="auth.logout()">Sign out</button>
    </div>
    <div v-if="!user" class="empty">
      <h2>Sign in to view your orders</h2>
      <RouterLink class="btn primary" to="/login?redirect=/orders"
        >Sign in <ArrowRight
      /></RouterLink>
    </div>
    <p v-else-if="loading" role="status">Loading orders…</p>
    <p v-else-if="error" role="alert">
      {{ error }} <button class="text-link" @click="load">Retry</button>
    </p>
    <div v-else-if="!orders.length" class="empty">
      <h2>Your first order awaits</h2>
      <p>Your receipts and delivery details will appear here.</p>
      <RouterLink class="btn primary" to="/catalog">Explore perfumes <ArrowRight /></RouterLink>
    </div>
    <article v-for="order in orders" :key="order.reference" class="panel order">
      <p class="eyebrow">{{ order.status }} · {{ order.paymentMethod }}</p>
      <h2>{{ new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) }}</h2>
      <p class="muted">{{ order.reference }}</p>
      <ul class="spec-list">
        <li v-for="line in order.lines" :key="line.productId">
          <span
            ><RouterLink
              v-if="products.some((p) => p.id === line.productId)"
              :to="'/product/' + line.productId"
              >{{ line.quantity }} × {{ line.title }}</RouterLink
            ><template v-else>{{ line.quantity }} × {{ line.title }}</template></span
          ><span>{{ formatCurrency((line.quantity * line.unitCents) / 100) }}</span>
        </li>
      </ul>
      <p>{{ order.recipient }} · {{ order.address }}</p>
      <p v-if="order.gift">Gift packaging included</p>
      <p class="muted">
        Subtotal {{ formatCurrency(order.totals.subtotal / 100) }} · Delivery
        {{ formatCurrency(order.totals.shipping / 100) }} · Tax
        {{ formatCurrency(order.totals.tax / 100) }}
      </p>
      <p v-if="order.voucher">
        Voucher {{ order.voucher }} · Discount {{ formatCurrency(order.totals.discount / 100) }}
      </p>
      <p class="total">
        Amount due <strong>{{ formatCurrency(order.totals.total / 100) }}</strong>
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';
import { useAuthStore } from '@/stores/auth';
import { useProducts } from '@/composables/useProducts';
import { computed, onMounted, ref, watch } from 'vue';
import { request } from '@/lib/api';
import { session } from '@/lib/session';
import { formatCurrency } from '@/lib/format';
import type { Order } from '@/types/order';

const auth = useAuthStore();
const { products, loadProducts } = useProducts();
onMounted(() => loadProducts());
const user = computed(() => session.value.user?.id);
const orders = ref<Order[]>([]);
const loading = ref(false);
const error = ref('');
async function load() {
  const id = user.value;
  orders.value = [];
  error.value = '';
  if (!id) return;
  loading.value = true;
  try {
    const data = await request<Order[]>('/orders', undefined, id);
    if (user.value === id) orders.value = data;
  } catch (err) {
    if (user.value === id)
      error.value = err instanceof Error ? err.message : 'Could not load your orders.';
  } finally {
    loading.value = false;
  }
}
watch(user, load, { immediate: true });
</script>
