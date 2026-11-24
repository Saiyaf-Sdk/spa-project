<template>
  <section class="wrap page">
    <div class="page-heading">
      <p class="eyebrow">Nebo parfumerie</p>
      <h1>The collection</h1>
      <p>Explore every perfume by house, scent family, or a note you love.</p>
    </div>
    <div class="catalog-tools">
      <div class="search-field">
        <Search /><input
          ref="input"
          aria-label="Search perfumes"
          placeholder="Search perfumes, houses or notes"
          :value="query"
          @input="update('q', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <label
        >Family
        <select
          aria-label="Scent family"
          :value="family"
          @change="update('family', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All families</option>
          <option v-for="f in families" :key="f">{{ f }}</option>
        </select></label
      >
      <label
        >Sort
        <select
          aria-label="Sort perfumes"
          :value="sort"
          @change="update('sort', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Featured</option>
          <option value="low">Price, low to high</option>
          <option value="high">Price, high to low</option>
          <option value="name">Name, A–Z</option>
        </select></label
      >
    </div>
    <p v-if="errorMessage" role="alert">
      {{ errorMessage }} <button class="text-link" @click="loadProducts(true)">Retry</button>
    </p>
    <p v-else-if="isLoading" role="status">Loading perfumes…</p>
    <template v-else
      ><div class="result-line">
        <span>{{ filtered.length }} {{ filtered.length === 1 ? 'perfume' : 'perfumes' }}</span
        ><button
          v-if="query || family || sort"
          class="text-link"
          @click="router.replace('/catalog')"
        >
          Reset filters
        </button>
      </div>
      <div v-if="filtered.length" class="product-grid">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
      </div>
      <div v-else class="empty">
        <h2>No perfumes found</h2>
        <p>Try a different note, house, or scent family.</p>
      </div></template
    >
  </section>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@lucide/vue';
import { useProducts } from '@/composables/useProducts';
import ProductCard from '@/components/products/ProductCard.vue';
import { discountedPrice } from '@/lib/format';
const { products, isLoading, errorMessage, loadProducts } = useProducts();
const route = useRoute(),
  router = useRouter(),
  input = ref<HTMLInputElement | null>(null);
const query = computed(() => String(route.query.q || '')),
  family = computed(() => String(route.query.family || '')),
  sort = computed(() => String(route.query.sort || ''));
const families = computed(() => [...new Set(products.value.map((p) => p.family))].sort());
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  const result = products.value.filter(
    (p) =>
      (!family.value || p.family === family.value) &&
      [p.title, p.brand, p.family, ...p.notes].join(' ').toLowerCase().includes(q)
  );
  if (sort.value === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
  if (['low', 'high'].includes(sort.value))
    result.sort(
      (a, b) =>
        (sort.value === 'low' ? 1 : -1) *
        (discountedPrice(a.price, a.discountPercentage) -
          discountedPrice(b.price, b.discountPercentage))
    );
  return result;
});
function update(key: string, value: string) {
  void router.replace({ query: { ...route.query, [key]: value || undefined } });
}
watch(
  () => route.query.search,
  async (value) => {
    if (value) {
      await nextTick();
      input.value?.focus();
    }
  },
  { immediate: true }
);
onMounted(() => loadProducts());
</script>
