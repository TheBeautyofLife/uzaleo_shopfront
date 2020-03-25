import Vue from 'vue'
import Router from 'vue-router'

const Shipping = () => import('@/Modules/shipping/index.shipping.vue')

Vue.use(Router)

export default [
  {
    path: '/shipping/',
    name: 'Shipping',
    component: Shipping,
    meta: {
      requiresAuth: true
    }
  }
]
