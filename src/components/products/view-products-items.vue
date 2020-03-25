<template>
  <div>
   <v-img class="light-blue lighten-2 ma-2"  :src="`https://static.sifawear.ml${currentImage}`" width="50" height="50" style="border-radius:25px" />
  </div>
</template>

<script>
export default {
  name: 'view-products-items',
  props: ['product'],
  // props: { product: { type: Object, default: () => ({}) }},
  data () {
    return {
      imageLinks: [],
      startingImage: 0,
      activeImage: 0
    }
  },
  computed: {
    currentImage () {
      return this.getImages()[this.activeImage].path
    }
  },
  created () {
    // Check if startingImage prop was given and if the index is inside the images array bounds
    if (this.product.startingImage && this.product.startingImage >= 0 && this.product.startingImage < this.product.imageLinks.length) {
      this.activeImage = this.product.startingImage
      return console.log(this.product.startingImage)
    }
  },
  methods: {
    getImages () {
      for (let i = 0; i < this.product.imageLinks.length; i++) {
        // console.log(this.product.imageLinks)
        // eslint-disable-next-line no-return-assign
        return this.product.imageLinks
      }
    }
  }

}
</script>
