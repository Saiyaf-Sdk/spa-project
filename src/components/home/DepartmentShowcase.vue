<template>
  <section id="categories" class="mb-16 scroll-mt-24">
    <div class="mb-8 text-center">
      <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
        Curated Departments
      </span>
      <h2 class="mt-1 font-serif text-3xl font-light tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        Explore The Maison
      </h2>
      <p class="mx-auto mt-2 max-w-md text-xs text-neutral-500 dark:text-neutral-400">
        Select a luxury department to view our dedicated private catalog and limited salon releases.
      </p>
    </div>

    <!-- 4-Card Luxury Department Showcase -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="dept in departments"
        :key="dept.categoryKey"
        class="group relative h-80 cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
        @click="emit('select-category', dept.categoryKey)"
      >
        <!-- Background Imagery -->
        <img
          :src="dept.image"
          :alt="dept.title"
          class="h-full w-full object-cover object-center opacity-70 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
        />

        <!-- Dark Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        <!-- Card Content -->
        <div class="absolute inset-0 flex flex-col justify-between p-6">
          <div class="flex justify-end">
            <span class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-neutral-950">
              Department
            </span>
          </div>

          <div class="space-y-1">
            <p class="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
              {{ dept.subtitle }}
            </p>
            <h3 class="font-serif text-2xl font-normal text-white">
              {{ dept.title }}
            </h3>
            <p class="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors group-hover:text-gold-300">
              <span>View Department</span>
              <svg class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'select-category', categoryKey: string): void;
}>();

const departments = [
  {
    title: 'Fine Fragrance',
    subtitle: 'Haute Parfumerie',
    categoryKey: 'fragrances',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Haute Horlogerie',
    subtitle: 'Master Timepieces',
    categoryKey: 'mens-watches',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Skin & Elixirs',
    subtitle: 'Cellular Care',
    categoryKey: 'skin-care',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Rare Accessories',
    subtitle: 'Eyewear & Leather',
    categoryKey: 'sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
  }
];
</script>
