import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  ERROR_MSG,
  SET_LOGIN_REQUEST,
  SET_TOKEN,
  SET_LOGIN_ERRORS,
  LOGOUT,
  SET_USER,
  ADD_SHIPPING,
  ADD_SHIPPING_SUCCESS,
  ALL_SHIPPING,
  ALL_SHIPPING_SUCCESS,
  REMOVE_SHIPPING,
  REMOVE_SHIPPING_SUCCESS,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ALL_ORDERS,
  ALL_ORDERS_SUCCESS,
  ORDER_BY_ID,
  ORDER_BY_ID_SUCCESS
} from './mutation-types'

export const productMutations = {
  [ALL_PRODUCTS] (state) {
    state.showLoader = true
    // this[]
  },
  [ALL_PRODUCTS_SUCCESS] (state, payload) {
    state.showLoader = false
    state.products = payload
  },
  [PRODUCT_BY_ID] (state) {
    state.showLoader = true
  },
  [PRODUCT_BY_ID_SUCCESS] (state, payload) {
    state.showLoader = false
    state.product = payload
  },
  [ADD_PRODUCT]: (state, payload) => {
    state.showLoader = true
  },
  [ADD_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.products.push(payload)
  },
  [UPDATE_PRODUCT]: (state, payload) => {
    state.showLoader = true
  },
  [UPDATE_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.products = state.products.map(p => {
      if (p._id === payload._id) {
        payload = { ...payload, manufacturer: state.manufacturers.filter(x => x._id === payload.manufacturer)[0] }
        return payload
      }
      return p
    })
  },
  [REMOVE_PRODUCT]: (state, payload) => {
    state.showLoader = true
  },
  [REMOVE_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false
    const index = state.products.findIndex(p => p._id === payload)
    // console.debug('index', index)
    state.products.splice(index, 1)
  },
  [ERROR_MSG] (state, payload) {}
}

export const cartMutations = {
  [ADD_TO_CART]: (state, payload) => {
    state.cart.push(payload)
  },
  [REMOVE_FROM_CART]: (state, payload) => {
    const index = state.cart.findIndex(p => p._id === payload)
    state.cart.splice(index, 1)
    // console.log(state.cart, state.cart.length, index)
  }
}

export const userMutations = {
  [SET_LOGIN_REQUEST]: (state) => {
    state.showLoader = true
  },
  [SET_TOKEN]: (state, token, payload) => {
    state.status = 'success'
    state.token = token
    state.users = payload
  },
  [SET_LOGIN_ERRORS]: (state, payload) => {
    state.status = 'error'
  },
  [LOGOUT]: (state) => {
    state.status = ''
    state.token = ''
  },
  [SET_USER]: (state, payload) => {
    state.status = 'success'
    state.users = payload
  }
}

export const shippingMutations = {
  [ALL_SHIPPING] (state) {
    state.showLoader = true
    // this[]
  },
  [ALL_SHIPPING_SUCCESS] (state, payload) {
    state.showLoader = false
    state.shippings = payload
  },
  [ADD_SHIPPING]: (state, payload) => {
    state.showLoader = true
  },
  [ADD_SHIPPING_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.shippings.push(payload)
  },
  [REMOVE_SHIPPING]: (state, payload) => {
    state.showLoader = true
  },
  [REMOVE_SHIPPING_SUCCESS]: (state, payload) => {
    state.showLoader = false
    const index = state.shippings.findIndex(s => s._id === payload)
    // console.debug('index', index)
    state.shippings.splice(index, 1)
  },
  [ERROR_MSG] (state, payload) {}
}

export const ordersMutations = {
  [ALL_ORDERS] (state) {
    state.showLoader = true
    // this[]
  },
  [ALL_ORDERS_SUCCESS] (state, payload) {
    state.showLoader = false
    state.shippings = payload
  },
  [ORDER_BY_ID] (state) {
    state.showLoader = true
  },
  [ORDER_BY_ID_SUCCESS] (state, payload) {
    state.showLoader = false
    state.product = payload
  },
  [ADD_ORDER]: (state, payload) => {
    state.showLoader = true
  },
  [ADD_ORDER_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.shippings.push(payload)
  },
  [ERROR_MSG] (state, payload) {}
}
