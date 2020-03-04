<template>
  <v-content>
     <header-main />
    <v-layout justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
    <v-col>
        <v-card flat color="grey lighten-5" class="mb-5" height="210px" width="80vw">
            <payment-details @select-payment="PaymentOption" :selected="selected" />
        </v-card>
        <div v-show="visaPaymentsShow">
           <visa-payment-form />
        </div>

       <div v-show="cashPaymentsShow">
            <v-card>
                <v-card-title class="text-capitalize">Cash</v-card-title>
            </v-card>
        </div>
    </v-col>
      </div>
      </v-layout>
  </v-content>
</template>

<script>
import Header from '@/components/header/index.vue'

// import Shipping from '@/components/checkout/block/shipping/Shipping'
// import ShippingOption from '@/components/checkout/block/shipping/Shipping_options'

import Payment from '@/components/checkout/block/payment/Payment'
import Visa from '@/components/checkout/block/payment/types/Visa'

export default {
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      vat: 0.4,
      selected: {
        Payment: false
      },
      visaPaymentsShow: false,
      cashPaymentsShow: false
    }
  },
  components: {
    'header-main': Header,
    // 'shipping-details': Shipping,
    // 'shipping-option': ShippingOption,
    'payment-details': Payment,
    'visa-payment-form': Visa
  },
  methods: {
    getPriceTotal () {
      const subtotal = this.cart.reduce((current, next) =>
        current + (next.price * next.quantity), 0)

      const vatpercent = this.vat * 100
      const vatvalue = subtotal * vatpercent
      return vatvalue + subtotal
    },
    PaymentOption (selected) {
      this.getPayment()
      return selected
    },
    getPayment () {
      console.log(this.selected)
      if (this.selected.Payment === 'visa') {
        this.visaPayment()
      } else {
        this.cashPayment()
      }
    },
    visaPayment () {
      this.visaPaymentsShow = true
      this.cashPaymentsShow = false
      return console.log('Visa Payments')
    },
    cashPayment () {
      this.cashPaymentsShow = true
      this.visaPaymentsShow = false
      return console.log('cash Payments')
    }
    // Payments
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
