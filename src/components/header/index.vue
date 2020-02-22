<template>
  <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      class="elevation-1"
  >
      <span class="headline font-weight-medium">
        <v-img :src="require('../../assets/logo.svg')" width="120"/>
      </span>
      <v-spacer />
        <v-layout row justify-end align-center>
            <router-link class="ma-2 font-weight-medium" text to="/">
                Shop
            </router-link>
            <cart-count class="ml-6" />
        </v-layout>
  </v-app-bar>

</template>

<script>
import CartCount from '../../components/product/cart-count'
// import {
//   ERROR_MSG,
//   ADD_PRODUCT_SUCCESS,
//   UPDATE_PRODUCT_SUCCESS,
//   REMOVE_PRODUCT_SUCCESS
// } from './store/mutation-types'

export default {
  components: {
    'cart-count': CartCount
  }
}
</script>

<style>
a {
    color: black !important;
    text-decoration: none;
}
</style>
