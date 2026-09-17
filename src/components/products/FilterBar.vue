<template>
  <div class="mb-10 space-y-6">
    <!-- Top Search & Sort Control Bar -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/80 pb-5 dark:border-neutral-800">
      <!-- Search Input -->
      <div class="relative w-full sm:max-w-md">
        <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          :value="query"
          type="text"
          placeholder="Search by creation, brand or keyword..."
          class="w-full rounded-full border border-neutral-200 bg-neutral-50/80 py-2.5 pl-10 pr-10 text-xs font-medium text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-gold-400"
          @input="onQueryInput"
        />
        <button
          v-if="query"
          class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          type="button"
          @click="emit('update:query', '')"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Right: Sort & Count -->
      <div class="flex items-center justify-between sm:justify-end gap-4 text-xs">
        <span class="font-sans text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          <strong class="font-semibold text-neutral-900 dark:text-white">{{ resultCount }}</strong> Creations
        </span>

        <div class="relative">
          <select
            :value="sortBy"
            class="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-white py-2.5 pl-4 pr-9 text-xs font-semibold text-neutral-800 outline-none transition hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
            @change="onSortChange"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Tier 1: Main Parent Department Tabs -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Maison Departments
        </span>
      </div>
      <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          :class="[
            'flex-shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200',
            activeDepartmentId === 'all'
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
              : 'border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600'
          ]"
          @click="selectDepartment('all')"
        >
          All Departments
        </button>

        <button
          v-for="dept in PARENT_DEPARTMENTS"
          :key="dept.id"
          type="button"
          :class="[
            'flex-shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200',
            activeDepartmentId === dept.id
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
              : 'border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600'
          ]"
          @click="selectDepartment(dept.id)"
        >
          {{ dept.label }}
        </button>
      </div>
    </div>

    <!-- Tier 2: Beautiful, Highly Visible Sub-Category Bar -->
    <div class="rounded-3xl border border-neutral-200/90 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90">
      <!-- Bar Header Label -->
      <div class="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2.5 dark:border-neutral-800/80">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
          <span class="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
            Sub-Categories in {{ activeDepartmentLabel }}
          </span>
        </div>
        <span class="text-xs font-medium text-neutral-400 dark:text-neutral-500">
          Click to filter
        </span>
      </div>

      <!-- Sub-Category Chips with High Contrast & Clear Fonts -->
      <div class="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        <!-- "All in Department" chip -->
        <button
          type="button"
          :class="[
            'flex-shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200',
            activeSubcategory === 'all'
              ? 'bg-gold-500 text-neutral-950 shadow-md ring-2 ring-gold-400/50 scale-[1.02]'
              : 'border border-neutral-200/90 bg-neutral-50 text-neutral-800 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white'
          ]"
          @click="selectSubcategory('all')"
        >
          {{ activeDepartmentId === 'all' ? '✦ All Sub-Categories' : `✦ All ${activeDepartmentLabel}` }}
        </button>

        <!-- Specific Sub-Category chips -->
        <button
          v-for="sub in visibleSubcategories"
          :key="sub.id"
          type="button"
          :class="[
            'flex-shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200',
            activeSubcategory === sub.id
              ? 'bg-gold-500 text-neutral-950 shadow-md ring-2 ring-gold-400/50 scale-[1.02]'
              : 'border border-neutral-200/90 bg-neutral-50 text-neutral-800 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white'
          ]"
          @click="selectSubcategory(sub.id)"
        >
          {{ sub.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  PARENT_DEPARTMENTS,
  getParentDepartmentForCategory,
  type SubCategory
} from '@/lib/categoryHierarchy';
import type { SortOption } from '@/types/filter';

interface FilterBarProps {
  query: string;
  category: string;
  sortBy: SortOption;
  categories: string[];
  resultCount: number;
}

const props = defineProps<FilterBarProps>();

const emit = defineEmits<{
  (event: 'update:query', value: string): void;
  (event: 'update:category', value: string): void;
  (event: 'update:sortBy', value: SortOption): void;
}>();

const activeDepartmentId = ref('all');
const activeSubcategory = ref('all');

// Synchronize external category prop with internal department/subcategory state
watch(
  () => props.category,
  (newCat) => {
    if (newCat === 'all' || newCat.startsWith('dept:')) {
      if (newCat.startsWith('dept:')) {
        activeDepartmentId.value = newCat.replace('dept:', '');
      } else {
        activeDepartmentId.value = 'all';
      }
      activeSubcategory.value = 'all';
      return;
    }

    const parent = getParentDepartmentForCategory(newCat);
    if (parent) {
      activeDepartmentId.value = parent.id;
    }
    activeSubcategory.value = newCat;
  },
  { immediate: true }
);

const activeDepartmentLabel = computed(() => {
  const dept = PARENT_DEPARTMENTS.find((d) => d.id === activeDepartmentId.value);
  return dept ? dept.label : 'All Departments';
});

// Calculate visible subcategories based on active department
const visibleSubcategories = computed<SubCategory[]>(() => {
  if (activeDepartmentId.value === 'all') {
    // Show top luxury subcategories across all departments
    return [
      { id: 'fragrances', label: 'Parfums' },
      { id: 'mens-watches', label: "Men's Watches" },
      { id: 'womens-watches', label: "Women's Watches" },
      { id: 'beauty', label: 'Cosmetics' },
      { id: 'skin-care', label: 'Skincare' },
      { id: 'womens-bags', label: 'Designer Bags' },
      { id: 'sunglasses', label: 'Eyewear' },
      { id: 'womens-jewellery', label: 'Fine Jewellery' }
    ];
  }

  const dept = PARENT_DEPARTMENTS.find((d) => d.id === activeDepartmentId.value);
  return dept ? dept.subcategories : [];
});

function selectDepartment(deptId: string): void {
  activeDepartmentId.value = deptId;
  activeSubcategory.value = 'all';

  if (deptId === 'all') {
    emit('update:category', 'all');
  } else {
    emit('update:category', `dept:${deptId}`);
  }
}

function selectSubcategory(subId: string): void {
  activeSubcategory.value = subId;
  if (subId === 'all') {
    if (activeDepartmentId.value === 'all') {
      emit('update:category', 'all');
    } else {
      emit('update:category', `dept:${activeDepartmentId.value}`);
    }
  } else {
    emit('update:category', subId);
  }
}

function onQueryInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  emit('update:query', target?.value ?? '');
}

function onSortChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  const value = (target?.value ?? 'featured') as SortOption;
  emit('update:sortBy', value);
}
</script>
