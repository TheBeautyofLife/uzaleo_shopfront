<template>
<div>
     <v-btn v-if="isAdding" @click="addToCart" block color="success">
        <v-icon class="mr-3">mdi-cart-plus</v-icon>
          Add to cart
    </v-btn>
    <v-btn disabled v-else block color="">
        <v-icon class="mr-3">mdi-cart-plus</v-icon>
          Add to cart
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
