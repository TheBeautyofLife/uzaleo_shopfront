<template>
  <v-layout column ml-6 mt-2>
    <v-layout row class="pb-0 my-0">
      <div class="d-flex flex-row align-center">
        <v-img class="light-blue lighten-2 mr-3" :src="`https://static.sifawear.ml${currentImage}`" width="70" height="70" />
          <p class="subtitle-1
            font-weight-medium mr-6">{{ product.name }}</p>
          <p class="subtitle-1
            font-weight-bold mr-6"> {{  product.quantity }} Qty
          </p>
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      startingImage: 0,
      activeImage: 0
    }
  },
  created () {
    // Check if startingImage prop was given and if the index is inside the images array bounds
    if (this.product.startingImage && this.product.startingImage >= 0 && this.product.startingImage < this.product.imageLinks.length) {
      this.activeImage = this.product.startingImage
      return console.log(this.product.startingImage)
    }
  },
  computed: {
    cookieQty () {
      this.$cookies.set('_qty_default.', 1)
      console.log(this.product.quantity)
      // return (this.product.quantity = this.$cookies.get('_qty_default.'))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const selected = this.product.quantity = 1
      return selected
    },
    currentImage () {
      return this.getImages()[this.activeImage].path
    }
  },
  methods: {
    getImages () {
      for (let i = 0; i < this.product.imageLinks.length; i++) {
        // console.log(this.product.imageLinks)
        // eslint-disable-next-line no-return-assign
        return this.product.imageLinks
      }
    },
    activateImage (imageIndex) {
      console.log(imageIndex)
      // imageIndex = 1
      this.activeImage = imageIndex
    }
  }

}
</script>

<style>

</style>
