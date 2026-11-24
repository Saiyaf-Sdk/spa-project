import { computed } from 'vue';
import { defineStore } from 'pinia';
import { session, updateSession } from '@/lib/session';
import type { Product } from '@/types/product';

export const useCartStore = defineStore('cart', () => {
  const items = computed(() => session.value.cart);
  const change = (body: unknown) => updateSession('/cart', body);
  return {
    items,
    itemCount: computed(() => items.value.reduce((sum, line) => sum + line.quantity, 0)),
    subtotal: computed(
      () =>
        items.value.reduce((sum, line) => sum + Math.round(line.price * 100) * line.quantity, 0) /
        100
    ),
    addItem: (product: Product, quantity = 1) => change({ productId: product.id, delta: quantity }),
    addSaved: () => change({ allSaved: true }),
    increase: (productId: number) => change({ productId, delta: 1 }),
    decrease: (productId: number) => change({ productId, delta: -1 }),
    removeItem: (productId: number) => change({ productId, remove: true }),
    clear: () => change({ clear: true })
  };
});
