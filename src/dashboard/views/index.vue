<template>
  <v-content>
      <header-main />
      <v-container>
          <v-layout column wrap>
             <v-row>
                 <v-col>
                      <v-layout column wrap pa-3>
                        <v-row>
                            <v-col class="color ma-1">
                              <v-layout justify-center align-center mt-5>
                                 <v-card to="/admin/products/" flat class="transparent" width="200" height="auto">
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
                                 <v-card to="/admin/shipping/" flat class="transparent" width="200" height="auto">
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
  </v-content>
</template>

<script>
import Header from '@/dashboard/components/header/index.vue'

export default {
  components: {
    'header-main': Header
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
