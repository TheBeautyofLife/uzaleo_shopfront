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
        <v-layout column>
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
      isEditing: false
      // user: {}
    }
  },
  created () {
    if (!this.user.name) {
      console.log('dispatched', this.uuid)
      this.$store.dispatch('userById', this.uuid)
    }
  },
  computed: {
    uuid () {
      const userCookies = this.$cookies.get('user')
      const uuid = userCookies._id
      return uuid
    },
    user () {
      const userById = this.$store.getters.userById(this.uuid)
      console.log('data', userById)
      return Object.assign({}, userById)
    }
  }
}
</script>

<style>

</style>
