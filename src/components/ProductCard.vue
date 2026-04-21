<script setup lang="ts">
// Product type
interface Product {
  id: number
  title: string
  price: number
}

// props
defineProps<{
  product: Product
}>()

// emit
const emit = defineEmits(['select'])
</script>

<template>
  <div 
    @click="emit('select', product)"
    class="border rounded p-4 shadow hover:shadow-lg cursor-pointer transition"
  >
    <h3 class="font-semibold text-lg">{{ product.title }}</h3>
    <p class="text-blue-600 font-bold">${{ product.price }}</p>
  </div>
</template>
