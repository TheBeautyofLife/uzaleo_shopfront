<template>
  <v-app>
      <v-content>
        <router-view />
      </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
    // Header
  },
  computed: {
    // cartItemsCount () {
    //   return this.cartItems.length
    // },
    showLoader () {
      return this.$store.state.showLoader
    }
  }
}
</script>
