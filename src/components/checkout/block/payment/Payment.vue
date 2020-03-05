<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <strong>Payment Method</strong>
    <div id="selection option">
        <v-radio-group v-model="selected.Payment" @change="save">
             <v-layout row align-center>
               <v-radio value="cash" class="mr-5 pt-2">
                   <template v-slot:label>
                         <v-icon color="black" size="40">mdi-cash</v-icon>
                         <span class="ml-4 text-capitalize">cash on delivery</span>
                   </template>
               </v-radio>
               <v-radio value="visa" class="ml-5">
                    <template v-slot:label>
                          <v-icon color="black" size="35">mdi-credit-card</v-icon>
                            <!-- <img :src="require('@/assets/icons/visa.svg')" width="50"/> -->
                            <span class="ml-4 text-capitalize">Credit card</span>
                    </template>
               </v-radio>
             </v-layout>
        </v-radio-group>
     <v-row>
        <v-layout column mt-4>

       </v-layout>
    </v-row>
    <v-row>
        <v-layout column mt-4>

       </v-layout>
    </v-row>
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
