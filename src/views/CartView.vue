<template>
  <section class="max-w-7xl mx-auto pb-16 pt-2">
    <!-- Header -->
    <div class="mb-8 border-b border-neutral-200/60 pb-5 dark:border-neutral-800">
      <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
        Review &amp; Checkout
      </span>
      <h1 class="mt-1 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        Your Shopping Bag
      </h1>
      <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Manage items, configure bespoke gift options, and complete your order.
      </p>
    </div>

    <!-- Empty Bag State -->
    <div
      v-if="cartStore.items.length === 0"
      class="rounded-3xl border border-neutral-200/80 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
        <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 class="mt-5 font-serif text-2xl font-normal text-neutral-900 dark:text-white">
        Your Bag is Empty
      </h2>
      <p class="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        Explore our curated collection of timepieces, parfums, and luxury goods to add items to your bag.
      </p>
      <RouterLink
        to="/"
        class="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400"
      >
        Explore Collection
      </RouterLink>
    </div>

    <!-- Cart Layout with Items & Summary -->
    <div v-else class="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <!-- Left Column: Bag Items & Options -->
      <div class="space-y-4">
        <article
          v-for="line in cartStore.items"
          :key="line.productId"
          class="grid gap-4 rounded-2xl border border-neutral-200/70 bg-white p-5 transition-all hover:border-neutral-300 md:grid-cols-[90px_1fr_auto] md:items-center dark:border-neutral-800 dark:bg-neutral-900"
        >
          <!-- Thumbnail -->
          <div class="h-22 w-22 overflow-hidden rounded-xl bg-neutral-50 p-1 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
            <img :alt="line.title" :src="line.thumbnail" class="h-full w-full object-contain" />
          </div>

          <!-- Description -->
          <div class="space-y-1">
            <span class="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
              {{ formatCategoryLabel(line.category) }}
            </span>
            <RouterLink
              :to="`/product/${line.productId}`"
              class="block font-serif text-base font-normal text-neutral-900 transition hover:text-gold-600 dark:text-white dark:hover:text-gold-400 line-clamp-1"
            >
              {{ line.title }}
            </RouterLink>
            <div class="flex items-baseline gap-2 pt-0.5">
              <span class="font-serif text-sm font-bold text-neutral-900 dark:text-white">
                {{ formatCurrency(line.price) }}
              </span>
              <span class="text-[11px] font-semibold text-gold-600 dark:text-gold-400">
                {{ formatCurrencyLKR(line.price) }} each
              </span>
            </div>
          </div>

          <!-- Quantity Controls & Remove -->
          <div class="flex items-center gap-3">
            <div class="flex items-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
              <button
                class="px-2.5 py-1 text-xs font-bold hover:text-neutral-900 dark:hover:text-white"
                type="button"
                @click="cartStore.decrease(line.productId)"
              >
                -
              </button>
              <span class="w-6 text-center font-sans text-xs font-bold">{{ line.quantity }}</span>
              <button
                class="px-2.5 py-1 text-xs font-bold hover:text-neutral-900 dark:hover:text-white"
                type="button"
                @click="cartStore.increase(line.productId)"
              >
                +
              </button>
            </div>

            <!-- Remove Button -->
            <button
              class="rounded-full p-2 text-neutral-400 transition hover:text-rose-600"
              type="button"
              title="Remove Item"
              @click="cartStore.removeItem(line.productId)"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </article>

        <!-- Bespoke Packaging Option -->
        <div class="rounded-2xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="includeGiftPackaging"
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <div>
              <p class="font-serif text-sm font-semibold text-neutral-900 dark:text-white">
                Complimentary Signature Gift Box &amp; Ribbon
              </p>
              <p class="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                Items carefully placed in bespoke presentation boxes with custom handwritten gift cards.
              </p>
            </div>
          </label>
        </div>

        <!-- Privilege Code Input -->
        <div class="rounded-2xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <p class="font-serif text-sm font-semibold text-neutral-900 dark:text-white">
            Promotional Voucher Code
          </p>
          <div class="mt-2 flex gap-2">
            <input
              v-model="voucherCode"
              type="text"
              placeholder="Enter VIP15 or CONCIERGE"
              class="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
            <button
              class="rounded-full bg-neutral-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
              type="button"
              @click="applyVoucher"
            >
              Apply
            </button>
          </div>
          <p v-if="voucherFeedback" :class="['mt-2 text-xs font-medium', voucherValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400']">
            {{ voucherFeedback }}
          </p>
          <p class="mt-1.5 text-[11px] text-neutral-400">
            Available demo codes: <strong class="text-neutral-700 dark:text-neutral-300">VIP15</strong> (15% discount) or <strong class="text-neutral-700 dark:text-neutral-300">CONCIERGE</strong> (free courier).
          </p>
        </div>
      </div>

      <!-- Right Column: Order Summary -->
      <aside class="h-fit rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
        <h2 class="font-serif text-xl font-normal text-neutral-900 dark:text-white">
          Summary
        </h2>
        <div class="mt-1 h-0.5 w-10 bg-neutral-900 dark:bg-white" />

        <dl class="mt-5 space-y-3 text-xs font-medium">
          <!-- Items Subtotal -->
          <div class="flex items-center justify-between">
            <dt class="text-neutral-500 dark:text-neutral-400">Subtotal ({{ cartStore.itemCount }} items)</dt>
            <dd class="text-right font-semibold text-neutral-900 dark:text-white">
              {{ formatCurrency(cartStore.subtotal) }}
              <span class="block text-[10px] text-gold-600 dark:text-gold-400">{{ formatCurrencyLKR(cartStore.subtotal) }}</span>
            </dd>
          </div>

          <!-- Shipping -->
          <div class="flex items-center justify-between">
            <dt class="text-neutral-500 dark:text-neutral-400">White-Glove Courier</dt>
            <dd class="text-right font-semibold text-neutral-900 dark:text-white">
              <span v-if="shippingFee === 0" class="text-emerald-600 font-bold uppercase tracking-wider">
                Complimentary
              </span>
              <span v-else>
                {{ formatCurrency(shippingFee) }}
                <span class="block text-[10px] text-gold-600 dark:text-gold-400">{{ formatCurrencyLKR(shippingFee) }}</span>
              </span>
            </dd>
          </div>

          <!-- Tax -->
          <div class="flex items-center justify-between">
            <dt class="text-neutral-500 dark:text-neutral-400">Estimated Duty &amp; Tax (8%)</dt>
            <dd class="text-right font-semibold text-neutral-900 dark:text-white">
              {{ formatCurrency(taxAmount) }}
              <span class="block text-[10px] text-gold-600 dark:text-gold-400">{{ formatCurrencyLKR(taxAmount) }}</span>
            </dd>
          </div>

          <!-- Discount -->
          <div v-if="discountAmount > 0" class="flex items-center justify-between text-emerald-600">
            <dt class="font-bold">Privilege Discount (15%)</dt>
            <dd class="text-right font-bold">
              -{{ formatCurrency(discountAmount) }}
              <span class="block text-[10px]">{{ formatCurrencyLKR(discountAmount) }}</span>
            </dd>
          </div>

          <!-- Divider -->
          <div class="my-3 border-t border-neutral-100 dark:border-neutral-800" />

          <!-- Grand Total -->
          <div class="flex items-baseline justify-between pt-1">
            <dt class="font-serif text-base font-bold text-neutral-900 dark:text-white">
              Total
            </dt>
            <dd class="text-right">
              <span class="font-serif text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {{ formatCurrency(grandTotal) }}
              </span>
              <p class="text-xs font-semibold text-gold-600 dark:text-gold-400">
                {{ formatCurrencyLKR(grandTotal) }}
              </p>
            </dd>
          </div>
        </dl>

        <!-- Checkout Action Button -->
        <button
          class="mt-6 w-full rounded-full bg-neutral-900 py-3.5 text-xs font-bold tracking-wider uppercase text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 active:scale-95"
          type="button"
          @click="initiateCheckout"
        >
          {{ authStore.isAuthenticated ? 'Simulate Checkout' : 'Login to Complete Order' }}
        </button>

        <button
          class="mt-2.5 w-full rounded-full border border-neutral-200 py-2.5 text-xs font-semibold text-neutral-500 transition hover:text-rose-600 dark:border-neutral-800 dark:text-neutral-400"
          type="button"
          @click="cartStore.clear"
        >
          Clear Bag
        </button>

        <!-- Trust Badges -->
        <div class="mt-6 space-y-1.5 border-t border-neutral-100 pt-4 text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div class="flex items-center gap-2">
            <span>🔒</span>
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🛡️</span>
            <span>100% Guaranteed Authenticity</span>
          </div>
          <div class="flex items-center gap-2">
            <span>📦</span>
            <span>Tracked Courier Delivery</span>
          </div>
        </div>
      </aside>
    </div>

    <!-- Simulated Receipt Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="receiptModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/75 backdrop-blur-sm" @click="receiptModalOpen = false" />

          <!-- Modal Body -->
          <div class="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
            <div class="text-center">
              <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span class="mt-3 inline-block font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Maison Lumen Order Confirmation
              </span>
              <h3 class="mt-1 font-serif text-2xl font-normal text-neutral-900 dark:text-white">
                Thank You For Your Order
              </h3>
              <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Reference: <strong class="font-mono text-neutral-800 dark:text-neutral-200">{{ orderReference }}</strong>
              </p>
            </div>

            <div class="mt-6 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-xs space-y-2 dark:border-neutral-800 dark:bg-neutral-950">
              <div class="flex justify-between">
                <span class="text-neutral-500">Client:</span>
                <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Estimated Courier Transit:</span>
                <span class="font-semibold text-neutral-800 dark:text-neutral-200">2 - 4 Business Days</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Total Settled:</span>
                <span class="font-serif text-sm font-bold text-neutral-900 dark:text-white">{{ formatCurrency(confirmedTotal) }} ({{ formatCurrencyLKR(confirmedTotal) }})</span>
              </div>
              <div v-if="includeGiftPackaging" class="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>Gift Packaging:</span>
                <span class="font-semibold">Signature Gift Box &amp; Ribbon Included</span>
              </div>
            </div>

            <p class="mt-4 text-center text-[11px] leading-relaxed text-neutral-400">
              * This is a simulated e-commerce transaction. No real payment was processed.
            </p>

            <button
              class="mt-6 w-full rounded-full bg-neutral-900 py-3 text-xs font-bold tracking-wider uppercase text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
              type="button"
              @click="closeReceipt"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const includeGiftPackaging = ref(true);
const voucherCode = ref('');
const appliedDiscountPercent = ref(0);
const voucherFeedback = ref('');
const voucherValid = ref(false);

const receiptModalOpen = ref(false);
const orderReference = ref('');
const confirmedTotal = ref(0);

function applyVoucher(): void {
  const code = voucherCode.value.trim().toUpperCase();
  if (code === 'VIP15') {
    appliedDiscountPercent.value = 0.15;
    voucherFeedback.value = '✓ 15% VIP Discount Applied!';
    voucherValid.value = true;
  } else if (code === 'CONCIERGE') {
    appliedDiscountPercent.value = 0;
    voucherFeedback.value = '✓ Complimentary Express Courier Applied!';
    voucherValid.value = true;
  } else {
    voucherFeedback.value = 'Voucher code unrecognized. Try "VIP15" or "CONCIERGE".';
    voucherValid.value = false;
  }
}

const shippingFee = computed(() => {
  if (cartStore.itemCount === 0) return 0;
  if (voucherCode.value.trim().toUpperCase() === 'CONCIERGE') return 0;
  return cartStore.subtotal >= 150 ? 0 : 8.99;
});

const discountAmount = computed(() => cartStore.subtotal * appliedDiscountPercent.value);
const taxAmount = computed(() => (cartStore.subtotal - discountAmount.value) * 0.08);
const grandTotal = computed(() => Math.max(0, cartStore.subtotal - discountAmount.value + shippingFee.value + taxAmount.value));

function initiateCheckout(): void {
  if (!authStore.isAuthenticated) {
    void router.push({ name: 'login', query: { redirect: '/cart' } });
    return;
  }

  if (cartStore.itemCount === 0) return;

  confirmedTotal.value = grandTotal.value;
  orderReference.value = `LM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  receiptModalOpen.value = true;
  cartStore.clear();
}

function closeReceipt(): void {
  receiptModalOpen.value = false;
  void router.push('/');
}
</script>
