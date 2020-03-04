import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

/**
* The are are routes modules
**/
import ProductRoute from './modules/Products'
import AuthRoute from './modules/Auth'
import DashboardRoute from './modules/Dashboard'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const routes = baseRoutes.concat(ProductRoute, AuthRoute, DashboardRoute)

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

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/auth/login')
  } else {
    next()
  }
  next()
})
export default router
