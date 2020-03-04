<template>
  <v-content>
      <header-main />
    <v-container class="my-12">
        <div class="divider">
          <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" :divider="divider" class="breadcrumb">
            <template v-slot:divider>
               <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <!-- *************** -->
    </div>
      <div>
    <product-details :product="product" :isAdding="true"></product-details>
  </div>
    </v-container>
  </v-content>
</template>

<script>
import Header from '@/components/header/index.vue'
import ProductDetails from '../../../components/product/details/product-id'

export default {
  components: {
    'header-main': Header,
    // eslint-disable-next-line vue/no-unused-components
    'product-details': ProductDetails
  },
  data () {
    return {
      divider: '',
      breadcrumbs: [
        {
          text: 'Shop',
          disabled: false,
          href: '/'
        },
        {
          text: `${this.$cookies.get('productname')}`,
          disabled: true,
          href: '#'
        }
      ]
    }
  },
  created () {
    if (!this.product.name) {
      this.$store.dispatch('productById', this.$route.params.id)
    }
  },
  computed: {
    product () {
      return this.$store.getters.productById(this.$route.params.id)
    }
  }
}
</script>

<style>

</style>
