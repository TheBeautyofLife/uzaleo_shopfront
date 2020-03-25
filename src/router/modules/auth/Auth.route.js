import Vue from 'vue'
import Router from 'vue-router'

const Register = () => import('@/views/Auth/Register.auth.vue')
const Login = () => import('@/views/Auth/Login.auth.vue')

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
  }
]
