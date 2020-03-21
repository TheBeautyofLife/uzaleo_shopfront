<template>
  <v-content>
       <v-img class="light-blue lighten-2" :src="`https://static.sifawear.ml${currentImage}`" width="230" height="200" />
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
import ProductBtns from '@/components/Buttons/product.button'

export default {
  name: 'product-item',
  props: ['product'],
  components: {
    'product-button': ProductBtns
  },
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
