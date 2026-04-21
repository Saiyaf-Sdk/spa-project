<script setup lang="ts">
const emit = defineEmits(['select'])
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
  <div 
  @click="$emit('select', product)" 
  style="border:1px solid gray; padding:10px; margin:10px; cursor:pointer;"
>
    <h3>{{ product.title }}</h3>
    <p>Price: {{ product.price }}</p>
  </div>
</template>
