import { computed, ref } from 'vue';
import { fetchCategories, fetchProducts } from '@/lib/dummyJsonApi';
import { formatCategoryLabel } from '@/lib/format';
import type { Product } from '@/types/product';

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
let loaded = false;

// Categories that do not belong in an ultra-luxury boutique
const EXCLUDED_CATEGORIES = new Set([
  'groceries',
  'kitchen-accessories',
  'motorcycle',
  'vehicle',
  'sports-accessories'
]);

// Specific keywords to exclude (onions, lunch boxes, pet food, etc.)
const EXCLUDED_KEYWORDS = [
  'onion',
  'lunch box',
  'lunchbox',
  'dog food',
  'cat food',
  'sponge',
  'chopping board',
  'potato',
  'apple',
  'cucumber',
  'egg',
  'chicken',
  'beef steak',
  'meat',
  'grocery',
  'detergent'
];

function isLuxuryProduct(product: Product): boolean {
  if (EXCLUDED_CATEGORIES.has(product.category)) {
    return false;
  }

  const titleLower = product.title.toLowerCase();
  const descLower = product.description.toLowerCase();

  for (const keyword of EXCLUDED_KEYWORDS) {
    if (titleLower.includes(keyword) || descLower.includes(keyword)) {
      return false;
    }
  }

  return true;
}

function toMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading products.';
}

function deriveCategories(source: Product[]): string[] {
  const rawCategories = source.map((product) => product.category);
  const unique = [...new Set(rawCategories)].filter((c) => !EXCLUDED_CATEGORIES.has(c));
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
      const rawProductList = await fetchProducts();
      // Filter out unwanted groceries, lunchboxes, and utilitarian items
      const curatedProductList = rawProductList.filter(isLuxuryProduct);
      products.value = curatedProductList;

      const endpointCategories = await fetchCategories().catch(() => []);
      const sourceCategories =
        endpointCategories.length > 0
          ? [...new Set(endpointCategories)].filter((c) => !EXCLUDED_CATEGORIES.has(c))
          : deriveCategories(curatedProductList);

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
