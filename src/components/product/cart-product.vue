<template>
 <v-content>
   <v-row>
      <img :src="product.image" width="100" height="90" />
        <v-card-title>
          {{ product.name }}
        </v-card-title>
        <v-spacer />
        <v-card-actions>
          <span class="font-weight-bold ma-3"> {{ product.price}}.00 Kshs</span>
          <product-button :product="product"></product-button>
        </v-card-actions>
    </v-row>
 </v-content>
</template>

<script>
import ProductButton from '../../components/product/product-btn'
export default {
  props: ['product'],
  components: {
    'product-button': ProductButton
  }
}
</script>
