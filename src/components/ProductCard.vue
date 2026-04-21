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
    class="border rounded p-4 shadow hover:shadow-lg cursor-pointer transition"
  >
    <h3 class="font-semibold text-lg">{{ product.title }}</h3>
    <p class="text-blue-600 font-bold">${{ product.price }}</p>
  </div>
</template>
