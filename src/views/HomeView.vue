<template>
  <section class="campaign">
    <div class="campaign-copy">
      <div class="hero-inner">
        <p class="eyebrow"><span class="dash"></span> The fragrance edit</p>
        <h1>A wardrobe<br /><em>of scent.</em></h1>
        <p class="lede">
          Discover fine perfumes through the notes that move you, from luminous white florals to the
          warmth of amber.
        </p>
        <RouterLink class="btn primary" to="/catalog">Explore perfumes <ArrowRight /></RouterLink>
      </div>
    </div>
    <div class="campaign-photo">
      <img
        src="/editorial/hero.jpg"
        fetchpriority="high"
        width="1536"
        height="1024"
        alt="An amber Nebo perfume flacon in afternoon light on travertine and silk"
      />
    </div>
  </section>
  <section class="wrap home-edit">
    <div class="section-head">
      <div>
        <p class="eyebrow">Selected by Nebo</p>
        <h2>The signature edit</h2>
      </div>
      <RouterLink class="text-link" to="/catalog">View all perfumes <ArrowUpRight /></RouterLink>
    </div>
    <p v-if="errorMessage" class="inline-status" role="alert">
      {{ errorMessage }} <button class="text-link" @click="loadProducts(true)">Retry</button>
    </p>
    <p v-else-if="isLoading" role="status">Loading perfumes…</p>
    <div v-else class="product-grid">
      <ProductCard v-for="p in edit" :key="p.id" :product="p" />
    </div>
  </section>
  <section class="guide-invite">
    <div class="wrap guide-invite-inner">
      <div>
        <p class="eyebrow">The scent guide</p>
        <h2>Follow your <em>nose.</em></h2>
      </div>
      <div>
        <p>
          Start with a note you already love. Explore the families behind the collection and find a
          perfume to try.
        </p>
        <RouterLink class="text-link" to="/scent-guide"
          >Explore the scent guide <ArrowRight
        /></RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ArrowRight, ArrowUpRight } from '@lucide/vue';
import ProductCard from '@/components/products/ProductCard.vue';
import { useProducts } from '@/composables/useProducts';
const { products, isLoading, errorMessage, loadProducts } = useProducts();
const edit = computed(() =>
  [7, 8, 10, 6].flatMap((id) => products.value.filter((p) => p.id === id))
);
onMounted(() => loadProducts());
</script>
