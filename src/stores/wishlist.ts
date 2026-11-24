import { computed } from 'vue';
import { defineStore } from 'pinia';
import { session, updateSession } from '@/lib/session';
import type { Product } from '@/types/product';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = computed(() => session.value.wishlist);
  const isInWishlist = (id: number) => items.value.some((product) => product.id === id);
  async function toggleWishlist(product: Product) {
    const saved = !isInWishlist(product.id);
    await updateSession('/wishlist', { productId: product.id, saved });
    return saved;
  }
  return {
    items,
    itemCount: computed(() => items.value.length),
    isInWishlist,
    toggleWishlist,
    removeItem: (productId: number) => updateSession('/wishlist', { productId, saved: false }),
    clearWishlist: () => updateSession('/wishlist', { clear: true })
  };
});
