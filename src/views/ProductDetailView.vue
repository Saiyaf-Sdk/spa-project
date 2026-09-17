<template>
  <section class="max-w-7xl mx-auto pb-16 pt-2">
    <!-- Back Navigation & Breadcrumb -->
    <div class="mb-6 flex items-center justify-between border-b border-neutral-200/60 pb-4 dark:border-neutral-800">
      <button
        class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
        type="button"
        @click="goBack"
      >
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Catalog</span>
      </button>

      <!-- Department Breadcrumb -->
      <span v-if="product" class="hidden sm:inline-block font-sans text-xs uppercase tracking-widest text-neutral-400">
        Salon / <span class="text-neutral-900 dark:text-neutral-100 font-semibold">{{ formattedCategory }}</span> / {{ product.title }}
      </span>
    </div>

    <!-- Loading Skeleton -->
    <div
      v-if="loading"
      class="grid gap-8 rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 md:grid-cols-2"
      aria-busy="true"
    >
      <div class="h-96 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
      <div class="space-y-4">
        <div class="h-4 w-1/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div class="h-8 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div class="h-6 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div class="h-24 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
    >
      <p class="font-serif text-xl font-semibold">Unable to retrieve product details</p>
      <p class="mt-2 text-xs">{{ errorMessage }}</p>
      <button
        class="mt-4 rounded-full bg-neutral-900 px-6 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950"
        type="button"
        @click="goBack"
      >
        Return to Catalog
      </button>
    </div>

    <!-- Product Showcase -->
    <article v-else-if="product" class="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-10">
      <div class="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <!-- Left: Image Gallery -->
        <div class="space-y-4">
          <div class="relative overflow-hidden rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950/70 border border-neutral-100 dark:border-neutral-800">
            <img
              :alt="product.title"
              :src="activeImage"
              class="h-[360px] w-full object-cover object-center rounded-xl transition-all duration-500 sm:h-[460px]"
            />
            <span
              v-if="product.discountPercentage > 0"
              class="absolute left-4 top-4 rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white shadow-md dark:bg-gold-500 dark:text-neutral-950"
            >
              -{{ Math.round(product.discountPercentage) }}% OFF
            </span>
          </div>

          <!-- Thumbnails Selector -->
          <div v-if="imageChoices.length > 1" class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            <button
              v-for="img in imageChoices"
              :key="img"
              type="button"
              :class="[
                'h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border p-1 transition-all duration-200',
                img === activeImage
                  ? 'border-neutral-900 ring-2 ring-neutral-900 dark:border-white dark:ring-white scale-105'
                  : 'border-neutral-200 opacity-60 hover:opacity-100 dark:border-neutral-700'
              ]"
              @click="activeImage = img"
            >
              <img :alt="product.title" :src="img" class="h-full w-full object-cover rounded-lg" />
            </button>
          </div>
        </div>

        <!-- Right: Details & Purchase Options -->
        <div class="flex flex-col justify-between">
          <div>
            <!-- Header Badges -->
            <div class="flex items-center justify-between">
              <span class="rounded-full bg-neutral-100 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {{ formattedCategory }}
              </span>
              <span class="flex items-center gap-1 font-sans text-xs font-semibold text-amber-500">
                ★ {{ product.rating.toFixed(1) }} / 5.0 ({{ product.reviews?.length ?? 8 }} Appraisals)
              </span>
            </div>

            <!-- Title & Maison Origin -->
            <h1 class="mt-3 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {{ product.title }}
            </h1>
            <p class="mt-1 font-sans text-xs uppercase tracking-widest text-neutral-400">
              Brand: <span class="font-semibold text-neutral-700 dark:text-neutral-200">{{ product.brand ?? 'Maison Lumen' }}</span>
            </p>

            <!-- Price Breakdown -->
            <div class="mt-6 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-950/60">
              <div class="flex items-baseline gap-3">
                <span class="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                  {{ formatCurrency(finalPrice) }}
                </span>
                <span class="text-xs font-semibold text-gold-600 dark:text-gold-400">
                  {{ formatCurrencyLKR(finalPrice) }}
                </span>
                <span
                  v-if="product.discountPercentage > 0"
                  class="text-xs text-neutral-400 line-through"
                >
                  {{ formatCurrency(product.price) }}
                </span>
              </div>
              <p class="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                White-glove courier delivery complimentary on orders over $150.
              </p>
            </div>

            <!-- Description -->
            <p class="mt-5 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {{ product.description }}
            </p>

            <!-- Stock Status -->
            <div class="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span class="h-2 w-2 rounded-full bg-emerald-500" />
              <span>In Stock — {{ product.stock }} units ready for expedited courier dispatch.</span>
            </div>

            <!-- Quantity & Actions -->
            <div class="mt-6 flex flex-wrap items-center gap-3">
              <!-- Quantity Controller -->
              <div class="flex items-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 p-1">
                <button
                  class="h-8 w-8 rounded-full font-bold text-neutral-700 hover:bg-white dark:text-neutral-300 dark:hover:bg-neutral-700"
                  type="button"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  -
                </button>
                <span class="w-8 text-center font-sans text-xs font-bold">{{ quantity }}</span>
                <button
                  class="h-8 w-8 rounded-full font-bold text-neutral-700 hover:bg-white dark:text-neutral-300 dark:hover:bg-neutral-700"
                  type="button"
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                >
                  +
                </button>
              </div>

              <!-- Add to Private Bag -->
              <button
                class="flex-1 min-w-[180px] rounded-full bg-neutral-900 py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-gold-400 active:scale-95"
                type="button"
                @click="onAddToCart"
              >
                Add to Bag
              </button>

              <!-- Wishlist Toggle -->
              <button
                :class="[
                  'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200',
                  isWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-neutral-200 text-neutral-400 hover:text-rose-500 dark:border-neutral-700'
                ]"
                type="button"
                title="Toggle Wishlist"
                @click="toggleWishlist"
              >
                <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Trust Guarantees Grid -->
          <div class="mt-8 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-6 text-xs dark:border-neutral-800">
            <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
              <span class="text-neutral-900 dark:text-white">✓</span>
              <span>100% Certified Authentic</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
              <span class="text-neutral-900 dark:text-white">✓</span>
              <span>Signature Gift Box Included</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
              <span class="text-neutral-900 dark:text-white">✓</span>
              <span>30-Day Return Privilege</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
              <span class="text-neutral-900 dark:text-white">✓</span>
              <span>24/7 Concierge Care</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs: Craft, Specs, Delivery, Reviews -->
      <div class="mt-12 border-t border-neutral-100 pt-8 dark:border-neutral-800">
        <div class="flex flex-wrap gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
          <button
            v-for="tab in ['The Craft & Details', 'Specifications', 'White-Glove Shipping', 'Client Reviews']"
            :key="tab"
            type="button"
            :class="[
              'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200',
              activeTab === tab
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
            ]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab 1: The Craft & Details -->
        <div v-if="activeTab === 'The Craft & Details'" class="py-6 space-y-4">
          <h3 class="font-serif text-xl font-normal text-neutral-900 dark:text-white">
            Artisanal Precision &amp; Heritage
          </h3>
          <p class="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            Every piece curated by Maison Lumen undergoes rigorous verification by our specialists. Hand-inspected for symmetry, finishing, and uncompromising standard of luxury excellence.
          </p>
        </div>

        <!-- Tab 2: Specifications -->
        <div v-if="activeTab === 'Specifications'" class="py-6">
          <dl class="grid gap-3 sm:grid-cols-2 max-w-3xl text-sm">
            <div class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <dt class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Brand</dt>
              <dd class="mt-1 font-semibold text-neutral-900 dark:text-white">{{ product.brand ?? 'Maison Lumen' }}</dd>
            </div>
            <div class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <dt class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</dt>
              <dd class="mt-1 font-semibold text-neutral-900 dark:text-white">{{ formattedCategory }}</dd>
            </div>
            <div class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <dt class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Warranty</dt>
              <dd class="mt-1 font-semibold text-neutral-900 dark:text-white">{{ product.warrantyInformation ?? '2-Year International Warranty' }}</dd>
            </div>
            <div class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <dt class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Shipping Standard</dt>
              <dd class="mt-1 font-semibold text-neutral-900 dark:text-white">{{ product.shippingInformation ?? 'Tracked Courier' }}</dd>
            </div>
          </dl>
        </div>

        <!-- Tab 3: White-Glove Shipping -->
        <div v-if="activeTab === 'White-Glove Shipping'" class="py-6 space-y-3 max-w-3xl">
          <h3 class="font-serif text-xl font-normal text-neutral-900 dark:text-white">
            Secure Courier Delivery
          </h3>
          <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            Orders are prepared within 24 hours in our specialized facility and dispatched via express tracked courier with signature confirmation.
          </p>
        </div>

        <!-- Tab 4: Client Reviews -->
        <div v-if="activeTab === 'Client Reviews'" class="py-6">
          <h3 class="font-serif text-xl font-normal text-neutral-900 dark:text-white mb-4">
            Verified Client Reviews
          </h3>
          <div v-if="product.reviews && product.reviews.length > 0" class="grid gap-4 md:grid-cols-2">
            <div
              v-for="review in product.reviews"
              :key="`${review.reviewerEmail}-${review.date}`"
              class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60"
            >
              <div class="flex items-center justify-between">
                <span class="font-semibold text-neutral-900 dark:text-white">{{ review.reviewerName }}</span>
                <span class="text-xs font-semibold text-amber-500">★ {{ review.rating.toFixed(1) }} / 5</span>
              </div>
              <p class="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{{ review.comment }}</p>
            </div>
          </div>
          <p v-else class="text-xs text-neutral-400">No client reviews registered for this creation yet.</p>
        </div>
      </div>
    </article>

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
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ToastNotification from '@/components/products/ToastNotification.vue';
import { fetchProductById } from '@/lib/dummyJsonApi';
import { discountedPrice, formatCategoryLabel, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const errorMessage = ref<string | null>(null);
const activeImage = ref('');
const quantity = ref(1);
const activeTab = ref('The Craft & Details');

// Toast Notification State
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

const imageChoices = computed(() => {
  if (!product.value) return [];
  return product.value.images.length > 0 ? product.value.images : [product.value.thumbnail];
});

const finalPrice = computed(() => {
  if (!product.value) return 0;
  return discountedPrice(product.value.price, product.value.discountPercentage);
});

const formattedCategory = computed(() => {
  if (!product.value) return '';
  return formatCategoryLabel(product.value.category);
});

const isWishlist = computed(() => {
  return product.value ? wishlistStore.isInWishlist(product.value.id) : false;
});

async function loadDetail(productId: number): Promise<void> {
  loading.value = true;
  errorMessage.value = null;

  try {
    const response = await fetchProductById(productId);
    product.value = response;
    activeImage.value = response.images[0] ?? response.thumbnail;
    quantity.value = 1;
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Could not retrieve product details right now.';
  } finally {
    loading.value = false;
  }
}

function onAddToCart(): void {
  if (!product.value) return;
  cartStore.addItem(product.value, quantity.value);
  triggerToast({
    title: 'Added to Bag',
    message: `${product.value.title} (${quantity.value} ${quantity.value > 1 ? 'items' : 'item'})`,
    thumbnail: product.value.thumbnail,
    actionLabel: 'View Bag',
    actionRoute: '/cart'
  });
}

function toggleWishlist(): void {
  if (!product.value) return;
  const added = wishlistStore.toggleWishlist(product.value);
  triggerToast({
    title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
    message: product.value.title,
    thumbnail: product.value.thumbnail,
    actionLabel: added ? 'View Wishlist' : undefined,
    actionRoute: added ? '/wishlist' : undefined
  });
}

function goBack(): void {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  void router.push('/');
}

watch(
  () => route.params.id,
  (param) => {
    const id = Number(param);
    if (Number.isNaN(id)) {
      errorMessage.value = 'Invalid product identifier.';
      loading.value = false;
      return;
    }
    void loadDetail(id);
  },
  { immediate: true }
);
</script>
