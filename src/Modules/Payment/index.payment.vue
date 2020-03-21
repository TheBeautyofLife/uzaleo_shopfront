<template>
  <v-content>
     <header-main />
    <v-layout justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
     <v-col>
       <v-card flat color="grey lighten-5" class="mb-5 pa-4" width="60vw">
           <v-layout column mb-2>
            <div id="selection option" class="ml-6 pt-2">
               <strong class="pa-2">Payment Method</strong>
                <template v-for="product in cart">
                  <product-card class="pb-0 mb-0" :product="product" :key="product.id"></product-card>
                </template>
            </div>
           </v-layout>
       </v-card>

        <v-card flat color="grey lighten-5" class="mb-5" height="190px" width="60vw">
            <payment-details @select-payment="PaymentOption" :selected="selected" />
        </v-card>

        <div class="pt-4" v-show="visaPaymentsShow">
            <user-billing-stripe />
        </div>

        <!--  Cash Payments -->
       <div v-show="cashPaymentsShow">
          <user-billing-cash />
       </div>

      <!-- Mpesa payment -->
       <div v-show="mpesaPaymentsShow">
          <user-billing-mpesa />
       </div>
    </v-col>
      </div>
      </v-layout>
  </v-content>
</template>

<script>
import Header from '@/components/Header/index.header'
import Payment from './components/option.payment'
import ProductView from '../Checkout/components/product/view.product'
import MpesaPayment from './components/mpesa/mpesa.payment'
import CashPayment from './components/cash/cash.payment'
import StripePayment from './components/card/stripe.payment'

export default {
  params: ['method'],
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      isEditing: false,
      token: '',
      orders: [],
      selected: {
        method: false
      },

      visaPaymentsShow: false,
      cashPaymentsShow: false,
      mpesaPaymentsShow: false
    }
  },
  components: {
    'header-main': Header,
    // 'shipping-details': Shipping,
    // 'shipping-option': ShippingOption,
    'payment-details': Payment,
    'product-card': ProductView,
    'user-billing-cash': CashPayment,
    'user-billing-mpesa': MpesaPayment,
    'user-billing-stripe': StripePayment
  },
  methods: {

    PaymentOption (selected) {
      this.getPayment()
      return selected
    },

    getPayment () {
      // console.log(this.selected)
      if (this.selected.method === 'VISA') {
        this.visaPayment()
      } else if (this.selected.method === 'CASH') {
        this.cashPayment()
      } else {
        this.mpesaPayment()
      }
    },

    visaPayment () {
      this.$cookies.set('selected-method', 'VISA')
      this.visaPaymentsShow = true
      this.mpesaPaymentsShow = false
      this.cashPaymentsShow = false
    },

    cashPayment () {
      this.$cookies.set('selected-method', 'CASH')
      this.cashPaymentsShow = true
      this.mpesaPaymentsShow = false
      this.visaPaymentsShow = false
      // return console.log('cash Payments')
    },

    mpesaPayment () {
      this.$cookies.set('selected-method', 'MPESA')
      this.mpesaPaymentsShow = true
      this.cashPaymentsShow = false
      this.visaPaymentsShow = false
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
div#card-number, div#card-cvc, div#card-expiry {
    -webkit-box-flex: 1;
    align-items: center;
    line-height: 20px;
    padding: 8px 0;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    border: 1px solid;
    border-radius: 3px;
    height: 55px;
    padding-top: 17px;
    padding-left: 10px;
}

.stripeError {
  color: red;
  font-style: italic;
}

.help-block {
  color: red;
  font-size: 13px;
}
</style>
