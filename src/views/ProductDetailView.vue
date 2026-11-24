<template>
  <section class="wrap page detail-page">
    <RouterLink class="text-link back" to="/catalog"><ArrowLeft /> All perfumes</RouterLink>
    <p v-if="loading" role="status">Opening perfume…</p>
    <div v-else-if="error" class="empty" role="alert">
      <h1>Perfume unavailable</h1>
      <p>{{ error }}</p>
      <RouterLink to="/catalog" class="btn primary">Explore the collection</RouterLink>
    </div>
    <div v-else-if="product" class="detail-grid">
      <div>
        <div class="detail-photo" :class="'tone-' + product.id">
          <img :src="selectedImage" :alt="product.title + ' gallery image'" />
        </div>
        <div v-if="product.images.length > 1" class="thumbs">
          <button
            v-for="(img, i) in product.images"
            :key="img"
            :aria-label="'View image ' + (i + 1)"
            :aria-pressed="selectedImage === img"
            @click="selectedImage = img"
          >
            <img :src="img" alt="" />
          </button>
        </div>
      </div>
      <div class="detail-copy">
        <p class="eyebrow">{{ product.brand }}</p>
        <h1>{{ product.title }}</h1>
        <p class="subtitle">{{ product.concentration }} · {{ product.sizeMl }} ml</p>
        <p class="detail-description">{{ product.description }}</p>
        <dl class="spec-list">
          <div>
            <dt>Scent family</dt>
            <dd>
              <RouterLink
                :to="{ path: '/catalog', query: { family: product.family } }"
                class="text-link"
                >{{ product.family }} <ArrowUpRight
              /></RouterLink>
            </dd>
          </div>
          <div>
            <dt>Signature notes</dt>
            <dd>{{ product.notes.join(' · ') }}</dd>
          </div>
        </dl>
        <div class="price-row">
          <strong>{{ formatCurrency(price) }}</strong
          ><span class="muted">{{ formatCurrencyLKR(price) }} est.</span>
        </div>
        <div class="purchase">
          <div class="stepper">
            <button aria-label="Decrease quantity" :disabled="quantity <= 1" @click="quantity--">
              −</button
            ><span>{{ quantity }}</span
            ><button
              aria-label="Increase quantity"
              :disabled="quantity >= product.stock"
              @click="quantity++"
            >
              +
            </button>
          </div>
          <button class="btn primary" :disabled="busy || !product.stock" @click="add">
            {{ product.stock ? 'Add to bag' : 'Sold out' }} <ShoppingBag />
          </button>
        </div>
        <button class="text-link save-line" :aria-pressed="saved" @click="toggle">
          <Heart :fill="saved ? 'currentColor' : 'none'" />
          {{ saved ? 'Saved to wishlist' : 'Save to wishlist' }}
        </button>
        <details>
          <summary>Delivery &amp; gifting</summary>
          <p>
            Choose complimentary gift packaging in your bag. Delivery is $8.99, or complimentary on
            merchandise subtotals of $150 or more. Pay in USD on delivery.
          </p>
        </details>
        <a class="text-link source" :href="product.sourceUrl" target="_blank" rel="noopener"
          >Read the house’s fragrance notes <ArrowUpRight
        /></a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, ArrowUpRight, ShoppingBag, Heart } from '@lucide/vue';
import { fetchProductById } from '@/lib/api';
import { discountedPrice, formatCurrency, formatCurrencyLKR } from '@/lib/format';
import { announce } from '@/lib/notice';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types/product';
const route = useRoute(),
  cart = useCartStore(),
  wishlist = useWishlistStore();
const product = ref<Product | null>(null),
  loading = ref(true),
  error = ref(''),
  selectedImage = ref(''),
  quantity = ref(1),
  busy = ref(false);
const saved = computed(() => !!product.value && wishlist.isInWishlist(product.value.id));
const price = computed(() =>
  product.value ? discountedPrice(product.value.price, product.value.discountPercentage) : 0
);
watch(
  () => route.params.id,
  async (raw, _, onCleanup) => {
    let active = true;
    onCleanup(() => {
      active = false;
    });
    loading.value = true;
    error.value = '';
    product.value = null;
    try {
      const id = Number(raw);
      if (!Number.isSafeInteger(id) || id < 1)
        throw new Error('Choose a perfume from the current collection.');
      const result = await fetchProductById(id);
      if (active) {
        product.value = result;
        selectedImage.value = result.images[0] || result.thumbnail;
        quantity.value = 1;
        document.title = result.title + ' | Nebo Parfumerie';
      }
    } catch (e) {
      if (active) error.value = e instanceof Error ? e.message : 'Please try again.';
    } finally {
      if (active) loading.value = false;
    }
  },
  { immediate: true }
);
async function add() {
  const current = product.value;
  if (!current || busy.value) return;
  busy.value = true;
  try {
    await cart.addItem(current, quantity.value);
    announce(current.title + ' added to your bag.');
  } finally {
    busy.value = false;
  }
}
async function toggle() {
  if (product.value) {
    const added = await wishlist.toggleWishlist(product.value);
    announce(added ? 'Perfume saved to your wishlist.' : 'Perfume removed from your wishlist.');
  }
}
</script>
