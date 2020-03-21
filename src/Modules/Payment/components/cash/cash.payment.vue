<template>
   <v-content class="ml-2">
            <p class="title text-capitalize"> Confirm Your Billing Details</p>
              <small>Your information posted here is secure</small>
               <v-layout column justify-center align-center>
                  <v-card width="48vw" class="mt-5 pb-5">
                    <v-layout column ml-6 pt-8 pl-8>
                        <v-row>
                          <v-layout column>
                            <strong>Firstname</strong>
                            <span class="mt-2">{{ user.firstname }}</span>
                          </v-layout>
                          <v-layout column>
                            <strong>Lastname</strong>
                            <span class="mt-2">{{ user.lastname }}</span>
                          </v-layout>
                        </v-row>
                        <v-row>
                           <v-layout column mt-5 mb-4>
                             <strong>Email</strong>
                             <span class="mt-2">{{ user.email }}</span>
                            </v-layout>
                        </v-row>
                    </v-layout>
                  </v-card>
                  <v-layout row mt-8 justify-center>
                      <v-btn width="25vw" @click.prevent="submitcashPayment()" color="success">Submit</v-btn>
                  </v-layout>
               </v-layout>
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
import { wait } from '@/utils/utils'
import Notification from '@/components/Notification/payment.notification'
import {
  CLEAR_FROM_CART
} from '@/store/mutation-types'
import { API_BASE } from '@/utils/base-url.config'

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const STATUS_FAILED = 3

export default {
  props: ['cashPaymentsShow'],
  data () {
    return {
      cart: this.$store.state.cart,
      vatItem: '',
      Product: [],
      notification: {
        successful: false,
        unsuccessful: false
      },
      currentStatus: null,
      snackbar: false,
      text: 'Processing payment'
    }
  },
  components: {
    'notification-item': Notification
  },
  methods: {
    /**
     * Note: Find a better way to get tax
     * */
    submitcashPayment () {
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
          tax_id: vatItem
        }

        this.currentStatus = STATUS_SAVING
        this.snackbar = true
        this.$store.dispatch('addOrders', order)
          .then(wait(1500))
          .then(res => {
            this.currentStatus = STATUS_SUCCESS
            this.snackbar = false
            this.$store.commit(CLEAR_FROM_CART)
            this.$cookies.remove('cart')
            this.notification.successful = true
            this.cashPaymentsShow = false
          }).catch(err => {
            this.currentStatus = STATUS_FAILED
            console.log(err)
            this.notification.unsuccessful = true
          })

        // console.log(order)
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

    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    }
  },
  created () {
    if (!this.user.name) {
      this.$store.dispatch('userById', this.uuid)
    }
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

<style>

</style>
