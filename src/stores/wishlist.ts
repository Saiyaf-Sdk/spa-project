import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { loadJson, saveJson } from '@/lib/storage';
import type { Product } from '@/types/product';

const WISHLIST_STORAGE_KEY = 'lumen_wishlist_items';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>(loadJson<Product[]>(WISHLIST_STORAGE_KEY) ?? []);

  function persist(): void {
    saveJson(WISHLIST_STORAGE_KEY, items.value);
  }

  function isInWishlist(productId: number): boolean {
    return items.value.some((item) => item.id === productId);
  }

  function toggleWishlist(product: Product): boolean {
    const index = items.value.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      items.value.splice(index, 1);
      persist();
      return false;
    }

    items.value.push(product);
    persist();
    return true;
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((item) => item.id !== productId);
    persist();
  }

  function clearWishlist(): void {
    items.value = [];
    persist();
  }

  const itemCount = computed(() => items.value.length);

  return {
    items,
    itemCount,
    isInWishlist,
    toggleWishlist,
    removeItem,
    clearWishlist
  };
});
