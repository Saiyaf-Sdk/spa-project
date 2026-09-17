<template>
  <section class="relative mb-16 overflow-hidden rounded-3xl bg-neutral-950 text-white shadow-2xl">
    <!-- Background Image with Editorial Vignette Gradient -->
    <div class="absolute inset-0">
      <img
        src="/luxury-hero.jpg"
        alt="Lumen Maison Haute Horlogerie"
        class="h-full w-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
      />
      <!-- Luxury Dark Vignette Gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28 lg:py-36">
      <div class="max-w-2xl space-y-6">
        <!-- Discreet Prestige Badge -->
        <div class="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-neutral-900/60 px-4 py-1.5 backdrop-blur-md">
          <span class="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span class="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">
            Maison Lumen • Private Salon 2026
          </span>
        </div>

        <!-- Grand Editorial Headline -->
        <h1 class="font-serif text-4xl font-light leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          Timeless Elegance, <br />
          <span class="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-amber-200">
            Crafted for Connoisseurs.
          </span>
        </h1>

        <!-- Narrative Description -->
        <p class="font-sans text-sm font-normal leading-relaxed text-neutral-300 sm:text-base sm:max-w-xl">
          Immerse yourself in our private reserve of master-crafted Swiss timepieces, fine fragrance,
          and bespoke lifestyle creations — hand-selected with unmatched authenticity.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <RouterLink
            to="/catalog"
            class="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold tracking-widest text-neutral-950 uppercase transition-all duration-300 hover:bg-gold-400 hover:text-neutral-950 hover:shadow-lg"
          >
            Explore The Collection
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </RouterLink>

          <a
            href="#categories"
            class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-white/10 hover:text-gold-300"
          >
            Shop By Department
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Pillars Banner (Discreet & Clean) -->
    <div class="relative z-10 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div class="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 py-5 text-center sm:grid-cols-4">
        <div class="px-4 py-2">
          <p class="font-serif text-sm font-semibold text-white">100% Certified Authentic</p>
          <p class="text-[11px] text-neutral-400">Guaranteed provenance</p>
        </div>
        <div class="px-4 py-2">
          <p class="font-serif text-sm font-semibold text-white">Bespoke Silk Packaging</p>
          <p class="text-[11px] text-neutral-400">Complimentary gift box</p>
        </div>
        <div class="px-4 py-2">
          <p class="font-serif text-sm font-semibold text-white">White-Glove Courier</p>
          <p class="text-[11px] text-neutral-400">Insured worldwide transit</p>
        </div>
        <div class="px-4 py-2">
          <p class="font-serif text-sm font-semibold text-white">Private Concierge</p>
          <p class="text-[11px] text-neutral-400">Personal advisor support</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  totalProducts: number;
  categoryCount: number;
}>();
</script>
