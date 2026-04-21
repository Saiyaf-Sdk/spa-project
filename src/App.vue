<script setup lang="ts">
import ProductCard from './components/ProductCard.vue'
import { ref, onMounted } from 'vue'

// create a variable to store products
const products = ref([])

// run this when app loads
onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <div>
    <h1>My Products</h1>

   <ProductCard 
  v-for="p in products" 
  :key="p.id" 
  :product="p" 
/>
  </div>
</template>
