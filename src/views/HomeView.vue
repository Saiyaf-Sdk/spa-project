<template>
  <div class="space-y-24 pb-16">
    <!-- 1. Grand Editorial Hero Banner -->
    <HeroSection :category-count="categories.length" :total-products="products.length" />

    <!-- 2. Trending Privilège Offers Spotlight -->
    <section>
      <TrendingOffers
        :products="products"
        @add-to-cart="addToCart($event, 1)"
        @quick-view="openQuickView"
        @wishlist-toggled="handleWishlistToggled"
      />
      <!-- Link to Dedicated Catalog -->
      <div class="mt-8 text-center">
        <RouterLink
          to="/catalog"
          class="group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-950 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-500"
        >
          <span>Explore All Salon Creations</span>
          <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </section>

    <!-- 3. Visual Department Showcase -->
    <DepartmentShowcase @select-category="navigateToDepartment" />

    <!-- 4. Maison Heritage & Craftsmanship Story -->
    <section class="rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-8 sm:p-14 dark:border-neutral-800 dark:bg-neutral-950/60">
      <div class="mx-auto max-w-3xl text-center space-y-6">
        <span class="font-brand text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400">
          The Maison Philosophy
        </span>
        <h2 class="font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          Devotion to Rarity &amp; Authenticity
        </h2>
        <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          At Maison Lumen, every timepiece, fragrance flacon, and artisan piece is individually verified for pedigree,
          symmetry, and provenance. We present only certified masterworks for collectors who appreciate uncompromising refinement.
        </p>

        <div class="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 text-left">
          <div class="rounded-2xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <span class="font-serif text-lg font-semibold text-neutral-900 dark:text-white">01. Direct Atelier</span>
            <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Unbroken provenance with individual certification.</p>
          </div>
          <div class="rounded-2xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <span class="font-serif text-lg font-semibold text-neutral-900 dark:text-white">02. Bespoke Packaging</span>
            <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Signature gold wax crest and silk ribbon presentation.</p>
          </div>
          <div class="rounded-2xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <span class="font-serif text-lg font-semibold text-neutral-900 dark:text-white">03. White-Glove Care</span>
            <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Insured express courier delivery worldwide.</p>
          </div>
        </div>

        <div class="pt-4">
          <RouterLink
            to="/catalog"
            class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400"
          >
            <span>Browse The Full Collection</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

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
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import HeroSection from '@/components/home/HeroSection.vue';
import TrendingOffers from '@/components/home/TrendingOffers.vue';
import DepartmentShowcase from '@/components/home/DepartmentShowcase.vue';
import QuickViewModal from '@/components/products/QuickViewModal.vue';
import ToastNotification from '@/components/products/ToastNotification.vue';
import { useProducts } from '@/composables/useProducts';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const router = useRouter();
const { products, categories, loadProducts } = useProducts();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

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
});

function navigateToDepartment(categoryKey: string): void {
  void router.push({
    path: '/catalog',
    query: { category: categoryKey }
  });
}

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
</script>
