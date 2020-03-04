<template>
   <v-card outlined flat class=" mb-2 pa-4" width="300">
        <v-layout  justify-start>
          <v-img class="red ma-4 fixedimages" :src="product.image" />
          <span class="font-weight-medium mt-4">
              <router-link :to="{ path: '/product/'+product._id }">{{ product.name }}</router-link>
          </span>
        </v-layout>
        <v-layout row justify-space-around mt-4 mb-3>
              <small class="font-weight-bold"> {{ product.quantity }} qty</small>
              <small class="font-weight-bold"> {{ product.price}}.00 Kshs</small>
        </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['product'],
  components: {
  },
  computed: {
    cookieQty () {
      this.$cookies.set('_qty_default.', 1)
      // console.log(this.product)
      // return (this.product.quantity = this.$cookies.get('_qty_default.'))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.product.quantity = 1)
    }
  }
}
</script>

<style scoped>
.fixedimages {
  width:auto;
  height:60px!important;
  max-width: 60px;
  }
</style>
