/**
 * Shop Router
 */
import Vue from 'vue'
import Router from 'vue-router'

const Products = () => import('@/Modules/products/index.products.vue')
const ProductId = () => import('@/Modules/products/id/id.products.vue')

Vue.use(Router)

export default [
  {
    path: '/products/',
    name: 'Products',
    component: Products,
    meta: {
      refresh: true,
      requiresAuth: true
    }
  },
  {
    path: '/admin/product/:id',
    name: 'ProductsId',
    component: ProductId,
    meta: {
      requiresAuth: true
    }
  }
]
