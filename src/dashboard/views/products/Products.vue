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
 <v-dialog
      v-model="SuccessfullyCreated"
      persistent
      :overlay="false"
       max-width="500px"
      transition="dialog-transition"
    >
      <v-card height="80vh">
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
    <!-- <div
      v-show="ifEmpty"
      max-width="500px"
    >
        <v-card>
          <span>No products added</span>
        </v-card>
    </div> -->
  </v-content>
</template>

<script>
import Header from '@/dashboard/components/header/index.vue'
import ProductItems from '@/dashboard/components/products/view-products-items.vue'
import AddProduct from '@/dashboard/components/products/add-product.vue'
import ImageUpload from '@/dashboard/components/products/image-upload.form.vue'

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
          href: '/admin'
        },
        {
          text: 'Manage Products',
          disabled: true,
          href: '#'
        }
      ],
      SuccessfullyCreated: false,
      recentlyAddedItem: []
    }
  },
  components: {
    'header-main': Header,
    'view-products-items': ProductItems,
    'add-products': AddProduct,
    'image-upload': ImageUpload
  },
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
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
    // getDate () {
    //   const getDateString = function (date, format) {
    //     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     const getPaddedComp = function (comp) {
    //       return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
    //     }
    //     let formattedDate = format
    //     const o = {
    //       'y+': date.getFullYear(), // year
    //       'M+': months[date.getMonth()], // month
    //       'd+': getPaddedComp(date.getDate()), // day
    //       'h+': getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), // hour
    //       'H+': getPaddedComp(date.getHours()), // hour
    //       'm+': getPaddedComp(date.getMinutes()), // minute
    //       's+': getPaddedComp(date.getSeconds()), // second
    //       'S+': getPaddedComp(date.getMilliseconds()), // millisecond,
    //       'b+': (date.getHours() >= 12) ? 'PM' : 'AM'
    //     }

    //     for (var k in o) {
    //       if (new RegExp('(' + k + ')').test(format)) {
    //         formattedDate = formattedDate.replace(RegExp.$1, o[k])
    //       }
    //     }
    //     return formattedDate
    //   }
    //   const date = this.recentlItem.created_at
    //   const formatedDate = getDateString(new Date(date), 'd M y')
    //   return formatedDate
    // },
    clear () {
      this.model = []
    },
    closeForm () {
      this.SuccessfullyCreated = false
      location.reload()
    }
  },
  computed: {
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
</style>
