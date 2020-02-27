<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <v-row>
      <span class="ma-2">{{ user.username }}</span>
      <span class="ma-2">{{ user.email }}</span>
    </v-row>
    <v-row>
      <span class="ma-2">{{ user.username }}</span>
      <span class="ma-2">{{ }}</span>
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
      console.log(getItems)
      return getItems
    }
  }
}
</script>

<style>

</style>
