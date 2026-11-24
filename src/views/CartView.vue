<template>
  <section class="wrap page">
    <div v-if="receiptModalOpen && confirmedOrder" class="receipt panel">
      <p class="eyebrow">Order confirmation</p>
      <h1>Thank you, {{ confirmedOrder.recipient }}.</h1>
      <p>Your perfumes are reserved. Payment is due on delivery.</p>
      <dl class="spec-list">
        <div>
          <dt>Order reference</dt>
          <dd>{{ orderReference }}</dd>
        </div>
        <div>
          <dt>Delivery address</dt>
          <dd>{{ confirmedOrder.address }}</dd>
        </div>
        <div>
          <dt>Amount due</dt>
          <dd>{{ formatCurrency(confirmedTotal) }}</dd>
        </div>
      </dl>
      <RouterLink to="/orders" class="btn primary">View order history <ArrowRight /></RouterLink
      ><button class="text-link" @click="closeReceipt">Continue shopping</button>
    </div>
    <template v-else
      ><div class="page-heading">
        <p class="eyebrow">Your selection</p>
        <h1>Shopping bag</h1>
      </div>
      <p v-if="checkoutError" role="alert" class="inline-status">{{ checkoutError }}</p>
      <div v-if="!cartStore.items.length" class="empty">
        <ShoppingBag />
        <h2>Your bag is empty</h2>
        <p>Explore the collection to find your next perfume.</p>
        <RouterLink class="btn primary" to="/catalog">Explore perfumes <ArrowRight /></RouterLink>
      </div>
      <fieldset v-else class="bag-layout" :disabled="placing">
        <div>
          <article v-for="line in cartStore.items" :key="line.productId" class="bag-line">
            <RouterLink
              :to="'/product/' + line.productId"
              class="bag-image"
              :class="'tone-' + line.productId"
              ><img :src="line.thumbnail" :alt="line.title"
            /></RouterLink>
            <div>
              <p class="eyebrow">Perfume</p>
              <RouterLink :to="'/product/' + line.productId" class="card-name">{{
                line.title
              }}</RouterLink>
              <p>{{ formatCurrency(line.price) }} each</p>
              <div class="line-actions">
                <div class="stepper">
                  <button
                    :aria-label="'Decrease ' + line.title"
                    @click="cartStore.decrease(line.productId)"
                  >
                    −</button
                  ><span>{{ line.quantity }}</span
                  ><button
                    :aria-label="'Increase ' + line.title"
                    :disabled="line.quantity >= line.maxStock"
                    @click="cartStore.increase(line.productId)"
                  >
                    +
                  </button>
                </div>
                <button class="text-link" @click="cartStore.removeItem(line.productId)">
                  Remove
                </button>
              </div>
            </div>
            <strong>{{ formatCurrency(line.price * line.quantity) }}</strong>
          </article>
          <div class="packing">
            <label
              ><input type="checkbox" v-model="includeGiftPackaging" /> Include complimentary gift
              packaging</label
            ><button class="text-link" @click="cartStore.clear()">Clear bag</button>
          </div>
        </div>
        <aside class="panel summary">
          <h2>Order summary</h2>
          <dl class="spec-list">
            <div>
              <dt>Subtotal</dt>
              <dd>{{ formatCurrency(cartStore.subtotal) }}</dd>
            </div>
            <div v-if="discountAmount">
              <dt>Voucher discount</dt>
              <dd>−{{ formatCurrency(discountAmount) }}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{{ shippingFee ? formatCurrency(shippingFee) : 'Complimentary' }}</dd>
            </div>
            <div>
              <dt>Tax (8%)</dt>
              <dd>{{ formatCurrency(taxAmount) }}</dd>
            </div>
          </dl>
          <label for="voucher">Voucher code</label>
          <div class="input-action">
            <input
              id="voucher"
              v-model="voucherCode"
              placeholder="VIP15 or CONCIERGE"
              @keydown.enter.prevent="applyVoucher"
            /><button class="text-link" @click="applyVoucher">Apply</button>
          </div>
          <p v-if="voucherFeedback" role="status" :class="voucherValid ? 'muted' : 'inline-status'">
            {{ voucherFeedback }}
          </p>
          <div class="total">
            <span>Total</span><strong>{{ formatCurrency(grandTotal) }}</strong>
          </div>
          <p class="muted">
            {{ formatCurrencyLKR(grandTotal) }} estimated · Pay on delivery in USD
          </p>
          <label v-if="authStore.isAuthenticated"
            >Delivery address<textarea
              v-model.trim="address"
              rows="3"
              maxlength="500"
              autocomplete="street-address"
              placeholder="Street, city, postal code and country"
            ></textarea>
          </label>
          <button class="btn primary" @click="initiateCheckout">
            {{
              placing
                ? 'Placing order…'
                : authStore.isAuthenticated
                  ? 'Place order'
                  : 'Sign in to checkout'
            }}
            <ArrowRight />
          </button>
        </aside></fieldset
    ></template>
  </section>
</template>

<script setup lang="ts">
import { orderTotals } from '../../shared/pricing';
import { request, ApiError } from '@/lib/api';
import { inOrder, newRequestKey, session, refreshSession, type ShoppingState } from '@/lib/session';
import type { Order } from '@/types/order';
import { useProducts } from '@/composables/useProducts';
import { computed, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { ArrowRight, ShoppingBag } from '@lucide/vue';
import { formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const includeGiftPackaging = ref(true);
const voucherCode = ref('');
const appliedVoucher = ref('');
const voucherFeedback = ref('');
const voucherValid = ref(false);

const receiptModalOpen = ref(false);
const confirmedOrder = ref<Order | null>(null);
const orderReference = computed(() => confirmedOrder.value?.reference);
const confirmedTotal = computed(() => (confirmedOrder.value?.totals.total ?? 0) / 100);
const address = ref('');
const placing = ref(false);
const checkoutError = ref('');
const { loadProducts } = useProducts();
watch(voucherCode, () => {
  appliedVoucher.value = '';
  voucherFeedback.value = '';
});

function applyVoucher(): void {
  const code = voucherCode.value.trim().toUpperCase();
  if (code === 'VIP15') {
    appliedVoucher.value = code;
    voucherFeedback.value = '✓ 15% VIP Discount Applied!';
    voucherValid.value = true;
  } else if (code === 'CONCIERGE') {
    appliedVoucher.value = code;
    voucherFeedback.value = '✓ Complimentary Express Courier Applied!';
    voucherValid.value = true;
  } else {
    voucherFeedback.value = 'Voucher code unrecognized. Try "VIP15" or "CONCIERGE".';
    voucherValid.value = false;
  }
}

const totals = computed(() =>
  orderTotals(Math.round(cartStore.subtotal * 100), appliedVoucher.value)
);
const shippingFee = computed(() => totals.value.shipping / 100);
const discountAmount = computed(() => totals.value.discount / 100);
const taxAmount = computed(() => totals.value.tax / 100);
const grandTotal = computed(() => totals.value.total / 100);

async function initiateCheckout() {
  if (!authStore.isAuthenticated) {
    await router.push({ name: 'login', query: { redirect: '/cart' } });
    return;
  }
  if (placing.value) return;
  if (address.value.length < 10) {
    checkoutError.value = 'Enter a complete delivery address.';
    return;
  }
  placing.value = true;
  checkoutError.value = '';
  const expected = cartStore.items.map((line) => ({
    productId: line.productId,
    quantity: line.quantity,
    unitCents: Math.round(line.price * 100)
  }));
  const shopper = session.value.shopper;
  const body = {
    expected,
    address: address.value,
    voucher: appliedVoucher.value,
    gift: includeGiftPackaging.value
  };
  const storageKey = 'lumen-checkout-' + shopper;
  try {
    const signature = JSON.stringify(body);
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    const requestKey = saved?.signature === signature ? saved.key : newRequestKey();
    sessionStorage.setItem(storageKey, JSON.stringify({ signature, key: requestKey }));
    await inOrder(async () => {
      const result = await request<{ order: Order; state: ShoppingState }>(
        '/orders',
        { ...body, requestKey },
        shopper
      );
      session.value = result.state;
      confirmedOrder.value = result.order;
    });
    sessionStorage.removeItem(storageKey);
    receiptModalOpen.value = true;
    void loadProducts(true);
  } catch (error) {
    checkoutError.value = error instanceof Error ? error.message : 'Could not place your order.';
    if (error instanceof ApiError && [401, 409].includes(error.status)) await refreshSession();
  } finally {
    placing.value = false;
  }
}

function closeReceipt(): void {
  receiptModalOpen.value = false;
  void router.push('/catalog');
}
</script>
