import { ref } from 'vue';
import { request } from './api';
import { loadJson } from './storage';
import type { CartLine } from '@/types/cart';
import type { Product } from '@/types/product';
import type { User } from '@/types/auth';

export interface ShoppingState {
  shopper: number;
  user: User | null;
  cart: CartLine[];
  wishlist: Product[];
}

export const session = ref<ShoppingState>({ shopper: 0, user: null, cart: [], wishlist: [] });
export const storeError = ref('');
let pending = Promise.resolve();

export function inOrder<T>(action: () => Promise<T>): Promise<T> {
  const next = pending.then(action);
  pending = next.then(
    () => {},
    () => {}
  );
  return next;
}

export const refreshSession = async () => {
  session.value = await request<ShoppingState>('/session');
};

export function updateSession(path: string, body: unknown) {
  const shopper = session.value.shopper;
  return inOrder(async () => {
    session.value = await request<ShoppingState>(path, body, shopper);
  });
}

export async function initialize() {
  await refreshSession();
  // Import bags and favourites saved by the original browser-only storefront.
  const cart = loadJson<CartLine[]>('lumen-cart-items');
  const wishlist = loadJson<Product[]>('lumen_wishlist_items');
  if ((Array.isArray(cart) && cart.length) || (Array.isArray(wishlist) && wishlist.length)) {
    const key = localStorage.getItem('lumen-import') || newRequestKey();
    localStorage.setItem('lumen-import', key);
    await updateSession('/session/import', {
      key,
      cart: Array.isArray(cart)
        ? cart.filter(Boolean).map(({ productId, quantity }) => ({ productId, quantity }))
        : [],
      wishlist: Array.isArray(wishlist) ? wishlist.filter(Boolean).map((item) => item.id) : []
    });
  }
  for (const key of ['lumen-cart-items', 'lumen_wishlist_items', 'lumen-import', 'lumen-cart-auth'])
    localStorage.removeItem(key);
}

export function newRequestKey() {
  // getRandomValues also works when demonstrating the app over a local network.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20)
  ].join('-');
}
