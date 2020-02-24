/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-return-assign */
/* eslint-disable no-return-assign */
<template>
 <v-content class="ma-3">
   <v-flex xs8>
   <v-card min-width="600">
   <v-layout row justify-center align-center>
      <img class="ml-5" :src="product.image" width="100" height="90" />
       <v-col>
        <div class="font-weight-medium ma-3">
          {{ product.name }}
          <product-button :product="product"></product-button>
        </div>
       </v-col>
        <v-spacer />
          <v-text-field
            v-model="product.quantity"
            name="qty"
            color="grey darken-3 elevation-0"
            small
            outlined
            suffix="qty"
            style="width:8px!important"
            class="mr-8"
            dense
            v-if="cookieQty"
          >
          </v-text-field>
        <v-card-actions>
          <span class="font-weight-bold mr-8"> {{ product.price}}.00 Kshs</span>
        </v-card-actions>
   </v-layout>
  </v-card>
   </v-flex>
 </v-content>
</template>

<script>
import ProductButton from '../../components/product/product-btn'
export default {
  props: ['product'],
  components: {
    'product-button': ProductButton
  },
  computed: {
    cookieQty () {
      this.$cookies.set('_qty_default.', 1)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.product.quantity = 1)
    }
  }
}
</script>
