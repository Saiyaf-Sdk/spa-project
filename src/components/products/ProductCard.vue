<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800/80 dark:bg-neutral-900 dark:hover:border-neutral-700"
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

      <!-- Department Tag (Top Left) -->
      <span
        class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-neutral-700 shadow-sm backdrop-blur-md dark:bg-neutral-900/90 dark:text-neutral-300"
      >
        {{ formatCategoryLabel(product.category) }}
      </span>

      <!-- Discount Tag (Top Right Beside Heart) -->
      <span
        v-if="product.discountPercentage > 0"
        class="absolute right-12 top-3 rounded-full bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm dark:bg-gold-500 dark:text-neutral-950"
      >
        -{{ Math.round(product.discountPercentage) }}%
      </span>

      <!-- Wishlist Heart Button -->
      <button
        :class="[
          'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-400 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 dark:bg-neutral-800/90',
          isFavorite
            ? '!text-rose-500 !bg-rose-50 dark:!bg-rose-950/40'
            : 'hover:text-rose-500'
        ]"
        type="button"
        title="Add to Wishlist"
        @click.stop="toggleWishlist"
      >
        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <!-- Quick View Hover Reveal -->
      <div class="absolute inset-x-4 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          class="w-full rounded-xl bg-neutral-900/90 py-2.5 text-center text-xs font-semibold tracking-wider text-white backdrop-blur-md transition hover:bg-neutral-950 dark:bg-white/90 dark:text-neutral-950 dark:hover:bg-white"
          type="button"
          @click.stop="emit('quick-view', product)"
        >
          Quick View
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <!-- Maison Brand & Rating -->
      <div class="mb-1.5 flex items-center justify-between text-xs">
        <span class="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          {{ product.brand ?? 'Maison Lumen' }}
        </span>
        <span class="flex items-center gap-1 text-[11px] font-medium text-amber-500">
          ★ {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <!-- Title -->
      <RouterLink
        :to="`/product/${product.id}`"
        class="line-clamp-1 font-serif text-base font-normal tracking-tight text-neutral-900 transition-colors hover:text-gold-600 dark:text-neutral-100 dark:hover:text-gold-400 sm:text-lg"
      >
        {{ product.title }}
      </RouterLink>

      <!-- Description Snippet -->
      <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {{ product.description }}
      </p>

      <!-- Spacer -->
      <div class="flex-1 min-h-[14px]" />

      <!-- Price & Add Button -->
      <div class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3.5 dark:border-neutral-800">
        <div>
          <div class="flex items-baseline gap-1.5">
            <span class="font-serif text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
              {{ formatCurrency(finalPrice) }}
            </span>
            <span
              v-if="product.discountPercentage > 0"
              class="text-xs text-neutral-400 line-through dark:text-neutral-500"
            >
              {{ formatCurrency(product.price) }}
            </span>
          </div>
          <span class="block text-[10px] font-semibold text-gold-600 dark:text-gold-400">
            {{ formatCurrencyLKR(finalPrice) }}
          </span>
        </div>

        <!-- Add Button -->
        <button
          class="inline-flex items-center gap-1 rounded-full border border-neutral-900 bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-gold-500 hover:border-gold-500 hover:text-neutral-950 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 dark:hover:border-gold-400 active:scale-95"
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
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
  (event: 'quick-view', value: Product): void;
  (event: 'wishlist-toggled', value: Product, isFav: boolean): void;
}>();

const wishlistStore = useWishlistStore();

const finalPrice = computed(() => discountedPrice(props.product.price, props.product.discountPercentage));
const isFavorite = computed(() => wishlistStore.isInWishlist(props.product.id));

function toggleWishlist(): void {
  const added = wishlistStore.toggleWishlist(props.product);
  emit('wishlist-toggled', props.product, added);
}
</script>
