<script setup lang="ts">
interface Product {
  id: number
  title: string
  price: number
}

defineProps<{
  product: Product
}>()
</script>

<template>
  <div style="border:1px solid gray; padding:10px; margin:10px;">
    <h3>{{ product.title }}</h3>
    <p>Price: {{ product.price }}</p>
  </div>
</template>
