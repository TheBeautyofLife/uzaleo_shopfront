<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <v-row>
      <v-layout column mb-3>
         <strong>Choose payment option</strong>
      </v-layout>
    </v-row>
    <div id="selection option">
    <v-row>
        <v-layout column>
           <v-radio-group v-model="selected.Payment" @change="save">
               <v-radio value="cash">
                   <template v-slot:label>
                      <v-layout row align-center ml-1>
                         <v-icon color="black" size="40">mdi-cash</v-icon>
                         <span class="ml-4 text-capitalize">cash on delivery</span>
                      </v-layout>
                   </template>
               </v-radio>
               <v-radio value="visa">
                    <template v-slot:label>
                        <v-layout row align-center ml-1>
                            <img :src="require('@/assets/icons/visa.svg')" width="50"/>
                            <span class="ml-4 text-capitalize">visa</span>
                        </v-layout>
                    </template>
               </v-radio>
           </v-radio-group>
         </v-layout>
    </v-row>
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
