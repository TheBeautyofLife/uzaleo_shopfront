<template>
    <v-col>
      <p class="subtitle-1 font-weight-medium"> Product name: {{ product.name }}</p>
      <p><i class="font-weight-bold">Product price:</i> {{ product.description }}</p>
      <p><i class="font-weight-bold">Product price:</i> {{  product.price }}.00 Kshs</p>
      <p><i class="font-weight-bold ">Products status:</i> <strong class="green--text">{{  product.status }}</strong></p>
   </v-col>
</template>

<script>
export default {
  name: 'view-product-item',
  props: ['product'],
  components: {
    // ProductZoomer
    // eslint-disable-next-line vue/no-unused-components
  },
  data () {
    return {
      //
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
.thumbnail-image {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.thumbnail-image > img {
    transition: all 250ms;
}
.thumbnail-image:hover > img,
.thumbnail-image.active > img {
    opacity: 0.6;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0, 0.5);
}
</style>
