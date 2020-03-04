<template>
  <v-content>
     <header-main />
    <v-layout justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
    <v-row>
      <v-col>
        <div class="title my-4 ml-4">Checkout</div>
          <v-layout ml-3>
            <v-stepper v-model="e6" vertical class="elevation-0">
              <v-stepper-step :complete="e6 > 1" step="1" color="blue lighten-2">
                  Personal Details
                  <small>Personal information & contacts</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                 <v-card flat color="grey lighten-5" class="mb-9" height="180" width="510">
                   <personal-details />
                 </v-card>
                 <v-btn color="#42424D" dark @click="e6 = 2">Continue</v-btn>
                 <v-btn text color="grey" dark @click="personaldetails = !personaldetails" class="ml-3">Edit</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" color="blue lighten-2">
                Shipping Details
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-card flat color="grey lighten-5" class="mb-5" height="280px" width="510">
                  <shipping-details />
                </v-card>
                <!-- Select shipping method -->
                <v-card flat color="grey lighten-5" class="mb-12" height="240px" width="510">
                  <shipping-option />
                </v-card>
                <!-- <v-btn color="#42424D" dark @click="e6 = 3">Continue</v-btn> -->
                 <v-btn text color="grey" dark @click="shippingdetails = !shippingdetails" class="ml-3">Edit</v-btn>
              </v-stepper-content>

            <!-- <v-stepper-step step="3" color="blue lighten-2">Payment Option</v-stepper-step>
              <v-stepper-content step="3">
                <v-card flat color="grey lighten-5" class="mb-5" height="280px" width="510">
                  <payment-details @select-payment="PaymentOption" :selected="selected" />
                </v-card>

                <v-btn color="#42424D" dark @click="e6 = 2">Back</v-btn>
              </v-stepper-content> -->
          </v-stepper>
        </v-layout>
      </v-col>

      <v-col class="mr-6">
        <div class="title my-4 ml-4">Order Summary</div>
        <v-container class="elevation-1" style="border-radius:4px!important;">
          <template v-for="product in cart">
            <product-card :product="product" :key="product.id"></product-card>
          </template>
        </v-container>
         <v-btn
            text
            color="grey darken-1"
            class="mt-4 ml-12"
            to="/cart"
          >
            Modify to cart
          </v-btn>
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

              <v-layout row justify-end mr-8>
                <v-btn
                  color="orange"
                  class="mt-5"
                  to="/checkout/payment"
                >
                    Continue to Payment
                </v-btn>
              </v-layout>
            </v-card>
          </v-layout>
           <!--  -- Totals End -- -->
      </v-col>
    </v-row>
      </div>
        <v-dialog
          v-model="personaldetails"
          scrollable
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
        <v-card>
          <v-layout justify-end>
            <v-btn class="ma-2" icon @click="personaldetails = !personaldetails">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-layout>
          <personal-details-form />
        </v-card>
        </v-dialog>

         <v-dialog
          v-model="shippingdetails"
          scrollable
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
        <v-card>
          <v-layout justify-end>
            <v-btn class="ma-2" icon @click="shippingdetails = !shippingdetails">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-layout>
          <shipping-details-form />
        </v-card>
        </v-dialog>
      </v-layout>
  </v-content>
</template>

<script>
import ProductCard from '@/components/checkout/checkout-product'
import Header from '@/components/header/index.vue'

import PersonalDetails from '@/components/checkout/block/PersonalDetails'
import PersonalDetailsForm from '@/components/checkout/block/PersonalDetails_form'

import Shipping from '@/components/checkout/block/shipping/Shipping'
import ShippingForm from '@/components/checkout/block/shipping/Shipping_form'
import ShippingOption from '@/components/checkout/block/shipping/Shipping_options'

// import Payment from '@/components/checkout/block/payment/Payment'

export default {
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      vat: 0.4,
      personaldetails: false,
      shippingdetails: false,
      billingsdetails: false
      // selected: {
      //   Payment: false
      // }
    }
  },
  components: {
    'header-main': Header,
    'product-card': ProductCard,
    'personal-details': PersonalDetails,
    'personal-details-form': PersonalDetailsForm,
    'shipping-details': Shipping,
    'shipping-details-form': ShippingForm,
    'shipping-option': ShippingOption
    // 'payment-details': Payment
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
      return this.totalPrice() * this.vat
    },
    getPriceTotal () {
      return this.getVat() + this.totalPrice()
    }
    // PaymentOption (selected) {
    //   return console.log('payment', selected)
    // }
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
