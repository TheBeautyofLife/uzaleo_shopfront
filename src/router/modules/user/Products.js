import Vue from 'vue'
import Router from 'vue-router'

const Cart = () => import('@/views/Cart/Cart.vue')
const Checkout = () => import('@/views/Checkout/Checkout.vue')
const Payment = () => import('@/views/Checkout/Payment.vue')
const ProductId = () => import('@/views/Product/id/id.vue')

Vue.use(Router)

export default [
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      refresh: false,
      requiresAuth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductId,
    meta: {
      refresh: true,
      requiresAuth: false
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/checkout/payment',
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true
    }
  }
]
