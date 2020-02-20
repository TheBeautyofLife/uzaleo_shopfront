<template>
  <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
  >
      <span class="headline font-weight-medium">Vue-Shop</span>
      <v-spacer />
        <v-layout row justify-end align-center>
            <router-link class="ma-2 mt-4" text to="/">
                Shop
            </router-link>
            <v-btn class="ma-2"  icon to='/cart'>
                <v-row class="justify-center align-center"><v-icon>mdi-cart</v-icon><span class="box body-2 text-center font-weight-black">{{itemsInCart}}</span> </v-row>
            </v-btn>
        </v-layout>
  </v-app-bar>

</template>

<script>
export default {

}
</script>

<style>
a {
    color: black !important;
    text-decoration: none;
}
span.box{
    display: flex;
    background-color: grey;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
}

</style>
