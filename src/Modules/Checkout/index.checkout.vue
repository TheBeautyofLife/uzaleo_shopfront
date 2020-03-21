/* eslint-disable no-undef */
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
                 <v-card flat color="grey lighten-5" class="mb-6" height="250" width="510">
                   <personal-details />
                 </v-card>
                 <v-btn color="#42424D" dark @click="e6 = 2">Continue</v-btn>
                 <v-btn text color="grey" dark @click="personaldetails = !personaldetails" class="ml-3">Edit</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" color="blue lighten-2">
                Shipping Details
              </v-stepper-step>
              <v-stepper-content step="2">
                  <v-card flat color="grey lighten-5" class="mb-5" height="auto" width="510">
                    <shipping-details />
                        <!-- Select shipping method -->
                      <v-divider style="opacity:0.5;"></v-divider>
                    <shipping-option @select-shipping="ShippingOption" :selectedShipping="selectedShipping" />
                  </v-card>
                <v-btn color="#42424D" dark @click="e6 = 1">Back</v-btn>
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
            class="mt-4 "
            to="/cart"
          >
            Modify to cart
          </v-btn>
          <!--  -- Totals -- -->
            <v-layout my-12 ml-3>
                <v-card flat width="230" >
                         <v-row class="ml-2">
                <span class="subtitle-1 font-weight-medium mr-3">Subtotal:</span>
                <p class="subtitle-1 font-weight-bold"> Ksh {{ totalPrice() }}.00</p>
              </v-row>
              <v-row  class="ml-2">
                <span class="subtitle-1 font-weight-medium mr-2">VAT (<small>{{ getVatPerc() }}%</small>) :</span>
                <p class="subtitle-1 font-weight-bold">  Ksh {{ getVat() }}.00</p>
              </v-row>
              <v-row  class="ml-2">
                <span class="subtitle-1 font-weight-medium mr-2">Delivery Fee :</span>
                <p class="subtitle-1 font-weight-bold">  Ksh {{ getDeliveryFee() }}.00</p>
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
            <v-btn class="ma-2" icon @click="closePersonalDetailsForm()">
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
import Header from '@/components/Header/index.header'
import ProductCard from './components/product/view.product'

import PersonalDetails from './components/personal/index.personal'
import PersonalDetailsForm from './components/personal/form.personal'

import Shipping from './components/shipping/index.shipping'
import ShippingForm from './components/shipping/form.shipping'
import ShippingOption from './components/shipping/options.shipping'

export default {
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      vat: 0.2,
      personaldetails: false,
      shippingdetails: false,
      billingsdetails: false,
      selectedShipping: {},
      shippingItem: {}
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
  },
  created () {
    if (this.shippings.length === 0) {
      this.$store.dispatch('allShipping')
    }
  },
  computed: {
    shippings () {
      return this.$store.getters.allShipping
    }
  },
  methods: {
    totalPrice () {
      return this.cart.reduce((current, next) =>
        current + (next.price * next.quantity), 0)
    },
    getVatPerc () {
      return this.vat * 100
    },
    getDeliveryFee () {
      // eslint-disable-next-line no-unused-vars
      const shippingId = this.shippings.map(v => ({ id: v._id }))
      const shippingfee = this.shippings.map(v => ({ shipping_fee: v.shipping_fee }))

      for (let i = 0; i < shippingId.length; i++) {
        // const element = array[index]
        if (shippingId[i].id === this.selectedShipping.shipping_method) {
          const shippingFee = shippingfee
          for (let j = i; j < shippingFee.length; j++) {
            return shippingFee[j].shipping_fee
          }
        }
      }
      return 0
    },
    getVat () {
      // console.log(this.totalPrice())
      return Math.round(this.totalPrice() * this.vat)
    },
    getPriceTotal () {
      const shippingfee = this.getDeliveryFee()
      console.log(shippingfee)

      if (this.getDeliveryFee() == null || this.getDeliveryFee() === 0) {
        return Math.round(this.getVat() + this.totalPrice())
      } else if (this.getDeliveryFee() != null || this.getDeliveryFee() !== 0) {
        return Math.round(this.getVat() + this.totalPrice() + shippingfee)
      } else {
        return 0
      }
    },
    ShippingOption (selectedShipping) {
      this.selectedShippingOption()
      this.getDeliveryFee()
      return selectedShipping
    },
    selectedShippingOption () {
      // console.log(this.selectedShipping)
      this.$cookies.set('_shtype', this.selectedShipping.shipping_method, { expires: '10m' })
    },
    closePersonalDetailsForm () {
      this.personaldetails = true
      location.reload()
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
