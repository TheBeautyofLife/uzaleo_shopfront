<template>
  <v-content>
     <header-main />
    <v-layout column justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
       <div class="title my-4 ml-4">Your Cart  <span class="ml-2 font-weight-bold">({{cart.length}})</span></div>
          <template v-for="product in cart">
            <product-card :product="product" :key="product.id"></product-card>
          </template>
         <v-layout justify-end mt-9>
            <v-card flat width="230">
              <v-row class="ml-2">
                <span class="subtitle-1 font-weight-medium mr-3">Subtotal:</span>
                <p class="subtitle-1 font-weight-bold"> Ksh {{ totalPrice() }}.00</p>
              </v-row>
              <v-row  class="ml-2">
                <span class="subtitle-1 font-weight-medium mr-2">VAT (<small>{{ getVatPerc() }}%</small>) :</span>
                <p class="subtitle-1 font-weight-bold">  Ksh {{ getVat() }}.00</p>
              </v-row>
              <v-divider class="mr-6" />
               <v-row  class="ml-2">
                <span class="subtitle-1 font-weight-medium mt-3 mr-2">Total : </span>
                  <div class="lighten-3 box mr-4">
                    <p class="title font-weight-bold mt-3">  Ksh {{ getPriceTotal() }}.00</p>
                  </div>
              </v-row>
              <v-row>
                  <v-btn
                    color="orange"
                    class="mt-5 ml-3"
                    to="/checkout"
                  >
                    Proceed to Checkout
                </v-btn>
                  </v-row>
            </v-card>
          </v-layout>
      </div>
        <div v-else class="my-12">
          <v-layout column wrap justify-center align-center>
              <div  class="title"> Your Cart is Empty </div>
              <v-btn block color="success" to="/" class="mt-4"> Go to Shop</v-btn>
          </v-layout>
        </div>
      </v-layout>
  </v-content>
</template>

<script>
import ProductCard from './components/view-all-items.cart'
import Header from '@/components/Header/index.header'

export default {
  data () {
    return {
      cart: this.$store.state.cart,
      vat: 0.2
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
    getVatPerc () {
      return this.vat * 100
    },
    getVat () {
      // console.log(this.totalPrice())
      return Math.round(this.totalPrice() * this.vat)
    },
    getPriceTotal () {
      return Math.round(this.getVat() + this.totalPrice())
      // eslint-disable-next-line no-unreachable
    },
    getProduct () {
      return console.log(this.product)
    },
    methodThatForcesUpdate () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height:60px!important;

}
</style>
