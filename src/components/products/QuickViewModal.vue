<template>
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
        v-if="isOpen && product"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          @click="emit('close')"
        />

        <!-- Modal Dialog -->
        <div
          class="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
        >
          <!-- Close Button -->
          <button
            class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            type="button"
            @click="emit('close')"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="grid gap-6 sm:grid-cols-2">
            <!-- Left: Product Image -->
            <div class="space-y-3">
              <div class="relative overflow-hidden rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-950">
                <img
                  :src="activeImage"
                  :alt="product.title"
                  class="h-64 w-full object-cover object-center rounded-xl sm:h-72"
                />
                <span
                  v-if="product.discountPercentage > 0"
                  class="absolute left-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm dark:bg-gold-500 dark:text-neutral-950"
                >
                  -{{ Math.round(product.discountPercentage) }}% OFF
                </span>
              </div>

              <!-- Thumbnails -->
              <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  v-for="img in images.slice(0, 4)"
                  :key="img"
                  type="button"
                  :class="[
                    'h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border p-1 transition',
                    img === activeImage
                      ? 'border-neutral-900 ring-2 ring-neutral-900 dark:border-white dark:ring-white'
                      : 'border-neutral-200 opacity-60 hover:opacity-100 dark:border-neutral-700'
                  ]"
                  @click="activeImage = img"
                >
                  <img :src="img" :alt="product.title" class="h-full w-full object-cover rounded-lg" />
                </button>
              </div>
            </div>

            <!-- Right: Details & Order -->
            <div class="flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    {{ formatCategoryLabel(product.category) }}
                  </span>
                  <span class="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    ★ {{ product.rating.toFixed(1) }} / 5.0
                  </span>
                </div>

                <h2 class="mt-2 font-serif text-2xl font-normal leading-tight text-neutral-900 dark:text-white">
                  {{ product.title }}
                </h2>

                <p v-if="product.brand" class="mt-0.5 text-xs text-neutral-400">
                  Brand: <span class="font-semibold text-neutral-700 dark:text-neutral-200">{{ product.brand }}</span>
                </p>

                <!-- Prices -->
                <div class="mt-3 flex items-baseline gap-2">
                  <span class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    {{ formatCurrency(finalPrice) }}
                  </span>
                  <span class="text-xs font-semibold text-gold-600 dark:text-gold-400">
                    {{ formatCurrencyLKR(finalPrice) }}
                  </span>
                  <span
                    v-if="product.discountPercentage > 0"
                    class="text-xs text-neutral-400 line-through"
                  >
                    {{ formatCurrency(product.price) }}
                  </span>
                </div>

                <p class="mt-3 line-clamp-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {{ product.description }}
                </p>

                <!-- Stock availability -->
                <div class="mt-4 flex items-center gap-2 text-xs">
                  <span class="h-2 w-2 rounded-full bg-emerald-500" />
                  <span class="text-neutral-600 dark:text-neutral-400">
                    {{ product.stock > 5 ? 'In Stock — Ready for Courier' : `Limited Stock (${product.stock} left)` }}
                  </span>
                </div>
              </div>

              <!-- Action Controls -->
              <div class="mt-6 space-y-3">
                <div class="flex items-center gap-3">
                  <!-- Quantity -->
                  <div class="flex items-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                    <button
                      class="px-3 py-2 text-xs font-bold hover:text-neutral-900 dark:hover:text-white"
                      type="button"
                      @click="quantity = Math.max(1, quantity - 1)"
                    >
                      -
                    </button>
                    <span class="w-6 text-center text-xs font-bold">{{ quantity }}</span>
                    <button
                      class="px-3 py-2 text-xs font-bold hover:text-neutral-900 dark:hover:text-white"
                      type="button"
                      @click="quantity = Math.min(product.stock, quantity + 1)"
                    >
                      +
                    </button>
                  </div>

                  <!-- Add to Bag -->
                  <button
                    class="flex-1 rounded-full bg-neutral-900 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400"
                    type="button"
                    @click="onAddToCart"
                  >
                    Add to Bag
                  </button>

                  <!-- Wishlist -->
                  <button
                    :class="[
                      'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
                      isFavorite
                        ? '!border-rose-300 !bg-rose-50 !text-rose-600 dark:!bg-rose-950/40'
                        : 'border-neutral-200 text-neutral-400 hover:text-rose-500 dark:border-neutral-700'
                    ]"
                    type="button"
                    :title="isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'"
                    @click="onToggleWishlist"
                  >
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                <!-- Full details router link -->
                <RouterLink
                  :to="`/product/${product.id}`"
                  class="block text-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  @click="emit('close')"
                >
                  View Full Product Details &rarr;
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product | null;
  isOpen: boolean;
  isFav?: boolean;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'add-to-cart', product: Product, quantity: number): void;
  (event: 'toggle-wishlist', product: Product): void;
}>();

const wishlistStore = useWishlistStore();

const isFavorite = computed(() => {
  return props.product ? wishlistStore.isInWishlist(props.product.id) : false;
});

const quantity = ref(1);
const activeImage = ref('');

const images = computed(() => {
  if (!props.product) return [];
  return props.product.images?.length > 0 ? props.product.images : [props.product.thumbnail];
});

const finalPrice = computed(() => {
  if (!props.product) return 0;
  return discountedPrice(props.product.price, props.product.discountPercentage);
});

watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      activeImage.value = newVal.thumbnail;
      quantity.value = 1;
    }
  },
  { immediate: true }
);

function onAddToCart(): void {
  if (props.product) {
    emit('add-to-cart', props.product, quantity.value);
    emit('close');
  }
}

function onToggleWishlist(): void {
  if (props.product) {
    emit('toggle-wishlist', props.product);
  }
}
</script>
