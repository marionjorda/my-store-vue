import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CartPage from '../pages/CartPage.vue'
import ProductSection from '../pages/ProductSection.vue'
const routes = [
  {
    path: '/',
    name: 'Hom',
    redirect :'/home',
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
  },
  {
    path: '/products/:id',
    name: 'products',
    component: ProductSection
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },

]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes
})



export default router
