<template>
  <section class="wrap page">
    <div class="section-head">
      <div>
        <p class="eyebrow">Your collection</p>
        <h1>Wishlist</h1>
        <p class="muted">The perfumes you’d like to come back to.</p>
      </div>
    </div>
    <div v-if="wishlist.items.length">
      <div class="result-line">
        <button class="text-link" @click="addAll">Add all to bag <ShoppingBag /></button
        ><button class="text-link" @click="wishlist.clearWishlist()">Clear wishlist</button>
      </div>
      <div class="product-grid">
        <ProductCard v-for="p in wishlist.items" :key="p.id" :product="p" />
      </div>
    </div>
    <div v-else class="empty">
      <Heart />
      <h2>Your wishlist is empty</h2>
      <p>Use the heart on a perfume to save it here.</p>
      <RouterLink class="btn primary" to="/catalog">Explore perfumes <ArrowRight /></RouterLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Heart, ArrowRight, ShoppingBag } from '@lucide/vue';
import ProductCard from '@/components/products/ProductCard.vue';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { announce } from '@/lib/notice';
const wishlist = useWishlistStore(),
  cart = useCartStore();
async function addAll() {
  await cart.addSaved();
  announce('Saved perfumes added to your bag.');
}
</script>
