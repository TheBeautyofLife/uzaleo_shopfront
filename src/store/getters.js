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
