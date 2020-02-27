import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import { API_BASE, API_AUTH } from '../config'

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
  SET_LOGIN_ERRORS
} from './mutation-types'

Vue.use(VueCookies)

export const productActions = {
  allProducts ({ commit }) {
    commit(ALL_PRODUCTS)
    axios.get(`${API_BASE}/products`).then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data)
    })
  },
  productById ({ commit }, payload) {
    commit(PRODUCT_BY_ID)
    axios.get(`${API_BASE}/products/${payload}`).then(response => {
      // console.log(payload, response.data)
      commit(PRODUCT_BY_ID_SUCCESS, response.data)
    })
  },
  addProduct ({ commit }, payload) {
    commit(ADD_PRODUCT)
    axios.post(`${API_BASE}/products`, payload).then(response => {
      commit(ADD_PRODUCT_SUCCESS, response.data)
    })
  },
  updateProduct ({ commit }, payload) {
    commit(UPDATE_PRODUCT)
    axios.put(`${API_BASE}/products/${payload._id}`, payload).then(response => {
      commit(UPDATE_PRODUCT_SUCCESS, response.data)
    })
  },
  removeProduct ({ commit }, payload) {
    commit(REMOVE_PRODUCT)
    axios.delete(`${API_BASE}/products/${payload}`, payload).then(response => {
      // console.debug('response', response.data)
      commit(REMOVE_PRODUCT_SUCCESS, response.data)
    })
  }
}

export const userActions = {
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
      Vue.$cookies.remove('_token')
      Vue.$cookies.remove('user')
      Vue.$cookies.remove('cart')
      // eslint-disable-next-line dot-notation
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
