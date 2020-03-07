<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <div id="selection option">
       <strong>Payment Method</strong>
        <v-radio-group v-model="selected.method" @change="save">
          <v-layout row align-center ml-3>
               <v-radio value="CASH" class="mr-4">
                   <template v-slot:label>
                         <v-icon color="black" size="33">mdi-cash</v-icon>
                         <span class="ml-2 text-capitalize">cash on delivery</span>
                   </template>
               </v-radio>

               <v-radio value="VISA" class="mr-4">
                    <template v-slot:label>
                          <v-icon color="black" size="30">mdi-credit-card</v-icon>
                            <!-- <img :src="require('@/assets/icons/visa.svg')" width="50"/> -->
                            <span class="ml-2 text-capitalize">Credit card</span>
                    </template>
               </v-radio>

               <v-radio value="MPESA" class="mb-2">
                  <template v-slot:label>
                    <v-icon color="black" size="30">mdi-credit-card</v-icon>
                      <!-- <img :src="require('@/assets/icons/visa.svg')" width="50"/> -->
                      <span class="ml-2 text-capitalize">Mpesa</span>
                  </template>
               </v-radio>

          </v-layout>
        </v-radio-group>
    </div>
  </v-layout>
</v-container>
</template>

<script>
export default {
  props: ['selected'],
  methods: {
    PaymentOption () {
      this.save()
    },

    save () {
      // console.log(this.fields.valid())
      this.$emit('select-payment', this.selected)
    }
  }
}
</script>

<style>

</style>
