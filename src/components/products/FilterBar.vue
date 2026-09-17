<template>
  <section class="mb-6 rounded-2xl glass-card p-5 soft-ring">
    <div class="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:items-end">
      <!-- Search -->
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
          <svg class="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </span>
        <input
          :value="query"
          class="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200/50 focus:shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-brand-800/50"
          placeholder="Search title, description, or brand..."
          type="text"
          @input="onQueryInput"
        />
      </label>

      <!-- Category -->
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
          <svg class="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          Category
        </span>
        <select
          :value="category"
          class="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200/50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800/50"
          @change="onCategoryChange"
        >
          <option value="all">All Categories</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ formatCategoryLabel(item) }}
          </option>
        </select>
      </label>

      <!-- Sort -->
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
          <svg class="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort
        </span>
        <select
          :value="sortBy"
          class="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200/50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800/50"
          @change="onSortChange"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </label>

      <!-- Result Count -->
      <div
        class="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-800 dark:bg-brand-900/30 dark:text-brand-100"
      >
        <span class="font-display text-lg">{{ resultCount }}</span>
        <span class="text-xs font-semibold uppercase tracking-wide">items</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatCategoryLabel } from '@/lib/format';
import type { SortOption } from '@/types/filter';

interface FilterBarProps {
  query: string;
  category: string;
  sortBy: SortOption;
  categories: string[];
  resultCount: number;
}

defineProps<FilterBarProps>();

const emit = defineEmits<{
  (event: 'update:query', value: string): void;
  (event: 'update:category', value: string): void;
  (event: 'update:sortBy', value: SortOption): void;
}>();

function onQueryInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  emit('update:query', target?.value ?? '');
}

function onCategoryChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  emit('update:category', target?.value ?? 'all');
}

function onSortChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  const value = (target?.value ?? 'featured') as SortOption;
  emit('update:sortBy', value);
}
</script>
