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
export default {
  name: 'view-product-item',
  props: ['product'],
  components: {
    //
  },
  data () {
    return {
      images: {
        normal_size: [
          {
            id: 1,
            url: 'https://i.ibb.co/b1w1ZKN/chakra-bracelet.jpg'
          },
          {
            id: 2,
            url: 'https://i.ibb.co/rH2XDxm/buddha-bracelet-for-men.jpg'
          },
          {
            id: 3,
            url: 'https://i.ibb.co/pPs0PqB/black-buddha-bracelet.jpg'
          }
        ]
      },

      zoomerOptions: {
        zoomFactor: 4,
        pane: 'container-round',
        hoverDelay: 300,
        namespace: 'inline-round-zoomer',
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: '#bbdefb'
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
