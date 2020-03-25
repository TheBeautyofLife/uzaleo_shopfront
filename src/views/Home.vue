<template>
  <div>
      <header-main />
      <navigation-drawer />

    <v-content class="mt-5">
      <div>
        <v-container>
          <v-layout column wrap>
             <v-row>
                 <v-col>
                      <v-layout column wrap pa-3>
                        <v-row>
                            <v-col class="color ma-1">
                              <v-layout justify-center align-center mt-5>
                                 <v-card to="/products/" flat class="transparent" width="200" height="auto">
                                      <v-card-title>
                                        Manage Product
                                      </v-card-title>
                                 </v-card>
                              </v-layout>
                            </v-col>
                            <v-col class="color_1 ma-1">
                                <v-layout justify-center align-center mt-5>
                                 <v-card flat class="transparent">
                                      <v-card-title>
                                       View Sales
                                      </v-card-title>
                                 </v-card>
                              </v-layout>
                            </v-col>
                        </v-row>
                          <v-row>
                            <v-col class="color_1 ma-1">
                                <v-layout justify-center align-center mt-5>
                                 <v-card flat class="transparent">
                                      <v-card-title>
                                        Customers
                                      </v-card-title>
                                 </v-card>
                              </v-layout>
                            </v-col>
                            <v-col class="color ma-1">
                                <v-layout justify-center align-center mt-5>
                                 <v-card to="/shipping/" flat class="transparent" width="200" height="auto">
                                      <v-card-title>
                                        Shipping Options
                                      </v-card-title>
                                 </v-card>
                              </v-layout>
                            </v-col>
                        </v-row>
                      </v-layout>
                 </v-col>
                  <v-col>
                      <v-layout column wrap pa-3>
                          <!-- Placehoder -->
                          <v-layout justify-center align-center>
                             <span style="width:90px !important"></span>
                          </v-layout>
                      </v-layout>
                 </v-col>
             </v-row>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
</template>

<script>
import Header from '@/components/header/index.header.vue'
import navigationDrawer from '@/components/header/navigation.header'

export default {
  components: {
    'header-main': Header,
    'navigation-drawer': navigationDrawer
  }
}
</script>

<style>
.color {
    background-color: #50c5e2 !important
}
.color_1{
    background-color: #50c5e2a6 !important
}
</style>
