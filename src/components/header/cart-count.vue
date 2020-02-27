<template>
<v-card flat to='/cart' class="mr-8">
    <v-badge
        :content="itemsInCart"
        :value="itemsInCart"
        color="#204F8C"
        overlap
        class="font-weigth-bold"
    >
        <v-icon>mdi-cart</v-icon>
    </v-badge>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      cartItems: this.$store.state.cart,
      show: false
    }
  },
  created () {
    // this.$store.subscribe((mutation) => {
    //   if (mutation.payload) {
    //     switch (mutation.type) {
    //       case ERROR_MSG:
    //         toastr.error(mutation.payload.content, mutation.payload.title)
    //         break
    //       case ADD_PRODUCT_SUCCESS:
    //         toastr.success('Product created.', 'Success!')
    //         break
    //       case UPDATE_PRODUCT_SUCCESS:
    //         toastr.success('Product updated.', 'Success!')
    //         break
    //       case REMOVE_PRODUCT_SUCCESS:
    //         toastr.warning('Product deleted.', 'Deleted!')
    //         break
    //     }
    //   }
    // })
  },
  computed: {
    itemsInCart () {
      return this.cartItems.length
    },
    showLoader () {
      return this.$store.state.showLoader
    }
  }
}
</script>

<style>
span.box{
    display: flex;
    border-radius: 100%;
    width: 70px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
}
span.box2{
    display: flex;
    background-color: grey;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
    z-index: -1;
}
</style>
