<template>
  <v-layout column ml-6 mt-2>
        <v-layout row class="pb-0 my-0">
              <v-card-text>
                  <span class="subtitle-1
                  font-weight-medium mr-6"
                  >
                      {{ product.name }}
                  </span>
                  <span class="subtitle-1
                  font-weight-bold mr-6">
                      {{  product.quantity }} Qty
                  </span>
                  <span class="subtitle-1
                  font-weight-bold mr-6">
                      <!-- {{  product.price }}.00 Kshs -->
                  </span>
            </v-card-text>
        </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    //
  }

}
</script>

<style>

</style>
