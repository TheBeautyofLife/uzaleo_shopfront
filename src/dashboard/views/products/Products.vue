<template>
  <v-content>
   <header-main />
    <v-container class="mt-6">

      <v-layout column justify-start my-12>
         <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" :divider="divider">
            <template v-slot:divider>
               <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <!-- *************** -->
        <span class="headline font-weight-medium mt-3">
            Products
            <strong class="ml-2">({{products.length}})</strong>
            </span>
      </v-layout>
      <v-flex xs12>
        <v-layout row wrap>
            <v-card
            flat
            :hover='true'
            class="ma-2"
            v-for="product of products"
            :key="product._id"
             style="width:230px"
            >
            <view-products-items :product="product" />
            <v-layout row wrap ml-6 mb-3>
                <v-btn
                  :to="{ path: '/admin/product/'+ product._id }"
                  small
                  color="success"
                  dark
                  >Modify</v-btn>
                <v-spacer></v-spacer>
                <v-btn small icon class="mr-6" color="success">
                  <v-icon color="red" @click="deleteItem(product._id)">mdi-delete-outline</v-icon>
                </v-btn>
            </v-layout>
        </v-card>
        <v-card
          flat
          :hover='true'
          class="ma-4 box"
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

    <div
      v-show="ifEmpty"
      max-width="500px"
    >
        <v-card>
          <span>No products added</span>
        </v-card>
    </div>
  </v-content>
</template>

<script>
import Header from '@/dashboard/components/header/index.vue'
import ProductItems from '@/dashboard/components/products/view-products-items.vue'
import AddProduct from '@/dashboard/components/products/add-product.vue'

export default {
  name: 'Products',
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
          href: '/admin'
        },
        {
          text: 'Manage Products',
          disabled: true,
          href: '#'
        }
      ]
    }
  },
  components: {
    'header-main': Header,
    'view-products-items': ProductItems,
    'add-products': AddProduct
  },
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
    }
  },
  methods: {
    addProduct (model) {
      // console.log('model', model)
      this.$store.dispatch('addProduct', model).then(() => {
        this.addproduct = false
        this.model = ''
        // location.reload()
      })
    },
    deleteItem (id) {
      this.$store.dispatch('removeProduct', id).then(() => {
        // location.reload()
      }).catch(() => {
        console.log('not deleted')
      })
    }
  },
  computed: {
    products () {
      return this.$store.getters.allProducts
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px dashed grey
}
</style>
