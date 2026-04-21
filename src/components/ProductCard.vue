<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const search = ref('')
const filteredProducts = computed(() => {
  return products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
interface Product {
  id: number
  title: string
  price: number
}
import ProductCard from './components/ProductCard.vue'
import { ref, onMounted } from 'vue'

// create a variable to store products
const products = ref<Product[]>([])

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

    <input v-model="search" placeholder="Search products..." />

    <ProductCard 
      v-for="p in filteredProducts" 
      :key="p.id" 
      :product="p" 
      @select="selectedProduct = $event"
    />
    <div v-if="selectedProduct" style="border:2px solid black; padding:20px; margin-top:20px;">
      <h2>{{ selectedProduct.title }}</h2>
      <p>Price: {{ selectedProduct.price }}</p>

      <button @click="selectedProduct = null">Close</button>
    </div>

  </div>
</template>
