<template>
  <div class="max-w-7xl mx-auto pb-20 pt-4">
    <!-- Catalog Header -->
    <div class="mb-10 text-center">
      <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
        Curated Atelier Archive
      </span>
      <h1 class="mt-2 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
        All Salon Creations
      </h1>
      <p class="mx-auto mt-2.5 max-w-lg text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        Browse our verified inventory of master Swiss timepieces, haute parfumerie, luxury leather goods, and artisan living pieces.
      </p>
      <div class="mx-auto mt-4 h-0.5 w-16 bg-gold-400/60" />
    </div>

    <!-- Hierarchical FilterBar (Parent Departments & Sub-Categories) -->
    <FilterBar
      :categories="categories"
      :category="selectedCategory"
      :query="searchQuery"
      :result-count="filteredProducts.length"
      :sort-by="sortBy"
      @update:category="onCategoryChange"
      @update:query="searchQuery = $event"
      @update:sort-by="sortBy = $event"
    />

    <!-- Error State -->
    <div
      v-if="errorMessage"
      class="mb-8 rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-center text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
    >
      <p class="font-serif text-lg font-semibold">Unable to load catalog</p>
      <p class="mt-1 text-xs">{{ errorMessage }}</p>
      <button
        class="mt-4 rounded-full bg-neutral-900 px-6 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950"
        type="button"
        @click="loadProducts(true)"
      >
        Retry Connection
      </button>
    </div>

    <!-- Filtered Products Grid -->
    <ProductGrid
      :loading="isLoading"
      :products="filteredProducts"
      @add-to-cart="addToCart($event, 1)"
      @quick-view="openQuickView"
      @wishlist-toggled="handleWishlistToggled"
    />

    <!-- Empty State -->
    <div
      v-if="!isLoading && !errorMessage && filteredProducts.length === 0"
      class="mt-12 rounded-3xl border border-neutral-200/80 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900 shadow-sm"
    >
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="mt-4 font-serif text-2xl font-normal text-neutral-900 dark:text-white">
        No Creations Found
      </h3>
      <p class="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        No products match your active search or sub-category selection. Please adjust keywords or reset filters.
      </p>
      <button
        class="mt-6 rounded-full bg-neutral-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400"
        type="button"
        @click="resetFilters"
      >
        Reset All Filters
      </button>
    </div>

    <!-- Quick View Modal -->
    <QuickViewModal
      :is-open="quickViewOpen"
      :product="selectedProduct"
      @close="quickViewOpen = false"
      @add-to-cart="addToCart"
      @toggle-wishlist="toggleWishlist"
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FilterBar from '@/components/products/FilterBar.vue';
import ProductGrid from '@/components/products/ProductGrid.vue';
import QuickViewModal from '@/components/products/QuickViewModal.vue';
import ToastNotification from '@/components/products/ToastNotification.vue';
import { useProducts } from '@/composables/useProducts';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { getAllSubcategoriesForDepartment } from '@/lib/categoryHierarchy';
import type { Product } from '@/types/product';
import type { SortOption } from '@/types/filter';

const route = useRoute();
const router = useRouter();

const { products, categories, isLoading, errorMessage, loadProducts } = useProducts();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const searchQuery = ref('');
const selectedCategory = ref('all');
const sortBy = ref<SortOption>('featured');

// Quick View State
const quickViewOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

// Toast State
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

onMounted(() => {
  void loadProducts();
  if (route.query.category && typeof route.query.category === 'string') {
    selectedCategory.value = route.query.category;
  }
});

watch(
  () => route.query.category,
  (newCat) => {
    if (newCat && typeof newCat === 'string') {
      selectedCategory.value = newCat;
    } else {
      selectedCategory.value = 'all';
    }
  }
);

function onCategoryChange(newCat: string): void {
  selectedCategory.value = newCat;
  void router.replace({
    query: {
      ...route.query,
      category: newCat !== 'all' ? newCat : undefined
    }
  });
}

const filteredProducts = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase();
  const bySearch = products.value.filter((product) => {
    const text = `${product.title} ${product.description} ${product.brand ?? ''}`.toLowerCase();
    return text.includes(normalizedQuery);
  });

  let byCategory = bySearch;

  if (selectedCategory.value !== 'all') {
    if (selectedCategory.value.startsWith('dept:')) {
      const deptId = selectedCategory.value.replace('dept:', '');
      const subcategories = getAllSubcategoriesForDepartment(deptId);
      byCategory = bySearch.filter((product) => subcategories.includes(product.category));
    } else {
      byCategory = bySearch.filter((product) => product.category === selectedCategory.value);
    }
  }

  const sorted = [...byCategory];

  if (sortBy.value === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }

  if (sortBy.value === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }

  if (sortBy.value === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }

  sorted.sort((a, b) => b.rating * b.stock - a.rating * a.stock);
  return sorted;
});

function addToCart(product: Product, quantity = 1): void {
  cartStore.addItem(product, quantity);
  triggerToast({
    title: 'Added to Bag',
    message: `${product.title} (${quantity} ${quantity > 1 ? 'items' : 'item'})`,
    thumbnail: product.thumbnail,
    actionLabel: 'View Bag',
    actionRoute: '/cart'
  });
}

function openQuickView(product: Product): void {
  selectedProduct.value = product;
  quickViewOpen.value = true;
}

function toggleWishlist(product: Product): void {
  const added = wishlistStore.toggleWishlist(product);
  handleWishlistToggled(product, added);
}

function handleWishlistToggled(product: Product, isFav: boolean): void {
  triggerToast({
    title: isFav ? 'Saved to Wishlist' : 'Removed from Wishlist',
    message: product.title,
    thumbnail: product.thumbnail,
    actionLabel: isFav ? 'View Wishlist' : undefined,
    actionRoute: isFav ? '/wishlist' : undefined
  });
}

function resetFilters(): void {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  sortBy.value = 'featured';
  void router.replace({ query: {} });
}
</script>
