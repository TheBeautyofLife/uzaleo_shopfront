<template>
  <v-content>
    <Header />
    <v-container class="my-12">
      <span class="diaplay-1">Shop</span>
      <v-row>
        <v-card class= "ma-2" v-for="product of products" :key="product.id">
          <img :src="product.image" width="250" height="200" />
          <v-card-title>
            {{ product.name }}
          </v-card-title>
          <v-card-text>
            <v-row>
            <span class="ma-3"> {{ product.description}}</span>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <span class="font-weight-bold ma-3"> {{ product.price}}.00 Kshs</span>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import * as axios from 'axios'
import Header from '@/components/header/index.vue'
export default {
  components: {
    Header
  },
  data () {
    return {
      products: []
    }
  },
  mounted () {
    axios.get('https://my-json-server.typicode.com/TheBeautyofLife/ecommerse_test_server/products/')
      .then(res => {
        // this.$cookies.set('unitId', res.data.unit._id)
        this.products = res.data
        console.log(res.data)
      }).catch(err => {
        this.errors.push(err)
      })
  }
}
</script>

<style>

</style>
