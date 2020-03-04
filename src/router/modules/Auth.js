import Vue from 'vue'
import Router from 'vue-router'

const Register = () => import('@/views/Auth/Register.vue')
const Login = () => import('@/views/Auth/Login.vue')
const Profile = () => import('../../views/Auth/Profile/Index.vue')

Vue.use(Router)

export default [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
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
