import Vue from 'vue'
import Router from 'vue-router'

const Cart = () => import('@/Modules/Cart/index.cart.vue')
const Checkout = () => import('@/Modules/Checkout/index.checkout.vue')
const Payment = () => import('@/Modules/Payment/index.payment.vue')

Vue.use(Router)

export default [
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      requiresAuth: true,
      title: 'Cart',
      metaTags: [
        {
          name: 'description',
          content: 'Uzaleo eCommerce'
        },
        {
          property: 'og:description',
          content: 'Uzaleo eCommerce'
        }
      ]
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
