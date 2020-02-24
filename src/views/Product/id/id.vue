<template>
  <v-content>
      <header-main />
    <v-container class="my-12">
        <div class="divider">
        <v-breadcrumbs :items="breadcrumbs" :divider="divider" class="breadcrumb">
            <template v-slot:divider>
               <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </div>
        <v-layout column>
            <v-layout wrap my-7 pb-8 pl-8 pt-8 class="white elevation-1">
                <v-layout column justify-center align-center>
                    <v-row>
                      <v-card flat v-for="image of images" :key="image.id" class="ma-2">
                          <img :src="image.url" width="150" height="auto"/>
                      </v-card>
                    </v-row>
                </v-layout>
                <v-card flat class="mr-9">
                    <v-card-title>
                        {{ name }}
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <span class="ma-3"> {{ description }}</span>
                        </v-row>
                    </v-card-text>
                    <span>
                         <span class="font-weight-bold ma-3"> {{ price }}.00 Kshs</span>
                    </span>
                    <v-divider class="py-8" />
                <v-card-actions>
                    <product-button-2 :product="product" />
                </v-card-actions>
        </v-card>
            </v-layout>
        </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import * as axios from 'axios'
import Header from '@/components/header/index.vue'
import Productbtn from '../../../components/product/product-btn-2'

export default {
  props: ['product'],
  components: {
    'header-main': Header,
    // eslint-disable-next-line vue/no-unused-components
    'product-button-2': Productbtn
  },
  data () {
    return {
      images: [],
      name: '',
      image: '',
      price: '',
      description: '',
      divider: '',
      breadcrumbs: [
        {
          text: 'Shop',
          disabled: false,
          href: '/'
        },
        {
          text: `${this.$cookies.get('productname')}`,
          disabled: true,
          href: '#'
        }
      ]
    }
  },
  created () {
    axios.get(`https://my-json-server.typicode.com/TheBeautyofLife/ecommerse_test_server/products/${this.$route.params.id}`)
      .then(res => {
        this.$cookies.set('productname', res.data.name)
      }).catch(err => {
        this.errors.push(err)
      })

    axios.get(`https://my-json-server.typicode.com/TheBeautyofLife/ecommerse_test_server/products/${this.$route.params.id}`)
      .then(res => {
        this.images = res.data.images
        this.name = res.data.name
        this.image = res.data.image
        this.price = res.data.price
        this.description = res.data.description
      }).catch(err => {
        this.errors.push(err)
      })
  }
}
</script>

<style>

</style>
