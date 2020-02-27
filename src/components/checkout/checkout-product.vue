<template>
   <v-card outlined flat class="pa-5 mb-2">
      <v-layout column>
        <v-layout row align-center>
          <img class="ma-4" :src="product.image" width="50" height="50" />
          <span class="font-weight-medium">
              {{ product.name }}
          </span>
        </v-layout>
        <v-layout row justify-space-around>
              <small class="font-weight-bold"> {{ product.quantity }} qty</small>
              <small class="font-weight-bold"> {{ product.price}}.00 Kshs</small>
        </v-layout>
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
      console.log(this.product)
      // return (this.product.quantity = this.$cookies.get('_qty_default.'))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.product.quantity = 1)
    }
  }
}
</script>
