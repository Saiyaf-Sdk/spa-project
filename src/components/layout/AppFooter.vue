<template>
  <footer class="mt-24 border-t border-neutral-200/80 bg-neutral-50 pt-16 pb-12 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Newsletter Card (Clean & Modern) -->
      <div class="mb-14 rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 sm:p-10">
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span class="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
              Private Newsletter
            </span>
            <h3 class="mt-1 font-serif text-2xl font-normal text-neutral-900 dark:text-white sm:text-3xl">
              Receive Salon Releases &amp; Private Previews
            </h3>
            <p class="mt-1 max-w-lg text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Subscribe to receive exclusive invitations to private releases, limited trunk shows, and bespoke horology exhibitions.
            </p>
          </div>

          <div>
            <form class="flex gap-2" @submit.prevent="onNewsletterSubmit">
              <input
                v-model="newsletterEmail"
                type="email"
                required
                placeholder="Enter your email address..."
                class="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
              <button
                class="flex-shrink-0 rounded-full bg-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                type="submit"
              >
                Join
              </button>
            </form>
            <p v-if="subscribed" class="mt-2 text-xs font-medium text-emerald-600">
              ✓ Welcome to the Maison Lumen newsletter.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Footer Columns -->
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Col 1: Brand -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
              <span class="font-brand text-xs font-bold">LM</span>
            </div>
            <div class="flex flex-col">
              <span class="font-brand text-base font-bold tracking-[0.2em] text-neutral-900 dark:text-white">
                LUMEN
              </span>
              <span class="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Haute Maison
              </span>
            </div>
          </div>
          <p class="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            Curating fine horology, artisan fragrance, and bespoke luxury goods.
            Prices presented in USD &amp; LKR.
          </p>
        </div>

        <!-- Col 2: Boutiques -->
        <div>
          <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white">
            Global Salons
          </h4>
          <ul class="mt-4 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <li>Paris: 14 Place Vendôme</li>
            <li>Genève: 42 Rue du Rhône</li>
            <li>Milano: Via Montenapoleone 8</li>
            <li>New York: 740 Madison Avenue</li>
            <li>Colombo: Galle Face Atelier</li>
          </ul>
        </div>

        <!-- Col 3: Links -->
        <div>
          <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white">
            Navigation
          </h4>
          <ul class="mt-4 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <li>
              <RouterLink to="/" class="hover:text-neutral-900 dark:hover:text-white">
                The Atelier
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/catalog" class="hover:text-neutral-900 dark:hover:text-white">
                Salon Catalog
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/wishlist" class="hover:text-neutral-900 dark:hover:text-white">
                Private Wishlist
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cart" class="hover:text-neutral-900 dark:hover:text-white">
                Shopping Bag
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/login" class="hover:text-neutral-900 dark:hover:text-white">
                Client Portal
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Guarantees -->
        <div>
          <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white">
            Maison Standards
          </h4>
          <div class="mt-4 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
            <p>✓ 100% Certified Direct Provenance</p>
            <p>✓ Bespoke Gift Box Included</p>
            <p>✓ Tracked Courier Delivery</p>
            <p>✓ Dual USD &amp; LKR Settlement</p>
          </div>
        </div>
      </div>

      <!-- Bottom Credits -->
      <div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200/80 pt-8 text-[11px] text-neutral-400 sm:flex-row dark:border-neutral-800">
        <p>&copy; {{ year }} LUMEN MAISON. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <span>Paris</span>
          <span>•</span>
          <span>Genève</span>
          <span>•</span>
          <span>Milano</span>
          <span>•</span>
          <span>New York</span>
          <span>•</span>
          <span>Colombo</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear();
const newsletterEmail = ref('');
const subscribed = ref(false);

function onNewsletterSubmit(): void {
  if (newsletterEmail.value) {
    subscribed.value = true;
    newsletterEmail.value = '';
    setTimeout(() => {
      subscribed.value = false;
    }, 4000);
  }
}
</script>
