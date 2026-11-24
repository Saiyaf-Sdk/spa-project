<template>
  <div class="ribbon">Complimentary delivery on orders of $150 or more</div>
  <header class="masthead">
    <div class="wrap mast-inner">
      <nav class="primary-links" aria-label="Main navigation">
        <RouterLink to="/catalog">Perfumes</RouterLink>
        <RouterLink to="/scent-guide">Scent guide</RouterLink>
      </nav>
      <RouterLink to="/" class="wordmark" aria-label="Nebo Parfumerie home"
        ><span>NEBO</span><small>PARFUMERIE</small></RouterLink
      >
      <nav class="tools" aria-label="Shopping navigation">
        <RouterLink
          :to="{ path: '/catalog', query: { search: '1' } }"
          aria-label="Search perfumes"
          title="Search perfumes"
          ><Search
        /></RouterLink>
        <RouterLink
          :to="auth.isAuthenticated ? '/orders' : '/login'"
          aria-label="My account"
          title="My account"
          ><UserRound
        /></RouterLink>
        <RouterLink
          to="/wishlist"
          :aria-label="'Wishlist, ' + wishlist.itemCount + ' saved'"
          title="Wishlist"
          ><Heart /><i v-if="wishlist.itemCount" class="dot"></i
        ></RouterLink>
        <RouterLink
          to="/cart"
          :aria-label="'Shopping bag, ' + cart.itemCount + ' items'"
          title="Shopping bag"
          ><ShoppingBag /><span class="bag-count">{{ cart.itemCount }}</span></RouterLink
        >
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Search, UserRound, Heart, ShoppingBag } from '@lucide/vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
const auth = useAuthStore();
const cart = useCartStore();
const wishlist = useWishlistStore();
</script>
