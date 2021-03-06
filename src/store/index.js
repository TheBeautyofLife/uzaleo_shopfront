import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueCookies from 'vue-cookies'

import { productGetters, userGetters, shippingGetters, ordersGetters } from './getters'
import { productMutations, cartMutations, userMutations, shippingMutations, ordersMutations, imageMutations } from './mutations'
import { productActions, userActions, shippingActions, ordersActions, imagesActions } from './actions'

Vue.use(Vuex)
Vue.use(VueCookies)

// this.$cookies.config('7d')

// const vuexLocal = new VuexPersistence({
//   key: 'products',
//   storage: window.localStorage
// })

const vuexCookie = new VuexPersistence({
  key: 'cart',
  restoreState: (key, storage) => Vue.$cookies.get(key),
  saveState: (key, state, storage) =>
    Vue.$cookies.set(key, state, {
      expires: 3
    }),
  modules: ['cart']
})

export default new Vuex.Store({
  strict: true,
  state: {
    cart: [],
    showLoader: false,
    product: {},
    products: [],
    token: Vue.$cookies.get('_token') || '',
    user: {},
    users: [],
    status: '',
    shipping: {},
    shippings: [],
    order: {},
    orders: [],
    image: {},
    images: []
  },
  mutations: Object.assign({}, productMutations, cartMutations, userMutations, shippingMutations, ordersMutations, imageMutations),
  getters: Object.assign({}, productGetters, userGetters, shippingGetters, ordersGetters),
  actions: Object.assign({}, productActions, userActions, shippingActions, ordersActions, imagesActions),
  plugins: [vuexCookie.plugin]
})
