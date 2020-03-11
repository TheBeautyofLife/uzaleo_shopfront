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
          max-width="80vw"
          transition="dialog-transition"
      >
        <v-card>
          <image-upload />
        </v-card>
      </v-dialog>
    </div>
  </v-content>
</template>

<script>
import Header from '@/dashboard/components/header/index.vue'
import ProductDetails from '@/dashboard/components/products/view-item'
import ImageUpload from '@/dashboard/components/products/image-upload'

export default {
  components: {
    'header-main': Header,
    'view-product-item': ProductDetails,
    'image-upload': ImageUpload
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
