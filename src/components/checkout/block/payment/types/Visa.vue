<template>
   <v-content class="ml-2">
      <p class="title text-capitalize">Your Payment Details</p>
      <small class="ml-3">Your information posted here is secure</small>
      <div id="visa-payment-details">
          <form @submit.prevent="visaDetails">
              <v-card width="49vw" class="mt-5 pb-5">
                  <v-row class="ml-5 mr-4">
                     <v-col cols='6'>
                       <v-subheader class="grey--text pl-0 subheader">CARDHOLDER’S NAME</v-subheader>
                        <v-text-field
                          name="fullname"
                          outlined
                          single-line
                          hide-details
                          v-model="visa.cardHolder"
                          label="Fullname"
                        >
                        </v-text-field>
                     </v-col>
                      <v-col cols='6'>
                       <v-subheader class="grey--text pl-0 subheader">CARD NUMBER</v-subheader>
                        <v-text-field
                          name="fullname"
                          outlined
                          single-line
                          hide-details
                          v-model="visa.cardNumber"
                          label="4478 6322 9923 8990"
                        >
                        </v-text-field>
                     </v-col>
                     <v-col col='4'>
                      <v-subheader class="grey--text pl-0 subheader">EXPIRY DATE</v-subheader>
                        <v-select
                          :items="this.jsonDataMonth()"
                          item-text="name"
                          item-value="name"
                          v-model="visa.cardExpireMonth"
                          label="Month"
                          outlined
                          append-icon='mdi-chevron-down'
                          hide-details
                        />
                      </v-col>

                      <v-col col='4'>
                        <v-subheader class="grey--text pl-0 subheader"></v-subheader>
                          <v-select
                            :items="this.jsonDataYear()"
                            item-text="name"
                            item-value="name"
                            v-model="visa.cardExpireYear"
                            label="Year"
                            outlined
                            append-icon='mdi-chevron-down'
                            hide-details
                          />
                      </v-col>

                      <v-col col='4'>
                        <v-subheader
                        class="grey--text text--lighten-1 pl-0 subheader">
                          CVV
                        </v-subheader>
                          <v-text-field
                           v-model="visa.cardCvv"
                            single-line
                            outlined
                            hide-details
                          />
                          <small class="ml-2 grey--text">
                            <v-icon class="grey--text" size="20">mdi-alert-circle-outline</v-icon>
                            3 digits *
                          </small>
                      </v-col>
                    </v-row>
                  </v-card>
              </form>
          </div>
      </v-content>
</template>

<script>
import { StripeCheckout } from 'vue-stripe-checkout'

export default {
  props: ['visa'],
  data () {
    return {
      YearList: [],
      MonthList: []
    }
  },
  methods: {
    visaDetails () {
      this.save()
    },

    save () {
    //   console.log(this.model)
      this.$validator.validateAll().then(() => {
        this.$emit('save-visa-payment', this.visa)
      }).catch(() => {
        // eslint-disable-next-line no-undef
        console.log('Validation Error')
      })
    },
    jsonDataMonth () {
      const jsonData = require('@/data/timestamp.json')
      // console.log(jsonData)
      return jsonData.month
    },
    jsonDataYear () {
      const jsonData = require('@/data/timestamp.json')
      // console.log(jsonData)
      return jsonData.year
    }
  }

}
</script>

<style>

</style>
