<template>
  <v-content>
    <!-- <header-main /> -->
    <div class="ml-12 my-5 mt-9">
       <v-btn
         small
         text
         color="grey"
         to="/products"
       >
         <v-icon>mdi-chevron-left</v-icon>
         Back to all
      </v-btn>
    </div>
    <div class="my-5 mt-9">
      <span class="headline font-weight-medium ml-12 my-6">{{product.name}}</span>
      <v-layout row>
        <!-- Image Coursel -->
        <v-layout column mt-4 ml-12>
        <img width="500" height="400" :src="`https://static.sifawear.ml${currentImage}`" />
          <div class="actions">
            <v-layout align-center>
              <span @click="prevImage" class="prev">
                 <v-icon>mdi-chevron-left </v-icon>
              </span>
              <!-- thumbnails -->
              <v-card v-for="(image, index) in this.getImages()"
                 :key="image._id"
                 :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                 @click="activateImage(index)" class="d-flex flex-row ma-1 mt-6"
              >
                  <img width="80" height="80" :src="`https://static.sifawear.ml${image.path}`"/>
              </v-card >
            <!-- ---------- -->
              <span @click="nextImage" class="next">
                <v-icon>mdi-chevron-right </v-icon>
              </span>
            </v-layout>
          </div>
        </v-layout>
        <!--  -->
        <v-layout column style="width:500px" mr-12>
           <view-product-item :product="product" />
           <v-btn @click.stop="uploadImg = true" color="orange">Upload</v-btn>
        </v-layout>
      </v-layout>
    </div>
  <v-switch></v-switch>
     <v-dialog
          v-model="uploadImg"
          max-width="80vw"
          transition="dialog-transition"
      >
        <v-card>
          <image-upload />
        </v-card>
      </v-dialog>
  </v-content>
</template>

<script>
// import Header from '@/dashboard/components/header/index.vue'
import ProductDetails from '@/components/products/view-item'
import ImageUpload from '@/components/products/image-upload'

export default {
  components: {
    // 'header-main': Header,
    'view-product-item': ProductDetails,
    'image-upload': ImageUpload
  },
  data () {
    return {
      uploadImg: false,
      imageLinks: [],
      startingImage: 1,
      activeImage: 0
    }
  },
  created () {
    if (!this.product.name) {
      this.$store.dispatch('productById', this.$route.params.id)
    }
    // Check if startingImage prop was given and if the index is inside the images array bounds
    if (this.startingImage && this.startingImage >= 0 && this.startingImage < this.product.imageLinks.length) {
      this.activeImage = this.startingImage
      return console.log(this.startingImage)
    }
  },
  computed: {
    product () {
      return this.$store.getters.productById(this.$route.params.id)
    },
    currentImage () {
      return this.getImages()[this.activeImage].path
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
      // if (this.product.imageLinks === [] && this.product.imageLinks === '') {
      //   return console.log('no images')
      // } else {
      for (let i = 0; i < this.product.imageLinks.length; i++) {
        // console.log(this.product.imageLinks)
        // eslint-disable-next-line no-return-assign
        return this.product.imageLinks
      }
      // }
    },
    nextImage () {
      let active = this.activeImage + 1
      if (active >= this.getImages().length) {
        active = 0
      }
      this.activateImage(active)
    },
    // Go backwards on the images array
    // or go at the last image
    prevImage () {
      var active = this.activeImage - 1
      if (active < 0) {
        active = this.getImages().length - 1
      }
      this.activateImage(active)
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
