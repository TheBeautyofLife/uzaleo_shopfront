<template>
  <v-content>
   <v-img class="light-blue lighten-2" :src="product.image" width="230" height="200" />
     <v-layout column wra justify-start pa-3>
        <v-card-title class="col col-12 d-block text-truncate">
          {{ product.name }}
        </v-card-title>
          <span class="font-weight-bold ma-3"> {{ product.price }}.00 Kshs</span>
     </v-layout>
    </v-content>
</template>

<script>
export default {
  name: 'view-products-items',
  props: ['product']

}
</script>

<style>

</style>
