<template>
  <v-content>
     <header-main />
    <v-layout column justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
       <div class="title my-4">Your Cart</div>
          <template v-for="product in cart">
            <product-card :product="product" :key="product.id"></product-card>
          </template>
          <v-layout justify-end>
                <v-card flat width="250">
                  <h3 class="total grey lighten-3">
                    Total: Ksh {{ totalPrice() }}.00
                  </h3>
                  <v-btn
                    color="orange"
                    class="mt-5"
                    dark
                    to="/checkout"
                  >
                Proceed to Checkout
                {{ getCart ()}}
                </v-btn>
            </v-card>
          </v-layout>
      </div>
        <div v-else class="my-12">
          <v-layout column wrap justify-center align-center>
              <div  class="title"> Your Cart is Empty </div>
              <v-btn block color="success" to="/">Shop Here</v-btn>
          </v-layout>
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
  },
  methods: {
    totalPrice () {
      return this.cart.reduce((current, next) =>
        current + (next.price * next.quantity), 0)
    },
    getCart () {
      console.log(this.cart)
    }
  }
}
</script>
