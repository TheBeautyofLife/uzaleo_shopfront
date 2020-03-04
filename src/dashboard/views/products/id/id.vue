<template>
  <v-content>
    <header-main />
    <div class="ml-12 my-5 mt-9">
       <v-btn text
       color="grey"
       to="/admin/products"
       >
            <v-icon>mdi-</v-icon>
            Back to all
         </v-btn>
    </div>
    <div class="ml-12 my-5 mt-9">
      <span class="headline font-weight-medium ml-12 my-6">{{product.name}}</span>
            <view-product-item :product="product" />
            <v-btn @click.stop="uploadImg = true" color="orange" class="ml-9">Upload</v-btn>

      <v-dialog
          v-model="uploadImg"
          max-width="500px"
          transition="dialog-transition"
      >
        <v-card>
            <v-card-title>
                Upload
            </v-card-title>
            <form @submit.prevent="uploadImages" class="pa-5">
                <v-layout row>
                     <v-img :src="image1" width="120" class="ma-2" />
                     <v-img :src="image2" width="120" class="ma-2" />
                     <v-img :src="image3" width="120" class="ma-2" />
                </v-layout>

                <v-text-field
                    name="Image1"
                    label="Image url 1"
                    v-model="image1"
                >
               </v-text-field>
                 <v-text-field
                    name="Image2"
                    label="Image url 2"
                    v-model="image2"
                ></v-text-field>
                 <v-text-field
                    name="Image2"
                    label="Image url 3"
                    v-model="image3"
                ></v-text-field>
                <v-layout row wrap justify-end>
                    <v-btn @click="uploadImg = false" text color="grey">cancel</v-btn>
                    <v-btn color="blue lighten-2" type="submit">Submit</v-btn>
                </v-layout>
            </form>
        </v-card>
      </v-dialog>
    </div>
  </v-content>
</template>

<script>
import Header from '@/dashboard/components/header/index.vue'
import ProductDetails from '@/dashboard/components/products/view-item'
// import { API_BASE } from '@/config'

export default {
  components: {
    'header-main': Header,
    'view-product-item': ProductDetails
  },
  data () {
    return {
      uploadImg: false,
      imageLinks: [],
      image1: '',
      image2: '',
      image3: ''
    }
  },
  created () {
    if (!this.product.name) {
      this.$store.dispatch('productById', this.$route.params.id)
    }
  },
  computed: {
    product () {
      return this.$store.getters.productById(this.$route.params.id)
    }
  },
  methods: {
    uploadImages () {
      this.imageLinks = [
        this.image1,
        this.image2,
        this.image3
      ]
      const length = this.imageLinks.length
      console.log(length)

      const data = {
        productId: this.$route.params.id,
        imageLinks: this.imageLinks,
        length: length
      }
      console.log(data)
    //   this.$http.post(`${API_BASE}/image/v1/products/images/create`, data).then(() => {
    //     console.log('uploaded')
    //   })
    },
    getImages () {
      console.log(this.product.imageLinks)
    }
  }
}
</script>

<style>

</style>
