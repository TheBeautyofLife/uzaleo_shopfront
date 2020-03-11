/* eslint-disable quote-props */
<template>
    <v-layout row ml-4>
        <v-col class="ml-9 mt-2">
            <ProductZoomer
              :base-images="images"
              :base-zoomer-options="zoomerOptions"
            />
        <div class="mt-6">
            <v-col>
           <p class="subtitle-1 font-weight-medium"> Product name: {{ product.name }}</p>
              <p><i class="font-weight-bold">Product price:</i> {{ product.description }}</p>
              <p><i class="font-weight-bold">Product price:</i> {{  product.price }}.00 Kshs</p>
           </v-col>
        </div>
        </v-col>
        <v-col>
        </v-col>
    </v-layout>
</template>

<script>
// import ProductZoomer from 'vue-product-zoomer'
// Vue.use(ProductZoomer)
export default {
  name: 'view-product-item',
  props: ['product'],
  components: {
    // ProductZoomer
  },
  data () {
    return {
      images: {
        thumbs: [
          {
            id: 1,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/thumbs/1.jpeg'
          },
          {
            id: 2,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/thumbs/2.jpeg'
          }
        ],
        normal_size: [
          {
            id: 1,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/normal_size/1.jpeg'
          },
          {
            id: 2,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/normal_size/2.jpeg'
          }
        ],
        large_size: [
          {
            id: 1,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/large_size/1.jpeg'
          },
          {
            id: 2,
            url:
              'http://yoohooworld.com/images/vue-product-zoomer/images/large_size/2.jpeg'
          }
        ]
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: 'container',
        hoverDelay: 300,
        namespace: 'container-zoomer',
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: '#ff3d00'
      }
    }
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
