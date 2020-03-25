import Vue from 'vue'
import Router from 'vue-router'

const Orders = () => import('@/Modules/orders/index.orders.vue')
const OrderId = () => import('@/Modules/orders/id/id.orders.vue')

Vue.use(Router)

export default [
  {
    path: '/orders/',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/:id',
    name: 'OrderId',
    component: OrderId,
    meta: {
      requiresAuth: true
    }
  }
]
