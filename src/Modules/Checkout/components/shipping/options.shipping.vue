<template>
<v-container>
  <v-layout column ml-2>
      <strong>Shipping options</strong>
      <small class="mt-2">Select Shipping option</small>
        <v-radio-group :mandatory="false" v-model="selectedShipping.shipping_method" v-for="shipping in shippings" :key="shipping._id" @change="save">
          <v-layout row align-center ml-3>
               <v-radio :value="shipping._id" class="mr-4">
                   <template v-slot:label>
                         <span class="ml-2 text-capitalize">{{ shipping.type }}</span>
                         <span class="ml-2 text-capitalize font-weight-medium ml-5">{{ shipping.shipping_fee }}</span>
                   </template>
               </v-radio>
          </v-layout>
        </v-radio-group>
  </v-layout>
</v-container>
</template>

<script>
export default {
  props: ['selectedShipping'],
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
    ShippingOption () {
      this.save()
    },

    save () {
      // console.log(this.fields.valid())
      this.$emit('select-shipping', this.selectedShipping)
    }
  }
}
</script>

<style>

</style>
