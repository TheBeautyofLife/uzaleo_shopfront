<template>
  <v-content>
     <header-main />
    <v-layout column justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
       <div class="title my-4">Your Cart</div>
          <template v-for="product in cart">
            <product-card :product="product" :key="product._id"></product-card>
          </template>
      </div>
        <div v-else class="my-12">
            <div  class="title"> Your Cart is Empty </div>
        </div>
      </v-layout>
  </v-content>
</template>

<script>
import ProductCard from '../components/product/cart-product'
import Header from '@/components/header/index.vue'

export default {
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  components: {
    'header-main': Header,
    'product-card': ProductCard
  }
}
</script>
