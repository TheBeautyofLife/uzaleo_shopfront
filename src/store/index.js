import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueCookies from 'vue-cookies'

import { productGetters } from './getters'
import { productMutations, cartMutations } from './mutations'
import { productActions } from './actions'

Vue.use(Vuex)
Vue.use(VueCookies)

Vue.$cookies.config('7d')

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
  // filter: (mutation) => mutation.type == 'logIn' || mutation.type == 'logOut'
})

export default new Vuex.Store({
  strict: true,
  state: {
    cart: [],
    showLoader: false,
    product: {},
    products: [],
    manufacturers: []
  },
  mutations: Object.assign({}, productMutations, cartMutations),
  getters: Object.assign({}, productGetters),
  actions: Object.assign({}, productActions),
  plugins: [vuexCookie.plugin]
})
