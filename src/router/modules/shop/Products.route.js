/**
 * Shop Router
 */
import Vue from 'vue'
import Router from 'vue-router'

const ProductId = () => import('@/Modules/Product/view-by-id/id.vue')
const All = () => import('@/Modules/Product/index.product.vue')

Vue.use(Router)

export default [
  {
    path: '/shop',
    name: 'Shop',
    component: All,
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
      refresh: false,
      requiresAuth: false
    }
  }
]
