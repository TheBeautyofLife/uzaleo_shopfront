<template>
  <v-content>
     <header-main />
    <v-layout justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
    <v-row>
      <v-col>
        <div class="title my-4 ml-4">Checkout</div>
          <v-layout ml-3>
            <v-stepper v-model="e6" vertical width="600px" class="elevation-0">
              <v-stepper-step :complete="e6 > 1" step="1" color="blue lighten-2">
                  Personal Details
                  <small>Summarize if needed</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                 <v-card flat color="grey lighten-4" class="mb-12" height="200px" width="610">
                   <personal-details />
                 </v-card>
                 <v-btn color="#42424D" dark @click="e6 = 2">Continue</v-btn>
                 <v-btn text color="grey" dark @click="e6 = 2" class="ml-3">Edit</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" color="blue lighten-2">
                Shipping Details
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-card flat color="grey lighten-4" class="mb-12" height="200px" width="610"></v-card>
                <v-btn color="#42424D" dark @click="e6 = 3">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>

            <v-stepper-step step="3" color="blue lighten-2">View setup instructions</v-stepper-step>
              <v-stepper-content step="3">
                <v-card flat color="grey lighten-4" class="mb-12" height="200px" width="610"></v-card>
                <v-btn color="#42424D" dark @click="e6 = 1">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
          </v-stepper>
        </v-layout>
      </v-col>

      <v-col>
        <div class="title my-4 ml-4">Order Summary</div>
        <v-container class="elevation-1" style="border-radius:4px!important;">
          <template v-for="product in cart">
            <product-card :product="product" :key="product.id"></product-card>
          </template>
        </v-container>
          <!--  -- Totals -- -->
            <v-layout my-12>
                <v-card flat width="230" >
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
                    text
                    small
                    color="grey darken-1"
                    class="mt-6 ml-3"
                    to="/cart"
                  >
                    Back to cart
                  </v-btn>
                  <v-btn
                    color="orange"
                    class="mt-5 mr-2"
                  >
                    Submit
                </v-btn>
                  </v-row>
            </v-card>
          </v-layout>
           <!--  -- Totals End -- -->
      </v-col>
    </v-row>
      </div>
      </v-layout>
  </v-content>
</template>

<script>
import ProductCard from '../../components/checkout/checkout-product'
import Header from '@/components/header/index.vue'

import PersonalDetails from '../../components/checkout/block/PersonalDetails'
// import Shipping from '/components/checkout/Shipping'
// import Payment from '/components/checkout/Payment'

export default {
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      vat: 0.4
    }
  },
  components: {
    'header-main': Header,
    'product-card': ProductCard,
    'personal-details': PersonalDetails
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
      console.log(this.totalPrice())
      return this.totalPrice() * this.vat
    },
    getPriceTotal () {
      return this.getVat() + this.totalPrice()
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
