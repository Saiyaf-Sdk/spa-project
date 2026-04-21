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
  <div class="p-6 max-w-5xl mx-auto">
    
    <h1 class="text-3xl font-bold mb-4">🛍️ My Products</h1>

    <input 
      v-model="search" 
      placeholder="Search products..." 
      class="border p-2 w-full mb-4 rounded"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard 
        v-for="p in filteredProducts" 
        :key="p.id" 
        :product="p" 
        @select="selectedProduct = $event"
      />
    </div>

    <!-- Detail View -->
    <div 
      v-if="selectedProduct" 
      class="border-2 p-4 mt-6 rounded shadow"
    >
      <h2 class="text-xl font-bold">{{ selectedProduct.title }}</h2>
      <p class="text-gray-600">Price: {{ selectedProduct.price }}</p>

      <button 
        @click="selectedProduct = null"
        class="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Close
      </button>
    </div>

  </div>
</template>
