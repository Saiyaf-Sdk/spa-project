<template>
  <article class="perfume-card">
    <div class="card-photo" :class="'tone-' + product.id">
      <RouterLink :to="'/product/' + product.id" :aria-label="'View ' + product.title"
        ><img
          :src="product.images[0] || product.thumbnail"
          loading="lazy"
          :alt="product.title + ' perfume bottle'"
      /></RouterLink>
      <button
        class="heart-button"
        :aria-pressed="saved"
        :aria-label="
          (saved ? 'Remove ' : 'Save ') +
          product.title +
          (saved ? ' from wishlist' : ' to wishlist')
        "
        @click="toggle"
      >
        <Heart :fill="saved ? 'currentColor' : 'none'" />
      </button>
      <button class="quick-button" @click="dialog?.showModal()">
        Quick view <Plus :size="15" />
      </button>
    </div>
    <div class="card-copy">
      <p class="eyebrow">{{ product.brand }}</p>
      <RouterLink :to="'/product/' + product.id" class="card-name">{{ product.title }}</RouterLink>
      <p class="muted">{{ product.concentration }} · {{ product.sizeMl }} ml</p>
      <p class="card-price">{{ price }}</p>
    </div>
    <dialog
      ref="dialog"
      class="quick-dialog"
      :aria-label="product.title + ' quick view'"
      @click="dismissBackdrop"
    >
      <button class="dialog-close icon-btn" aria-label="Close quick view" @click="dialog?.close()">
        <X />
      </button>
      <div class="quick-layout">
        <div class="quick-image" :class="'tone-' + product.id">
          <img :src="product.images[0]" :alt="product.title" />
        </div>
        <div class="quick-copy">
          <p class="eyebrow">{{ product.brand }}</p>
          <h2>{{ product.title }}</h2>
          <p>{{ product.concentration }} · {{ product.sizeMl }} ml</p>
          <p>{{ product.notes.join(' · ') }}</p>
          <strong>{{ price }}</strong>
          <button class="btn primary" :disabled="!product.stock || busy" @click="add">
            {{ product.stock ? 'Add to bag' : 'Sold out' }} <ShoppingBag /></button
          ><RouterLink class="text-link" :to="'/product/' + product.id" @click="dialog?.close()"
            >Full perfume details <ArrowUpRight
          /></RouterLink>
        </div>
      </div>
    </dialog>
  </article>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Heart, Plus, X, ShoppingBag, ArrowUpRight } from '@lucide/vue';
import type { Product } from '@/types/product';
import { discountedPrice, formatCurrency } from '@/lib/format';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { announce } from '@/lib/notice';
const props = defineProps<{ product: Product }>();
const cart = useCartStore(),
  wishlist = useWishlistStore();
const dialog = ref<HTMLDialogElement | null>(null),
  busy = ref(false);
const saved = computed(() => wishlist.isInWishlist(props.product.id));
const price = computed(() =>
  formatCurrency(discountedPrice(props.product.price, props.product.discountPercentage))
);
function dismissBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) dialog.value?.close();
}
async function toggle() {
  const added = await wishlist.toggleWishlist(props.product);
  announce(added ? 'Perfume saved to your wishlist.' : 'Perfume removed from your wishlist.');
}
async function add() {
  if (busy.value) return;
  busy.value = true;
  try {
    await cart.addItem(props.product);
    dialog.value?.close();
    announce(props.product.title + ' added to your bag.');
  } finally {
    busy.value = false;
  }
}
</script>
