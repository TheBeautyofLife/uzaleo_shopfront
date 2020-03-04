<template>
  <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target=""
      class="elevation-1"
  >
      <span class="headline font-weight-medium">
        <v-row class="ml-4">
        <v-img :src="require('@/assets/logo.svg')" width="120"/>
        <v-layout class="ml-2 grey--text" align-center>
          <v-divider class="mr-3 ml-2" vertical></v-divider>
          <div class="title">Dashboard</div>
        </v-layout>
        </v-row>
      </span>
      <v-spacer />
        <v-layout row justify-end align-center>
          <user-auth />
        </v-layout>
  </v-app-bar>
</template>

<script>
import Auth from './items/user-auth'

export default {
  components: {
    'user-auth': Auth
  }
}
</script>

<style>
a {
    color: black !important;
    text-decoration: none;
}
</style>
