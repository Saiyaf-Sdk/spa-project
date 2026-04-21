<script setup lang="ts">
defineProps<{
  product: {
    id: number
    title: string
    price: number
  }
}>()
</script>

<template>
  <div style="border:1px solid gray; padding:10px; margin:10px;">
    <h3>{{ product.title }}</h3>
    <p>Price: {{ product.price }}</p>
  </div>
</template>
