<template>
 <v-content class="ma-3">
   <v-flex xs8>
   <v-card min-width="700">
   <v-layout row justify-center align-center>
      <v-img class="ml-5" :src="product.image" width="100" height="90" />
       <v-col>
        <div class="font-weight-medium ma-3">
         <router-link :to="{ path: '/product/'+product.id }" class="font-weight-bold"> {{ product.name }} </router-link>
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
import ProductButton from '../../components/product/buttons/product-btn'
export default {
  props: ['product'],
  components: {
    'product-button': ProductButton
  },
  computed: {
    cookieQty () {
      this.$cookies.set('_qty_default.', 1)
      console.log(this.product)
      // return (this.product.quantity = this.$cookies.get('_qty_default.'))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.product.quantity = 1)
    }
  }
}
</script>
