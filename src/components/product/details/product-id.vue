/* eslint-disable no-return-assign */
<template>
    <v-layout column>
            <v-layout wrap my-7 pb-8 pl-8 pt-8 class="white elevation-1">
                <v-layout column justify-center align-center>
                    <v-col>
                        <!-- <div>{{ getImage() }}</div> -->
                        <div class="ml-5">
                            <v-img v-if="defaultShow" :src="product.image" alt="" width="510" />
                             <v-img :src="this.selectedImage" alt="" width="510" />
                            <!-- {{ this.SelectedItem}} -->
                        </div>
                    </v-col>
                    <v-row>
                        <v-card class="ma-2" flat v-for="image of getImage()" @click="showProduct(image)" :key="image._id">
                            <img :src="image.url" width="130" height="100">
                        </v-card>
                    </v-row>
                </v-layout>
                <v-card flat class="mr-9">
                    <v-card-title>
                        {{ product.name }}
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <span class="ma-3"> {{ product.description }}</span>
                        </v-row>
                    </v-card-text>
                    <span>
                         <span class="font-weight-bold ma-3"> {{  product.price }}.00 Kshs</span>
                    </span>
                    <v-divider class="py-8" />
                <v-card-actions>
                    <v-col>
                        <product-button-2 :product="product" />
                        <v-btn small block text class="mt-4" color="" to="/cart">Go to Cart</v-btn>
                    </v-col>
                </v-card-actions>
        </v-card>
            </v-layout>
        </v-layout>
</template>

<script>
import ProductButton from '../../../components/product/buttons/product-btn-2'
export default {
  props: ['product'],
  components: {
    'product-button-2': ProductButton
  },
  data () {
    return {
      SelectItem: {},
      selectedImage: '',
      defaultShow: true
    }
  },
  methods: {
    getImage () {
      const img = this.product.images
      return img
    },
    showProduct (id) {
      // eslint-disable-next-line no-return-assign
      this.SelectedItem = id
      this.selectedImage = id.url

      const first = (this.SelectedItem.id)
      this.defaultShow = false
      console.log(first)
    },

    ProductItem () {
      return console.log(this.SelectedItem)
    }
  }
}
</script>

<style>

</style>
