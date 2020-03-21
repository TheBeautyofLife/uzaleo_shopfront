<template>
  <v-content>
    <header-main />
    <v-container class="my-12">
      <span class="diaplay-1">Shop</span>
      <v-row>
        <v-card flat :hover='true' class="ma-3"
          v-for="product of products"
          :key="product._id"
          style="width:230px"
        >
          <product-item :product="product"></product-item>
          <v-btn text :to="{ path: '/product/'+product._id }" class="text-lowercase">View More</v-btn>
        </v-card>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Header from '@/components/Header/index.header'
import ProductItem from '@/Modules/Product/index.product'

export default {
  name: 'Home',
  components: {
    'header-main': Header,
    'product-item': ProductItem
  },

  data () {
    return {
    //
    }
  },
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
    }
  },
  computed: {
    products () {
      return this.$store.getters.allProducts
    }
  }
}
</script>

<style>

</style>
