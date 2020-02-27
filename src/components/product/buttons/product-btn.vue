<template>
<div>
    <v-btn icon v-if="isAdding" class="button" @click="addToCart">
        <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
    <v-btn icon dark v-else @click="removeFromCart(product._id)">
         <v-icon class="red--text" >mdi-cart-remove </v-icon>
        </v-btn>
  </div>
</template>

<script>
import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../../../store/mutation-types'
export default {
  props: ['product'],
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  computed: {
    isAdding () {
      return this.cart.indexOf(this.product) < 0
    }
  },
  methods: {
    addToCart () {
      this.$store.commit(ADD_TO_CART, this.product)
    },
    removeFromCart (id) {
      this.$store.commit(REMOVE_FROM_CART, id)
    }
  }
}
</script>

<style>

</style>
