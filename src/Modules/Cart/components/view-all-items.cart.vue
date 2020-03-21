<template>
 <v-content class="ma-3">
   <v-flex xs8>
   <v-card min-width="700">
   <v-layout row justify-center align-center>
       <img class="ml-6 red" :src="`https://static.sifawear.ml${currentImage}`" width="100vw" height="100" />
       <v-col>
        <div class="font-weight-medium ma-3">
         <router-link :to="{ path: '/product/'+product._id }" class="font-weight-bold">
          <i style="height:60px!important">{{ product.name }}</i>
         </router-link>
          <product-button :product="product"></product-button>
        </div>
       </v-col>
        <v-spacer />
       <v-combobox
            :items="productquantity"
            v-model="product.quantity"
            suffix="qty"
            color="grey darken-3 elevation-0"
            style="width:8px!important"
            class="mr-8 mt-5"
            small
            outlined
            rounded
            dense
        >
        </v-combobox>
        <v-card-actions>
          <span class="font-weight-bold mr-8"> {{ product.price }}.00 Kshs</span>
        </v-card-actions>
   </v-layout>
  </v-card>
   </v-flex>
 </v-content>
</template>

<script>
import ProductBtns from '@/components/Buttons/product.button'

export default {
  props: ['product'],
  components: {
    'product-button': ProductBtns
  },
  data () {
    return {
      productquantity: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ],
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

<style scoped>
._truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
