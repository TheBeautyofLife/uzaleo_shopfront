<template>
  <v-app>
      <v-content>
        <router-view/>
           <div class="d-flex justify-center align-center mt-12">
          <v-progress-circular color="grey ligthen-3" v-show="showLoader"  indeterminate
          ></v-progress-circular>
        </div>
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

  },
  methods: {
    // handler: function handler (event) {
    //   console.log('refreshed')
    // }
  }
  // created () {
  //   window.addEventListener('beforeunload', function (event) {
  //     event.returnValue = 'Write something'
  //   })
  // }
}
</script>

<style>
.background_default {
  background-color: aqua!important;
}
.theme--light .container{
  background: #F5F5F5!important;
}

</style>
