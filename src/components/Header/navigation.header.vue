<template>
  <v-navigation-drawer app fixed clipped permanent color="#204F8C" width="227px">
      <router-link to="/" class="mt-12">
          <v-img width="160" class="ml-10 my-5" :src="require('@/assets/logo.svg')"></v-img>
      </router-link>
    <v-toolbar flat color="primary">
        <span class="body-2 white--text ma-4 pl-2">
            <v-layout row justify-center align-center>
                Basic cloud
                <v-btn small class="ma-2"  color="primaryaccent" dark
                style=" height:25px!important;width: 6vw;border-radius:12px!important;">
                    Basic
                </v-btn>
            </v-layout>
        </span>
    </v-toolbar>
        <v-btn to="/" class="transparent elevation-0 white--text font-weight-medium title pr-12">
                  <v-icon color="white" size="20" class="mr-3">bx bx-home-alt</v-icon> Home
            </v-btn>

            <v-btn to="/customers/" class="transparent elevation-0 white--text font-weight-medium title pr-12">
              <v-icon color="white" size="20" class="mr-3">bx bx-group</v-icon>Customers
            </v-btn>

            <v-btn to="/products/" class="transparent elevation-0 white--text font-weight-medium title pr-12">
              <v-icon color="white" size="20" class="mr-3">bx bx-filter</v-icon>Products
            </v-btn>
              <v-btn to="#" class="transparent elevation-0 white--text font-weight-medium title pr-12">
              <v-icon color="white" size="20" class="mr-3">bx bx-pie-chart-alt-2</v-icon>Reports
            </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-btn--contained {
    border-radius:0px!important;
    height: 65px!important;
    width: 20vw;
    font-size: 14px!important;
}

.v-btn--active {
    background-color: #7995BA !important;
}

.v-navigation-drawer__content{
    width: 227px!important;
}
</style>
