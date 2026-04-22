<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/85 shadow-float transition hover:-translate-y-1 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900/75"
  >
    <RouterLink :to="`/product/${product.id}`" class="relative block overflow-hidden">
      <img
        :alt="product.title"
        :src="product.thumbnail"
        class="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span
        class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900/85 dark:text-slate-200"
      >
        {{ formatCategoryLabel(product.category) }}
      </span>
    </RouterLink>

    <div class="flex flex-1 flex-col p-4">
      <div class="mb-2 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>{{ product.brand ?? 'Generic Brand' }}</span>
        <span>{{ product.rating.toFixed(1) }} / 5</span>
      </div>

      <RouterLink :to="`/product/${product.id}`" class="line-clamp-2 font-display text-lg font-semibold">
        {{ product.title }}
      </RouterLink>

      <p class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-end justify-between">
        <div>
          <p class="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
            {{ formatCurrency(finalPrice) }}
          </p>
          <p v-if="product.discountPercentage > 0" class="text-xs text-slate-500 line-through">
            {{ formatCurrency(product.price) }}
          </p>
        </div>

        <button
          class="rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
          type="button"
          @click="emit('add-to-cart', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCategoryLabel, formatCurrency } from '@/lib/format';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
}>();

const finalPrice = computed(() => discountedPrice(props.product.price, props.product.discountPercentage));
</script>

