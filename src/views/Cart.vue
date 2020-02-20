<template>
  <v-content>
    <Header/>
     <v-container class="my-12">
      <v-row>
        <v-card>
          <v-img src="" />
          <v-card-title>
            Product
          </v-card-title>
          <v-card-text>
            <v-row>
            <span class="ma-3">Product Description</span>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <span class="font-weight-bold ma-3">0.00 Kshs</span>
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

    }
  },
  mounted () {
    axios.get('https://my-json-server.typicode.com/TheBeautyofLife/ecommerse_test_server/products/')
      .then(res => {
        // this.$cookies.set('unitId', res.data.unit._id)
        console.log(res.data)
      }).catch(err => {
        this.errors.push(err)
      })
  }
}
</script>

<style>

</style>
