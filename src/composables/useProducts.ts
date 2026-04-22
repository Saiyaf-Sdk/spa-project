import { computed, ref } from 'vue';
import { fetchCategories, fetchProducts } from '@/lib/dummyJsonApi';
import { formatCategoryLabel } from '@/lib/format';
import type { Product } from '@/types/product';

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
let loaded = false;

function toMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading products.';
}

function deriveCategories(source: Product[]): string[] {
  const rawCategories = source.map((product) => product.category);
  const unique = [...new Set(rawCategories)];
  return unique.sort((a, b) => formatCategoryLabel(a).localeCompare(formatCategoryLabel(b)));
}

export function useProducts() {
  async function loadProducts(force = false): Promise<void> {
    if (loaded && !force) {
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;

    try {
      const productList = await fetchProducts();
      products.value = productList;

      const endpointCategories = await fetchCategories().catch(() => []);
      const sourceCategories =
        endpointCategories.length > 0
          ? [...new Set(endpointCategories)]
          : deriveCategories(productList);
      categories.value = sourceCategories.sort((a, b) =>
        formatCategoryLabel(a).localeCompare(formatCategoryLabel(b))
      );

      loaded = true;
    } catch (error: unknown) {
      errorMessage.value = toMessage(error);
    } finally {
      isLoading.value = false;
    }
  }

  const productCount = computed(() => products.value.length);

  return {
    products,
    categories,
    isLoading,
    errorMessage,
    productCount,
    loadProducts
  };
}
