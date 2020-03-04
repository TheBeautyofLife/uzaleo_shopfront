<template>
 <v-content class="ma-3">
   <v-flex xs8>
   <v-card min-width="700">
   <v-layout row justify-center align-center>
      <v-img class="ml-5 red" :src="product.image" width="100" height="90" />
       <v-col>
        <div class="font-weight-medium ma-3">
         <router-link :to="{ path: '/product/'+product._id }" class="font-weight-bold">
          <i style="height:60px!important">{{ product.name }}</i>
         </router-link>
          <product-button :product="product"></product-button>
        </div>
       </v-col>
        <v-spacer />
        <v-select
          :items="productquantity"
          v-model="product.quantity"
          suffix="qty"
              name="qty"
            color="grey darken-3 elevation-0"
            style="width:8px!important"
            class="mr-8"
            small
            outlined
            dense
        ></v-select>
        <v-card-actions>
          <span class="font-weight-bold mr-8"> {{ product.price }}.00 Kshs</span>
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
  data () {
    return {
      productquantity: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ]
    }
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

<style scoped>
._truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
