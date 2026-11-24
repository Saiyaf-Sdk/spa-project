import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import CartView from '@/views/CartView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/CatalogView.vue'),
    alias: '/shop'
  },
  {
    path: '/scent-guide',
    name: 'scent-guide',
    component: () => import('@/views/ScentGuideView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/views/WishlistView.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    // Do not jump to top when only query parameters change (e.g. clicking categories or sub-categories)
    if (to.path === from.path) {
      return false;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

const pageTitles: Record<string, string> = {
  home: 'Perfume boutique',
  catalog: 'The collection',
  login: 'Your account',
  cart: 'Shopping bag',
  wishlist: 'Wishlist',
  orders: 'My orders',
  'scent-guide': 'Scent guide',
  'product-detail': 'Perfume',
  'not-found': 'Page not found'
};
router.afterEach((to) => {
  document.title = (pageTitles[String(to.name)] || 'Perfumes') + ' | Nebo Parfumerie';
});
export default router;
