<template>
  <v-content>
      <v-img class="light-blue lighten-2" :src="product.image" width="230" height="200" />
        <v-card-title class="col col-12 d-block text-truncate">
          {{ product.name }}
        </v-card-title>
        <!-- <v-card-text>
          {{ product.description }}
        </v-card-text> -->
        <v-card-actions>
          <span class="font-weight-bold ma-3"> {{ product.price }}.00 Kshs</span>
          <v-spacer></v-spacer>
          <product-button :product="product"></product-button>
        </v-card-actions>
  </v-content>
</template>

<script>
import ProductBtns from '../../components/product/buttons/product-btn'

export default {
  name: 'product-item',
  props: ['product'],
  components: {
    'product-button': ProductBtns
  }
}
</script>

<style>

</style>
