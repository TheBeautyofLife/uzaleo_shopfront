import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      refresh: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Product/id/id.vue'),
    props: true
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.refresh && from.name !== null) {
    window.location.href = to.path
    return
  }
  // If we are leaving a page that required a refresh
  if (from.meta.refresh) {
    window.location.href = to.path
    return
  }
  next()
})
export default router
