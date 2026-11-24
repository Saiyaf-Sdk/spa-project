import { ref } from 'vue';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/types/product';

const products = ref<Product[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
let loaded = false;

function toMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading products.';
}

export function useProducts() {
  async function loadProducts(force = false): Promise<void> {
    if (loaded && !force) {
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;

    try {
      products.value = await fetchProducts();

      loaded = true;
    } catch (error: unknown) {
      errorMessage.value = toMessage(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    isLoading,
    errorMessage,
    loadProducts
  };
}
