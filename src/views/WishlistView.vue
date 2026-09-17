<template>
  <div class="max-w-7xl mx-auto pb-20 pt-4">
    <!-- Header -->
    <div class="mb-10 flex flex-col justify-between gap-4 border-b border-neutral-200/80 pb-6 sm:flex-row sm:items-end dark:border-neutral-800">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
          <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Curated Private Reserve</span>
        </div>
        <h1 class="mt-2 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          Your Saved Wishlist
        </h1>
        <p class="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          Personal selection of master horology, fine fragrance, bespoke tailoring, and rare jewels.
        </p>
      </div>

      <!-- Action Buttons when Wishlist has items -->
      <div v-if="wishlistStore.items.length > 0" class="flex flex-wrap items-center gap-2.5">
        <button
          class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 active:scale-95"
          type="button"
          @click="addAllToBag"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Add All to Bag</span>
        </button>

        <button
          class="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:border-rose-400 hover:text-rose-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-rose-600"
          type="button"
          @click="clearAllWishlist"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear Wishlist</span>
        </button>
      </div>
    </div>

    <!-- Empty Wishlist State -->
    <div
      v-if="wishlistStore.items.length === 0"
      class="rounded-3xl border border-neutral-200/80 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900 shadow-sm"
    >
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950/40">
        <svg class="h-8 w-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <h2 class="mt-5 font-serif text-2xl font-normal text-neutral-900 dark:text-white sm:text-3xl">
        Your Wishlist is Empty
      </h2>
      <p class="mx-auto mt-2 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        You haven't preserved any salon creations yet. Click the heart emblem on any piece while exploring our catalog to curate your private collection.
      </p>

      <div class="mt-8 flex justify-center gap-3">
        <RouterLink
          to="/catalog"
          class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400"
        >
          <span>Discover Creations</span>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- Wishlist Grid -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article
        v-for="product in wishlistStore.items"
        :key="product.id"
        class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
      >
        <!-- Product Image Container -->
        <div class="relative overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-950/60">
          <RouterLink :to="`/product/${product.id}`" class="block">
            <div class="aspect-square w-full overflow-hidden rounded-xl">
              <img
                :alt="product.title"
                :src="product.thumbnail"
                class="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </RouterLink>

          <!-- Department Tag -->
          <span
            class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-neutral-700 shadow-sm backdrop-blur-md dark:bg-neutral-900/90 dark:text-neutral-300"
          >
            {{ formatCategoryLabel(product.category) }}
          </span>

          <!-- Remove from Wishlist Button -->
          <button
            class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-rose-500 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-rose-50 dark:bg-neutral-800/95 dark:hover:bg-rose-950/40"
            type="button"
            title="Remove from Wishlist"
            @click.stop="removeFromWishlist(product)"
          >
            <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <!-- Quick View Hover Button -->
          <div class="absolute inset-x-4 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              class="w-full rounded-xl bg-neutral-900/90 py-2.5 text-center text-xs font-semibold tracking-wider text-white backdrop-blur-md transition hover:bg-neutral-950 dark:bg-white/90 dark:text-neutral-950 dark:hover:bg-white"
              type="button"
              @click.stop="openQuickView(product)"
            >
              Quick View
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="flex flex-1 flex-col p-4 sm:p-5">
          <div class="mb-1.5 flex items-center justify-between text-xs">
            <span class="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              {{ product.brand ?? 'Maison Lumen' }}
            </span>
            <span class="flex items-center gap-1 text-[11px] font-medium text-amber-500">
              ★ {{ product.rating.toFixed(1) }}
            </span>
          </div>

          <RouterLink
            :to="`/product/${product.id}`"
            class="line-clamp-1 font-serif text-base font-normal tracking-tight text-neutral-900 transition-colors hover:text-gold-600 dark:text-neutral-100 dark:hover:text-gold-400 sm:text-lg"
          >
            {{ product.title }}
          </RouterLink>

          <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {{ product.description }}
          </p>

          <div class="flex-1 min-h-[14px]" />

          <!-- Price & Add Button -->
          <div class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3.5 dark:border-neutral-800">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="font-serif text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                  {{ formatCurrency(getDiscountedPrice(product)) }}
                </span>
                <span
                  v-if="product.discountPercentage > 0"
                  class="text-xs text-neutral-400 line-through dark:text-neutral-500"
                >
                  {{ formatCurrency(product.price) }}
                </span>
              </div>
              <span class="block text-[10px] font-semibold text-gold-600 dark:text-gold-400">
                {{ formatCurrencyLKR(getDiscountedPrice(product)) }}
              </span>
            </div>

            <!-- Add to Bag Button -->
            <button
              class="inline-flex items-center gap-1.5 rounded-full border border-neutral-900 bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gold-500 hover:border-gold-500 hover:text-neutral-950 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 dark:hover:border-gold-400 active:scale-95"
              type="button"
              @click="addToBag(product)"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Quick View Modal -->
    <QuickViewModal
      :is-open="quickViewOpen"
      :product="selectedProduct"
      @close="quickViewOpen = false"
      @add-to-cart="addToBag"
      @toggle-wishlist="removeFromWishlist"
    />

    <!-- Toast Notification -->
    <ToastNotification
      :show="toastShow"
      :title="toastTitle"
      :message="toastMessage"
      :thumbnail="toastThumbnail"
      :action-label="toastActionLabel"
      :action-route="toastActionRoute"
      @close="toastShow = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import QuickViewModal from '@/components/products/QuickViewModal.vue';
import ToastNotification from '@/components/products/ToastNotification.vue';
import { discountedPrice, formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const quickViewOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

// Toast state
const toastShow = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastThumbnail = ref<string | undefined>(undefined);
const toastActionLabel = ref<string | undefined>(undefined);
const toastActionRoute = ref<string | undefined>(undefined);
let toastTimer: number | null = null;

function triggerToast(options: {
  title: string;
  message: string;
  thumbnail?: string;
  actionLabel?: string;
  actionRoute?: string;
}): void {
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTitle.value = options.title;
  toastMessage.value = options.message;
  toastThumbnail.value = options.thumbnail;
  toastActionLabel.value = options.actionLabel;
  toastActionRoute.value = options.actionRoute;
  toastShow.value = true;

  toastTimer = window.setTimeout(() => {
    toastShow.value = false;
  }, 3500);
}

function getDiscountedPrice(product: Product): number {
  return discountedPrice(product.price, product.discountPercentage);
}

function openQuickView(product: Product): void {
  selectedProduct.value = product;
  quickViewOpen.value = true;
}

function addToBag(product: Product, quantity = 1): void {
  cartStore.addItem(product, quantity);
  triggerToast({
    title: 'Added to Bag',
    message: `${product.title} (${quantity} ${quantity > 1 ? 'items' : 'item'})`,
    thumbnail: product.thumbnail,
    actionLabel: 'View Bag',
    actionRoute: '/cart'
  });
}

function removeFromWishlist(product: Product): void {
  wishlistStore.removeItem(product.id);
  triggerToast({
    title: 'Removed from Wishlist',
    message: product.title,
    thumbnail: product.thumbnail
  });
}

function clearAllWishlist(): void {
  const count = wishlistStore.items.length;
  wishlistStore.clearWishlist();
  triggerToast({
    title: 'Wishlist Cleared',
    message: `Removed ${count} preserved creations.`
  });
}

function addAllToBag(): void {
  const count = wishlistStore.items.length;
  for (const item of wishlistStore.items) {
    cartStore.addItem(item, 1);
  }
  triggerToast({
    title: 'All Items Added to Bag',
    message: `Transferred ${count} creations to your shopping bag.`,
    actionLabel: 'View Bag',
    actionRoute: '/cart'
  });
}
</script>
