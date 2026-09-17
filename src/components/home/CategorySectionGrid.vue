<template>
  <div class="space-y-20">
    <section
      v-for="section in curatedSections"
      :key="section.id"
      class="scroll-mt-24"
    >
      <!-- Section Header -->
      <div class="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-200/70 pb-5 sm:flex-row sm:items-end dark:border-neutral-800">
        <div>
          <span class="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
            {{ section.tag }}
          </span>
          <h2 class="mt-1 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {{ section.title }}
          </h2>
          <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {{ section.subtitle }}
          </p>
        </div>

        <button
          class="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-gold-600 dark:text-white dark:hover:text-gold-400"
          type="button"
          @click="emit('view-category', section.categoryKey)"
        >
          <span>Explore All {{ section.tag }}</span>
          <svg class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <!-- 4-Product Grid for this Category -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in section.items"
          :key="product.id"
          :product="product"
          @add-to-cart="emit('add-to-cart', $event)"
          @quick-view="emit('quick-view', $event)"
          @wishlist-toggled="(prod, isFav) => emit('wishlist-toggled', prod, isFav)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProductCard from '@/components/products/ProductCard.vue';
import type { Product } from '@/types/product';

const props = defineProps<{
  products: Product[];
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', product: Product): void;
  (event: 'quick-view', product: Product): void;
  (event: 'wishlist-toggled', product: Product, isFav: boolean): void;
  (event: 'view-category', categoryKey: string): void;
}>();

const curatedSections = computed(() => {
  // 1. Timepieces (mens-watches + womens-watches)
  const watches = props.products.filter(
    (p) => p.category === 'mens-watches' || p.category === 'womens-watches'
  ).slice(0, 4);

  // 2. Parfumerie (fragrances)
  const fragrances = props.products.filter(
    (p) => p.category === 'fragrances'
  ).slice(0, 4);

  // 3. Beauty & Skincare (beauty + skin-care)
  const skincare = props.products.filter(
    (p) => p.category === 'skin-care' || p.category === 'beauty'
  ).slice(0, 4);

  // 4. Luxury Bags & Accessories (womens-bags + sunglasses + jewellery)
  const accessories = props.products.filter(
    (p) => p.category === 'womens-bags' || p.category === 'sunglasses' || p.category === 'womens-jewellery'
  ).slice(0, 4);

  const sections = [];

  if (watches.length > 0) {
    sections.push({
      id: 'watches',
      tag: 'Haute Horlogerie',
      title: 'Master Timepieces & Chronometers',
      subtitle: 'Precision movements, gold accents, and certified Swiss watchmaking provenance.',
      categoryKey: 'mens-watches',
      items: watches
    });
  }

  if (fragrances.length > 0) {
    sections.push({
      id: 'fragrance',
      tag: 'Haute Parfumerie',
      title: 'Rare Fragrances & Extrait de Parfum',
      subtitle: 'Artisanal scents curated with rare botanicals, warm oud, and pure crystal flacons.',
      categoryKey: 'fragrances',
      items: fragrances
    });
  }

  if (skincare.length > 0) {
    sections.push({
      id: 'skincare',
      tag: 'Cellular Care',
      title: 'Beauty Elixirs & Restorative Skincare',
      subtitle: 'Clinically formulated luxury treatments, anti-aging serums, and radiant elixirs.',
      categoryKey: 'skin-care',
      items: skincare
    });
  }

  if (accessories.length > 0) {
    sections.push({
      id: 'accessories',
      tag: 'Rare Accessories',
      title: 'Designer Leather & Luxury Eyewear',
      subtitle: 'Handcrafted leather bags, architectural sunglasses, and bespoke jewellery.',
      categoryKey: 'womens-bags',
      items: accessories
    });
  }

  return sections;
});
</script>
