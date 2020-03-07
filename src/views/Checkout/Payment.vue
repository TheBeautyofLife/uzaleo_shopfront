<template>
  <v-content>
     <header-main />
    <v-layout justify-center align-center align-content-center my-12>
      <div v-if="cart.length > 0">
     <v-col>
       <v-card flat color="grey lighten-5" class="mb-5" height="195px" width="52vw">
           <v-layout column>
            <div id="selection option" class="ml-6 pt-2">
       <strong>Payment Method</strong>
          <template v-for="product in cart">
             <product-card class="pb-0 mb-0" :product="product" :key="product.id"></product-card>
          </template>
    </div>
           </v-layout>
       </v-card>

        <v-card flat color="grey lighten-5" class="mb-5" height="190px" width="52vw">
            <payment-details @select-payment="PaymentOption" :selected="selected" />
        </v-card>
        <div class="pt-4" v-show="visaPaymentsShow">
          <v-content class="ml-2">
      <p class="title text-capitalize">Your Payment Details</p>
      <small class="ml-3">Your information posted here is secure</small>
      <div id="visa-payment-details">
          <form>
              <v-card width="50vw" class="mt-5 pb-5">
                  <v-card flat class="">
                    <v-layout row justify-center pa-4>
                      <p class="stripeError" v-if="stripeError">
                        {{stripeError}}
                      </p>
                    </v-layout>
                  </v-card>

                  <v-layout row wrap class="ml-5 mr-4">
                      <v-col cols='12'>
                       <v-subheader class="grey--text pl-0 subheader">CARD NUMBER</v-subheader>
                       <div id="card-number" class="grey--text mt-0">
                        <v-text-field
                          :rules="rules"
                          v-model="card.number"
                          counter="19"
                          maxlength="19"
                          :class="{ 'form-danger': cardNumberError }"
                        />
                        <span class="help-block" v-if="cardNumberError">
                            {{ cardNumberError }}
                        </span>
                        </div>
                     </v-col>

                     <v-col col='4'>
                      <v-subheader class="grey--text pl-0 subheader">EXPIRY DATE</v-subheader>
                        <div id="card-expiry" class="grey--text mt-0">
                        <v-text-field
                          v-model="card.expiry"
                          label="MM/YY"
                          :class="{ 'form-danger': cardExpiryError }"
                        />
                        <span class="help-block" v-if="cardExpiryError">
                            {{ cardExpiryError }}
                        </span>
                        </div>
                     </v-col>

                    <v-col col='4' >
                        <v-subheader
                        class="grey--text text--lighten-1 pl-0 subheader">
                          CVV
                        </v-subheader>
                        <div id="card-cvc" class="grey--text mt-0">
                          <v-text-field
                           v-model="card.cvc"
                            :class="{ 'form-danger': cardCvcError }"
                          />
                          <small class="ml-2 grey--text">
                            <v-icon class="grey--text" size="20">mdi-alert-circle-outline</v-icon>
                            3 digits *
                          </small>
                          <span class="help-block" v-if="cardCvcError">
                            {{ cardCvcError }}
                        </span>
                        </div>
                    </v-col>
                  </v-layout>
                </v-card>
              <v-layout row wrap mt-5 justify-center>
                <v-btn  @click.prevent="submitFormToCreateToken()" color="success">Submit</v-btn>
              </v-layout>
              </form>
          </div>
      </v-content>
        </div>

       <div v-show="cashPaymentsShow">
          <v-card>
              <v-card-title class="text-capitalize">Cash</v-card-title>
          </v-card>
       </div>

       <div v-show="mpesaPaymentsShow">
          <v-card>
              <v-card-title class="text-capitalize">Mpesa Payment</v-card-title>
          </v-card>
       </div>
    </v-col>
    <!-- <v-dialog v-model="successful" max-width="680" persistent>
      <span>Your Order</span>
    </v-dialog> -->
      </div>
      </v-layout>
  </v-content>
</template>

<script>
import axios from 'axios'
import { API_BASE } from '@/config'
import Header from '@/components/header/index.vue'

// import Shipping from '@/components/checkout/block/shipping/Shipping'
// import ShippingOption from '@/components/checkout/block/shipping/Shipping_options'

// import { mask } from 'vue-the-mask'
import Payment from '@/components/checkout/block/payment/Payment'
import ProductView from '@/components/checkout/block/product/product-view'

export default {
  // directives: {
  //   mask
  // },
  data () {
    return {
      cart: this.$store.state.cart,
      e6: 1,
      token: '',
      tax: '',
      vat: {},
      orders: [],
      mask: '#### #### #### ####',
      selected: {
        method: false
      },
      Product: [],
      card: {
        cvc: '',
        number: '',
        expiry: ''
      },
      name: '',
      // elements
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      stripe: null,

      // errors
      stripeError: '',
      cardCvcError: '',
      cardExpiryError: '',
      cardNumberError: '',

      loading: false,
      visaPaymentsShow: false,
      cashPaymentsShow: false,
      mpesaPaymentsShow: false,
      rules: [v => v.length <= 19 || 'Max 16 characters']
    }
  },
  components: {
    'header-main': Header,
    // 'shipping-details': Shipping,
    // 'shipping-option': ShippingOption,
    'payment-details': Payment,
    'product-card': ProductView
  },
  methods: {
    setUpStripe () {
      if (window.Stripe === undefined) {
        alert('Stripe V3 library not loaded!')
      } else {
        const stripekey = process.env.VUE_APP_STRIPEKEY
        // eslint-disable-next-line no-undef
        // console.log(stripekey)
        const stripe = window.Stripe(stripekey)
        this.stripe = stripe

        const elements = stripe.elements()
        this.cardCvc = elements.create('cardCvc')
        this.cardExpiry = elements.create('cardExpiry')
        this.cardNumber = elements.create('cardNumber')

        this.cardCvc.mount('#card-cvc')
        this.cardExpiry.mount('#card-expiry')
        this.cardNumber.mount('#card-number')

        this.listenForErrors()
      }
    },

    listenForErrors () {
      const vm = this

      this.cardNumber.addEventListener('change', (event) => {
        vm.toggleError(event)
        vm.cardNumberError = ''
        vm.card.number = !!event.complete
      })

      this.cardExpiry.addEventListener('change', (event) => {
        vm.toggleError(event)
        vm.cardExpiryError = ''
        vm.card.expiry = !!event.complete
      })

      this.cardCvc.addEventListener('change', (event) => {
        vm.toggleError(event)
        vm.cardCvcError = ''
        vm.card.cvc = !!event.complete
      })
    },

    toggleError (event) {
      if (event.error) {
        this.stripeError = event.error.message
      } else {
        this.stripeError = ''
      }
    },

    submitFormToCreateToken () {
      this.clearCardErrors()
      let valid = true

      if (!this.card.number) {
        valid = false
        this.cardNumberError = 'Card Number is Required'
      }
      if (!this.card.cvc) {
        valid = false
        this.cardCvcError = 'CVC is Required'
      }
      if (!this.card.expiry) {
        valid = false
        this.cardExpiryError = 'Month is Required'
      }
      if (this.stripeError) {
        valid = false
      }
      if (valid) {
        this.createToken()
      }
    },

    createToken () {
      this.stripe.createToken(this.cardNumber).then((result) => {
        if (result.error) {
          this.stripeError = result.error.message
        } else {
          // eslint-disable-next-line no-return-assign
          this.token = result.token.id
          axios.get(`${API_BASE}/tax/v1/vat/`).then(res => {
            // eslint-disable-next-line no-return-assign
            this.tax = res.data

            // Getting the individual item from list
            this.vat = this.tax.map(t => ({ tax_id: t._id }))
            const vatItem = this.vat[0].tax_id

            const order = {
              stripetoken: this.token,
              payment_method: this.selected.method,
              product: this.Product = this.cart.map(v => ({ product_id: v._id, product_qty: v.quantity })),
              shipping_id: this.$cookies.get('_shtype'),
              tax_id: vatItem
            }

            this.$store.dispatch('addOrders', order)
              .then(res => {
                console.log('submitted', res.data)
                // this.$cookies.remove('_shtype')
                // this.reset()
                // this.visaPaymentsShow = false
                // location.reload()
              })

            // console.log(order)
          })
        }
      })
    },

    clearElementsInputs () {
      this.cardCvc.clear()
      this.cardExpiry.clear()
      this.cardNumber.clear()
    },

    clearCardErrors () {
      this.stripeError = ''
      this.cardCvcError = ''
      this.cardExpiryError = ''
      this.cardNumberError = ''
    },

    reset () {
      this.clearElementsInputs()
      this.clearCardErrors()
    },

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
      this.visaPaymentsShow = true
      this.mpesaPaymentsShow = false
      this.cashPaymentsShow = false
    },
    cashPayment () {
      this.cashPaymentsShow = true
      this.mpesaPaymentsShow = false
      this.visaPaymentsShow = false
      return console.log('cash Payments')
    },
    mpesaPayment () {
      this.mpesaPaymentsShow = true
      this.cashPaymentsShow = false
      this.visaPaymentsShow = false
      return console.log('cash Payments')
    }
  },
  mounted () {
    this.setUpStripe()
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
