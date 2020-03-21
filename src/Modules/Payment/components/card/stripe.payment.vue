<template>
   <v-content class="ml-2">
            <p class="title text-capitalize">Your Payment Details</p>
              <small>Your information posted here is secure</small>
                  <div id="visa-payment-details">
                    <form @submit.prevent="submitFormToCreateToken()">
                      <v-layout justify-center>
                          <v-card width="48vw" class="mt-5 pb-5">
                            <v-card flat class="">
                              <v-layout row justify-center pa-4>
                                <p class="stripeError" v-if="stripeError">
                                    {{ stripeError }}
                                </p>
                              </v-layout>
                          </v-card>

                    <v-layout row wrap class="ml-5 mr-4">
                      <v-col cols='12'>
                       <v-subheader class="grey--text pl-0 subheader">CARD NUMBER</v-subheader>
                       <div id="card-number" class="grey--text mt-0">
                        <v-text-field
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
              </v-layout>
                  <v-layout row mt-8 justify-center>
                    <v-btn  width="25vw" height="5vh" type="submit" color="success">Submit</v-btn>
                  </v-layout>
                </form>
              </div>
              <!-- Notification -->
                <notification-item
                    :notification='notification'
                    @close-direct='closeRedirectHome'
                    @close-return=' closeRedirectBack'
                    v-if="isSuccess"
                />

                <v-snackbar
                    v-model="snackbar"
                    color="white black--text"
                    v-if="isSaving"
                    multi-line
                >
                <v-layout row justify-center>
                   <span class="ma-3">{{ text }}</span>
                <v-progress-linear
                    color="blue"
                    indeterminate
                    rounded
                    height="6"
                 ></v-progress-linear>
               </v-layout>
            </v-snackbar>
          </v-content>
</template>

<script>
import * as axios from 'axios'
// import { wait } from '@/utils/utils'
import Notification from '@/components/Notification/payment.notification'

// import {
//   CLEAR_FROM_CART
// } from '@/store/mutation-types'

import { API_BASE } from '@/utils/base-url.config'

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const STATUS_FAILED = 3

export default {
  props: ['cardPaymentsShow'],
  data () {
    return {
      cart: this.$store.state.cart,
      vatItem: '',
      Product: [],
      card: {
        cvc: '',
        number: '',
        expiry: ''
      },
      name: '',
      token: '',
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

      currentStatus: null,
      snackbar: false,
      text: 'Processing payment',
      notification: {
        successful: false,
        unsuccessful: false
      }
    }
  },
  components: {
    'notification-item': Notification
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
      this.currentStatus = STATUS_SAVING
      this.snackbar = true
      this.stripe.createToken(this.cardNumber).then((result) => {
        if (result.error) {
          this.stripeError = result.error.message
        } else {
          this.token = result.token.id

          axios.get(`${API_BASE}/tax/v1/vat/`).then(res => {
            const tax = res.data

            // Getting the individual item from list
            const vat = tax.map(t => ({ tax_id: t._id }))
            const vatItem = vat[0].tax_id

            const order = {
              customer_id: this.uuid,
              payment_method: this.$cookies.get('selected-method'),
              product: this.Product = this.cart.map(v => ({ product_id: v._id, product_qty: v.quantity })),
              shipping_id: this.$cookies.get('_shtype'),
              tax_id: vatItem,
              stripetoken: this.token
            }
            console.log(this.token)
            console.log('order', order)

            this.$store.dispatch('addOrders', order)
              // .then(wait(1500))
              .then(() => {
                this.currentStatus = STATUS_SUCCESS
                this.snackbar = false
                // this.$store.commit(CLEAR_FROM_CART)
                this.$cookies.remove('cart')
                this.$cookies.remove('_shtype')
                this.notification.successful = true
                this.visaPaymentsShow = false
              }).catch(err => {
                this.currentStatus = STATUS_FAILED
                console.log(err)
                this.unsuccessful = true
              })
          })
        }
      })
    },

    /**
     * Closing the notification
     */
    closeRedirectHome () {
      console.log('clicked')
      this.notification.successful = false
      if (this.notification.successful === false) {
        this.reset()
        this.$router.push('/')
      }
    },
    closeRedirectBack () {
      console.log('clicked')
      this.notification.unsuccessful = false
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
      this.currentStatus = STATUS_INITIAL
    },

    getPriceTotal () {
      const subtotal = this.cart.reduce((current, next) =>
        current + (next.price * next.quantity), 0)

      const vatpercent = this.vat * 100
      const vatvalue = subtotal * vatpercent
      return vatvalue + subtotal
    }

  },
  created () {
    if (!this.user.name) {
      this.$store.dispatch('userById', this.uuid)
    }
  },

  mounted () {
    this.setUpStripe()
  },

  computed: {
    uuid () {
      const userCookies = this.$cookies.get('user')
      const uuid = userCookies._id
      return uuid
    },
    user () {
      const userById = this.$store.getters.userById(this.uuid)
      // console.log('data', userById)
      return Object.assign({}, userById)
    },
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
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
