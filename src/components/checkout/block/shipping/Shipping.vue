<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <v-row>
      <v-layout column mb-3>
         <strong>Shipping address</strong>
      </v-layout>
    </v-row>
    <v-row>
        <v-layout column>
            <strong>County</strong>
            <span class="mt-2">{{ user.region }}</span>
       </v-layout>
    </v-row>
     <v-row>
        <v-layout column mt-4>
            <strong>City</strong>
            <span class="mt-2">{{ user.city }}</span>
       </v-layout>
    </v-row>
    <v-row>
        <v-layout column mt-4>
            <strong>Address</strong>
            <span class="mt-2">{{ user.address }}</span>
       </v-layout>
    </v-row>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  computed: {
    user () {
      const getItems = this.$cookies.get('user')
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // console.log(getItems)
      return getItems
    }
  }
}
</script>

<style>

</style>
