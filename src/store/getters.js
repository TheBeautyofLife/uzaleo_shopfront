export const productGetters = {
  allProducts: (state, getters) => {
    return state.products
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p._id === id)[0]
    } else {
      return state.product
    }
  }
}

export const userGetters = {
  isLoggedIn: (state) => {
    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  },
  loading (state) {
    return state.showLoader
  },
  user: state => state.user
}

export const shippingGetters = {
  allShipping: (state, getters) => {
    return state.shippings
  },
  shippingyId: (state, getters) => id => {
    if (getters.allShipping.length > 0) {
      return getters.allShipping.filter(s => s._id === id)[0]
    } else {
      return state.shipping
    }
  }
}

export const ordersGetters = {
  allOrders: (state, getters) => {
    return state.orders
  },
  orderById: (state, getters) => id => {
    if (getters.allOrders.length > 0) {
      return getters.allOrders.filter(s => s._id === id)[0]
    } else {
      return state.order
    }
  }
}
