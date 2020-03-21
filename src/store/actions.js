import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import { API_BASE, API_AUTH, API_IMAGE } from '@/utils/base-url.config'

import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  SET_LOGIN_REQUEST,
  SET_TOKEN,
  SET_USER,
  SET_LOGIN_ERRORS,
  ALL_USERS,
  ALL_USERS_SUCCESS,
  USER_BY_ID,
  USER_BY_ID_SUCCESS,
  USER_EDIT_ACCOUNT,
  USER_EDIT_ACCOUNT_SUCCESS,
  ALL_SHIPPING,
  ALL_SHIPPING_SUCCESS,
  SHIPPING_BY_ID,
  SHIPPING_BY_ID_SUCCESS,
  ADD_SHIPPING,
  ADD_SHIPPING_SUCCESS,
  REMOVE_SHIPPING,
  REMOVE_SHIPPING_SUCCESS,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ALL_ORDERS,
  ALL_ORDERS_SUCCESS,
  ORDER_BY_ID,
  ORDER_BY_ID_SUCCESS,
  ADD_IMAGE,
  ADD_IMAGE_SUCCESS
} from './mutation-types'

Vue.use(VueCookies)

export const productActions = {
  allProducts ({ commit }) {
    commit(ALL_PRODUCTS)
    axios.get(`${API_BASE}/product/v1/products/`).then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data)
    })
  },
  productById ({ commit }, payload) {
    commit(PRODUCT_BY_ID)
    axios.get(`${API_BASE}/product/v1/products/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(PRODUCT_BY_ID_SUCCESS, response.data)
    })
  },
  addProduct ({ commit }, payload) {
    commit(ADD_PRODUCT)
    axios.put(`${API_BASE}/product/v1/products/create`, payload).then(response => {
      Promise.resolve(commit(ADD_PRODUCT_SUCCESS, response.data))
      Vue.$cookies.set('recently_added_item', response.data)
      // location.reload()
    })
  },
  updateProduct ({ commit }, payload) {
    commit(UPDATE_PRODUCT)
    axios.put(`${API_BASE}/product/v1/product/${payload._id}`, payload).then(response => {
      commit(UPDATE_PRODUCT_SUCCESS, response.data)
    })
  },
  removeProduct ({ commit }, payload) {
    commit(REMOVE_PRODUCT)
    axios.delete(`${API_BASE}/product/v1/product/${payload}`, payload).then(response => {
      // console.debug('response', response.data)
      commit(REMOVE_PRODUCT_SUCCESS, response.data)
    })
  }
}

/**
  * These are the user actions
  * **/
export const userActions = {
  allUsers ({ commit }) {
    commit(ALL_USERS)
    axios.get(`${API_BASE}/users`).then(response => {
      commit(ALL_USERS_SUCCESS, response.data)
    })
  },
  userById ({ commit }, payload) {
    commit(USER_BY_ID)
    axios.get(`${API_BASE}/users/${payload}`).then(response => {
      commit(USER_BY_ID_SUCCESS, response.data)
    })
  },

  updateUser ({ commit }, payload) {
    commit(USER_EDIT_ACCOUNT)
    axios.patch(`${API_BASE}/users/creds/${payload._id}`, payload).then(response => {
      commit(USER_EDIT_ACCOUNT_SUCCESS, response.data)
      this.$cookies.set('user', response.data)
    })
  },

  updateUserLocation ({ commit }, payload) {
    commit(USER_EDIT_ACCOUNT)
    axios.put(`${API_BASE}/users/location/${payload._id}`, payload).then(response => {
      commit(USER_EDIT_ACCOUNT_SUCCESS, response.data)
      this.$cookies.set('user', response.data)
    })
  },

  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(SET_LOGIN_REQUEST)
      axios.put(`${API_AUTH}/users/login`, payload)
        .then(res => {
          const token = res.data.token
          const users = res.data.users
          Vue.$cookies.set('_token', token)
          Vue.$cookies.set('user', users)
          // eslint-disable-next-line dot-notation
          axios.defaults.headers.common['Authorization'] = token

          commit(SET_TOKEN, token, users)
          commit(SET_USER, users)
          resolve(res)
        })
        .catch(err => {
          commit(SET_LOGIN_ERRORS)
          Vue.$cookies.remove('token')
          reject(err)
        })
    })
  },

  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(SET_LOGIN_REQUEST)
      axios.post(`${API_AUTH}/users/register`, payload)
        .then(res => {
          const token = res.data.token
          const users = res.data.user

          Vue.$cookies.get('token', token)
          location.reload()
          // eslint-disable-next-line dot-notation
          axios.defaults.headers.common['Authorization'] = token
          commit(SET_TOKEN, token, users)
          resolve(res)
        })
        .catch(err => {
          commit(SET_LOGIN_ERRORS, err)
          Vue.$cookies.remove('token')
          reject(err)
        })
    })
  },

  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      location.reload()
      Vue.$cookies.remove('_token')
      Vue.$cookies.remove('user')
      Vue.$cookies.remove('cart')
      Vue.$cookies.remove('profile')
      // eslint-disable-next-line dot-notation
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export const shippingActions = {
  allShipping ({ commit }) {
    commit(ALL_SHIPPING)
    axios.get(`${API_BASE}/shipping/v1/shipMethod/`).then(response => {
      commit(ALL_SHIPPING_SUCCESS, response.data)
    })
  },
  shippingById ({ commit }, payload) {
    commit(SHIPPING_BY_ID)
    axios.get(`${API_BASE}/shipping/v1/shipMethod/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(SHIPPING_BY_ID_SUCCESS, response.data)
    })
  },
  addShipping ({ commit }, payload) {
    commit(ADD_SHIPPING)
    axios.post(`${API_BASE}/shipping/v1/shippingmethod/create`, payload).then(response => {
      commit(ADD_SHIPPING_SUCCESS, response.data)
      location.reload()
    })
  },
  removeShipping ({ commit }, payload) {
    commit(REMOVE_SHIPPING)
    axios.delete(`${API_BASE}/shipping/v1/shipMethod/delete/${payload}`, payload).then(response => {
      // console.debug('response', response.data)
      commit(REMOVE_SHIPPING_SUCCESS, response.data)
      location.reload()
    })
  }
}

export const ordersActions = {
  allOrders ({ commit }) {
    commit(ALL_ORDERS)
    axios.get(`${API_BASE}/order/v1/order/`).then(response => {
      commit(ALL_ORDERS_SUCCESS, response.data)
    })
  },
  orderById ({ commit }, payload) {
    commit(ORDER_BY_ID)
    axios.get(`${API_BASE}/order/v1/order/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(ORDER_BY_ID_SUCCESS, response.data)
    })
  },
  addOrders ({ commit }, payload) {
    commit(ADD_ORDER)
    axios.post(`${API_BASE}/order/v1/order/create`, payload).then(response => {
      commit(ADD_ORDER_SUCCESS, response.data)
      Vue.$cookies.remove('cart')
      // location.reload()
    })
  }
}

export const imagesActions = {
  addImages ({ commit }, payload) {
    commit(ADD_IMAGE)
    axios.patch(`${API_IMAGE}/image/v1/products/images/create/`, payload).then(response => {
      commit(ADD_IMAGE_SUCCESS, response.data)
      // location.reload()
    })
  }
}
