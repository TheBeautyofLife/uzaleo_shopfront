<template>
  <div>
      <header-main class="white" />
      <navigation-drawer />
    <v-container fluid style="height:100vh">

      <v-layout column justify-center my-1>
        <span class="display-1 font-weight-medium mt-3 mb-5 primarydark--text">
            Products
            <!-- <strong class="ml-2">({{products.length}})</strong> -->
            </span>

      </v-layout>
      <v-flex xs12>
         <v-simple-table fixed-header class="pl-12 pr-12 white elevation-1" style="width:72vw!important;background-color:#fff!important">
             <template v-slot:default >
                <thead>
                    <tr>
                      <th class="text-left primarydark--text subtitle-2 font-weight-bold text-uppercase">Image</th>
                        <th class="text-left primarydark--text subtitle-2 font-weight-bold text-uppercase">Name</th>
                        <th class="text-left primarydark--text subtitle-2 font-weight-bold text-uppercase">Description</th>
                        <th class="text-left primarydark--text subtitle-2 font-weight-bold text-uppercase">Price</th>
                        <th class="text-left primarydark--text subtitle-2 font-weight-bold text-uppercase"> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="product of products"
                         :key="product._id"
                    >
                     <td>
                       <view-products-image :product="product" />
                        </td>
                        <td>{{ product.name }}</td>
                        <td >
                           <div class="truncate"> {{ product.description }}</div>
                        </td>
                        <td>
                          {{ product.price }}.00 Kshs
                        </td>
                        <td>
                          <v-btn small color="red" dark
                           style="border-radius:25px;">
                            <v-icon small color="white" @click="deleteItem(product._id)"
                            >
                              bx bx-trash
                            </v-icon>
                           </v-btn>
                        </td>
                    </tr>
                </tbody>
             </template>
          </v-simple-table>

        <v-layout row wrap>
        <v-card
          flat
          :hover='true'
          class=" box"
          height="140px"
          @click="addproduct = true"
        >
          <v-layout column align-center justify-center my-9>
              <v-card-title primary-title>
                Add Product
              </v-card-title>
            </v-layout>
        </v-card>
        </v-layout>
      </v-flex>
    </v-container>

    <v-dialog
      v-model="addproduct"
      max-width="500px"
    >
      <add-products @save-product="addProduct" :model="model" />
    </v-dialog>
 <v-dialog
      v-model="SuccessfullyCreated"
      persistent
      :overlay="false"
       max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <div class="d-flex justify-end pa-2">
          <v-btn @click="closeForm()" icon><v-icon >mdi-close</v-icon></v-btn>
        </div>
        <div class="pa-1">
          <span class="headline font-weight-medium pl-5 green--text text--darken-1">
            Successfully Created <br/>
          </span>
          <!-- Product Information -->
          <div class="d-flex flex-column pl-5">
             <!-- <span class="body-1 pl-2"> Created on: <small class="caption font-weight-medium" > </small></span> -->
          </div>
           <!-- <span class="pl-7 font-weight-medium">For this </span> -->
          <image-upload />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Header from '@/components/header/index.header.vue'
import navigationDrawer from '@/components/header/navigation.header'
import ProductItems from '@/components/products/view-products-items.vue'
import AddProduct from '@/components/products/add-product.vue'
import ImageUpload from '@/components/products/image-upload.form.vue'

export default {
  name: 'ProductsPage',
  data () {
    return {
      addproduct: false,
      ifEmpty: false,
      model: {
        quantity: 1
      },
      divider: '',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Manage Products',
          disabled: true,
          href: '#'
        }
      ],
      SuccessfullyCreated: false,
      recentlyAddedItem: [],
      imageLinks: [],
      activeImage: 0
    }
  },
  components: {
    'header-main': Header,
    'navigation-drawer': navigationDrawer,
    'view-products-image': ProductItems,
    'add-products': AddProduct,
    'image-upload': ImageUpload
  },
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
    }
    // Check if startingImage prop was given and if the index is inside the images array bounds
    if (this.product.startingImage && this.product.startingImage >= 0 && this.product.startingImage < this.product.imageLinks.length) {
      this.activeImage = this.product.startingImage
      return console.log(this.product.startingImage)
    }
  },
  methods: {
    addProduct (model) {
      // console.log('model', model)
      this.$store.dispatch('addProduct', model).then(i => {
        try {
          this.addproduct = false
          this.SuccessfullyCreated = true
          // this.$cookies.set('recently_added_item', i.data)
          this.clear()
        } catch (e) {
          console.log('error')
        }
      })
    },
    deleteItem (id) {
      this.$store.dispatch('removeProduct', id).then(() => {
        // location.reload()
      }).catch(() => {
        console.log('not deleted')
      })
    },
    clear () {
      this.model = []
    },
    closeForm () {
      this.SuccessfullyCreated = false
      location.reload()
    },
    getImages () {
      for (let i = 0; i < this.product.imageLinks.length; i++) {
        // console.log(this.product.imageLinks)
        // eslint-disable-next-line no-return-assign
        return this.product.imageLinks
      }
    }
  },
  computed: {
    currentImage () {
      return this.getImages()[this.activeImage].path
    },
    products () {
      return this.$store.getters.allProducts
    },
    recentlItem () {
      return this.$cookies.get('recently_added_item')
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px dashed grey
}
.truncate {
  width: 200px!important;
  white-space: nowrap!important;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
}
</style>
