<template>
<v-container>
  <v-layout column ml-6 mt-2>
    <v-row>
      <v-layout column>
            <strong>Firstname</strong>
            <span class="mt-2">{{ user.firstname }}</span>
      </v-layout>
      <v-layout column>
        <strong>Lastname</strong>
        <span class="mt-2">{{ user.lastname }}</span>
      </v-layout>
    </v-row>
    <v-row>
       <v-layout column mt-4 mb-4>
        <strong>Email</strong>
        <span class="mt-2">{{ user.email }}</span>
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
