import Vue from 'vue'
import Router from 'vue-router'

/**
 * This is the route for the user profile
 **/
const Profile = () => import('@/Modules/Profile/index.profile.vue')

Vue.use(Router)

export default [
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      refresh: false,
      requiresAuth: true
    }
  }
]
