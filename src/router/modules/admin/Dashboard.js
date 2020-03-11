import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/dashboard/views/')
const Products = () => import('@/dashboard/views/products/Products.vue')
const ProductId = () => import('@/dashboard/views/products/id/id.vue')

const Orders = () => import('@/dashboard/views/orders/Orders.vue')
const OrderId = () => import('@/dashboard/views/orders/id/id.vue')

const Shipping = () => import('@/dashboard/views/shipping/Shipping.vue')

Vue.use(Router)

export default [
  {
    path: '/admin/',
    name: 'DashAdmin',
    component: Home,
    meta: {
      refresh: false,
      requiresAuth: true
    }
  },
  {
    path: '/admin/products/',
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
  },
  {
    path: '/admin/orders/',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/order/:id',
    name: 'OrderId',
    component: OrderId,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/shipping/',
    name: 'Shipping',
    component: Shipping,
    meta: {
      requiresAuth: true
    }
  }
]
