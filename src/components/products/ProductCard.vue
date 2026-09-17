<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-brand-600 dark:hover:shadow-brand-500/5"
  >
    <!-- Image -->
    <RouterLink :to="`/product/${product.id}`" class="relative block overflow-hidden">
      <img
        :alt="product.title"
        :src="product.thumbnail"
        class="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <!-- Gradient overlay on hover -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <!-- Category badge -->
      <span
        class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/85 dark:text-slate-200"
      >
        {{ formatCategoryLabel(product.category) }}
      </span>
      <!-- Discount badge -->
      <span
        v-if="product.discountPercentage > 0"
        class="shimmer-badge absolute right-3 top-3 rounded-full bg-ember-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
      >
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </RouterLink>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-4">
      <!-- Brand & Rating -->
      <div class="mb-2 flex items-center justify-between gap-3 text-xs">
        <span class="font-medium text-slate-500 dark:text-slate-400">
          {{ product.brand ?? 'Generic Brand' }}
        </span>
        <span
          class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
        >
          <svg class="h-3 w-3 fill-amber-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <!-- Title -->
      <RouterLink
        :to="`/product/${product.id}`"
        class="line-clamp-2 font-display text-lg font-semibold leading-snug transition-colors hover:text-brand-700 dark:hover:text-brand-300"
      >
        {{ product.title }}
      </RouterLink>

      <!-- Description -->
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ product.description }}
      </p>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Price & CTA -->
      <div class="mt-4 flex items-end justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <p class="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
            {{ formatCurrency(finalPrice) }}
          </p>
          <p class="text-xs font-semibold text-brand-600 dark:text-brand-400">
            {{ formatCurrencyLKR(finalPrice) }}
          </p>
          <p v-if="product.discountPercentage > 0" class="mt-0.5 text-[11px] text-slate-400 line-through">
            {{ formatCurrency(product.price) }}
            <span class="ml-0.5">{{ formatCurrencyLKR(product.price) }}</span>
          </p>
        </div>

        <button
          class="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 active:translate-y-0"
          type="button"
          @click="emit('add-to-cart', product)"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
}>();

const finalPrice = computed(() => discountedPrice(props.product.price, props.product.discountPercentage));
</script>
