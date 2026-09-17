<template>
  <section v-if="trendingProducts.length > 0" class="mb-20 scroll-mt-24">
    <!-- Header Banner -->
    <div class="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-200/70 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
          <span class="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>Trending Privilège Offers</span>
        </div>
        <h2 class="mt-2 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Limited Salon Reductions
        </h2>
        <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Exclusive seasonal privileges on select horology, rare parfums, and bespoke atelier creations.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          Curated Offers
        </span>
      </div>
    </div>

    <!-- 4-Card Trending Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="product in trendingProducts"
        :key="product.id"
        class="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
      >
        <!-- Image Canvas -->
        <div class="relative overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-950/60">
          <RouterLink :to="`/product/${product.id}`" class="block">
            <div class="aspect-square w-full overflow-hidden rounded-xl">
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </RouterLink>

          <!-- Discount Pill -->
          <div class="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-black tracking-wider text-white shadow-sm">
            -{{ Math.round(product.discountPercentage) }}% PRIVILÈGE
          </div>

          <!-- Wishlist Heart -->
          <button
            :class="[
              'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-400 shadow-sm transition hover:scale-110 dark:bg-neutral-800/90',
              wishlistStore.isInWishlist(product.id) ? '!text-rose-500 !bg-rose-50' : 'hover:text-rose-500'
            ]"
            type="button"
            title="Save to Wishlist"
            @click.stop="toggleWishlist(product)"
          >
            <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <!-- Quick View Hover Button -->
          <div class="absolute inset-x-4 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              class="w-full rounded-xl bg-neutral-950/90 py-2.5 text-center text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-neutral-950 dark:bg-white/90 dark:text-neutral-950 dark:hover:bg-white"
              type="button"
              @click.stop="emit('quick-view', product)"
            >
              Quick View
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col p-4 sm:p-5">
          <div class="mb-1 flex items-center justify-between text-xs">
            <span class="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              {{ product.brand ?? 'Maison Lumen' }}
            </span>
            <span class="flex items-center gap-1 text-[11px] font-medium text-amber-500">
              ★ {{ product.rating.toFixed(1) }}
            </span>
          </div>

          <RouterLink
            :to="`/product/${product.id}`"
            class="line-clamp-1 font-serif text-base font-normal tracking-tight text-neutral-900 transition-colors hover:text-gold-600 dark:text-white dark:hover:text-gold-400 sm:text-lg"
          >
            {{ product.title }}
          </RouterLink>

          <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {{ product.description }}
          </p>

          <div class="flex-1 min-h-[12px]" />

          <!-- Prices & Add Button -->
          <div class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3.5 dark:border-neutral-800">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="font-serif text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                  {{ formatCurrency(getDiscountedPrice(product)) }}
                </span>
                <span class="text-xs text-rose-500 line-through">
                  {{ formatCurrency(product.price) }}
                </span>
              </div>
              <span class="block text-[10px] font-semibold text-gold-600 dark:text-gold-400">
                {{ formatCurrencyLKR(getDiscountedPrice(product)) }}
              </span>
            </div>

            <button
              class="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 active:scale-95"
              type="button"
              @click="emit('add-to-cart', product)"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const props = defineProps<{
  products: Product[];
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', product: Product): void;
  (event: 'quick-view', product: Product): void;
  (event: 'wishlist-toggled', product: Product, isFav: boolean): void;
}>();

const wishlistStore = useWishlistStore();

// Select the top 4 products with highest discount percentage and great rating
const trendingProducts = computed(() => {
  const withDiscounts = props.products.filter((p) => p.discountPercentage >= 10);
  return [...withDiscounts]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);
});

function getDiscountedPrice(product: Product): number {
  return discountedPrice(product.price, product.discountPercentage);
}

function toggleWishlist(product: Product): void {
  const added = wishlistStore.toggleWishlist(product);
  emit('wishlist-toggled', product, added);
}
</script>
