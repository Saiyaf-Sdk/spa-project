<template>
  <section>
    <!-- Modern Minimalist Skeleton Loader -->
    <div
      v-if="loading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        v-for="index in 8"
        :key="index"
        class="h-[400px] animate-pulse rounded-2xl border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-neutral-900 p-4 flex flex-col justify-between"
      >
        <div class="h-60 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        <div class="space-y-2.5 mt-4">
          <div class="h-3.5 w-1/4 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div class="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div class="h-3.5 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div class="h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 mt-4" />
      </div>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="emit('add-to-cart', $event)"
        @quick-view="emit('quick-view', $event)"
        @wishlist-toggled="(prod, isFav) => emit('wishlist-toggled', prod, isFav)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '@/components/products/ProductCard.vue';
import type { Product } from '@/types/product';

defineProps<{
  products: Product[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
  (event: 'quick-view', value: Product): void;
  (event: 'wishlist-toggled', product: Product, isFav: boolean): void;
}>();
</script>
