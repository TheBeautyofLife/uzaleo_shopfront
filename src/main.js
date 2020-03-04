import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import * as VeeValidate from 'vee-validate'
import * as ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)
Vue.use(VeeValidate)
Vue.use(VueCookies)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
