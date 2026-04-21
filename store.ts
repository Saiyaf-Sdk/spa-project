import { ref } from 'vue'

interface Product {
  id: number
  title: string
  price: number
}

const cart = ref<Product[]>([])

export function useCart() {
  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  return { cart, addToCart }
}
