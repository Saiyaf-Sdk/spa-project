<template>
  <section class="wrap page guide-page">
    <div class="page-heading">
      <p class="eyebrow">The Nebo scent guide</p>
      <h1>Find your <em>notes.</em></h1>
      <p>
        A scent family is a starting point. Choose a texture or a mood, then follow it into the
        collection.
      </p>
    </div>
    <p v-if="errorMessage" role="alert">
      {{ errorMessage }} <button class="text-link" @click="loadProducts(true)">Retry</button>
    </p>
    <p v-else-if="isLoading" role="status">Loading the guide…</p>
    <div class="family-grid">
      <article v-for="family in families" :key="family.name" class="family-card">
        <component :is="descriptions[family.name]?.icon || Flower2" :size="32" :stroke-width="1" />
        <h2>{{ family.name }}</h2>
        <p>
          {{
            descriptions[family.name]?.text ||
            'Explore the notes that give these perfumes their character.'
          }}
        </p>
        <p class="guide-notes">{{ family.notes.join(' · ') }}</p>
        <RouterLink class="text-link" :to="{ path: '/catalog', query: { family: family.name } }"
          >Explore {{ family.name.toLowerCase() }} perfumes <ArrowUpRight
        /></RouterLink>
      </article>
    </div>
    <section class="guide-reading">
      <p class="eyebrow">At the counter</p>
      <h2>How to try a perfume</h2>
      <div class="reading-grid">
        <div>
          <h3>Start on paper</h3>
          <p>
            Try one scent on each blotter and write down its name. Compare the opening notes before
            choosing one to wear.
          </p>
        </div>
        <div>
          <h3>Give it time</h3>
          <p>
            Revisit your favourite as it dries. A bright opening can settle into flowers, woods, or
            a softer trail.
          </p>
        </div>
        <div>
          <h3>Keep a shortlist</h3>
          <p>
            Save the perfumes that catch your attention. Your wishlist keeps their notes together
            for another look.
          </p>
        </div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Flower2, Leaf, Sun, Cherry, ArrowUpRight } from '@lucide/vue';
import { useProducts } from '@/composables/useProducts';
const { products, loadProducts, isLoading, errorMessage } = useProducts();
const descriptions: Record<string, { icon: typeof Flower2; text: string }> = {
  Fresh: {
    icon: Leaf,
    text: 'For the feeling of a clean shirt on a bright morning. Citrus and green notes give these scents a light, crisp opening.'
  },
  Amber: {
    icon: Sun,
    text: 'Look here for warmth and depth. Luminous top notes give way to a richer, more enveloping base.'
  },
  Floral: {
    icon: Flower2,
    text: 'Petals take the lead. White flowers can feel creamy and expansive, while rose brings a different kind of softness.'
  },
  'Fruity floral': {
    icon: Cherry,
    text: 'Juicy fruit meets soft petals. This is a good place to begin if you enjoy a bright, sunlit sweetness.'
  }
};
const families = computed(() =>
  [...new Set(products.value.map((p) => p.family))]
    .sort()
    .map((name) => ({ name, notes: products.value.find((p) => p.family === name)!.notes }))
);
onMounted(() => loadProducts());
</script>
