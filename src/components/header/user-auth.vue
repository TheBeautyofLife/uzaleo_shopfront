<template>
<div class="mr-8">
  <v-menu close-on-click close-on-content-click offset-y v-if="user" >
    <template v-slot:activator="{ on }">
        <v-avatar  color=" lighten-4" size="45" class="ml-3" v-on="on">
            <v-icon>mdi-account-outline</v-icon>
        </v-avatar>
        <span>{{ user.email }}</span>
    </template>

   <!-- drop down menu from the admin profile picture -->
    <div>
         <v-card flat  class="pa-2" style="border-radius:0px !important">
          <v-btn @click="logout" large block color="#42424D" dark>Logout</v-btn>
        </v-card>

        <v-card flat>
            <v-divider />
        </v-card>

        <v-card flat class="pa-1" to="/" style="border-radius:0px !important">
          <v-row class="pl-6 ma-2">
            <v-icon>mdi-account-outline</v-icon>
            <v-btn text large color="#42424D" dark>Account </v-btn>
          </v-row>
        </v-card>

        <v-card flat  class="pa-1" style="border-radius:0px !important">
            <v-row class="pl-6 ma-2">
            <v-icon>mdi-logout</v-icon>
              <v-btn  text large color="#42424D" dark>Orders</v-btn>
            </v-row>
        </v-card>
    </div>
  </v-menu>

    <!--  -->
   <v-menu close-on-click close-on-content-click offset-y v-else>
        <template v-slot:activator="{ on }">
            <v-avatar  color="lighten-4" size="45" class="ml-3" v-on="on">
                <v-icon>mdi-account-outline</v-icon>
            </v-avatar>
        </template>

        <v-card flat  to="/auth/login" class="pa-2" style="border-radius:0px !important">
          <v-btn large block color="#42424D" dark>Login</v-btn>
        </v-card>

         <v-card flat>
            <v-divider />
        </v-card>

        <v-card flat  to="/auth/register" class="pa-2" style="border-radius:0px !important">
          <v-btn text large block color="#42424D" dark>Create and account </v-btn>
        </v-card>
    </v-menu>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      items: ''
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      const getItems = this.$cookies.get('user')
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      console.log(getItems)
      return getItems
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
          this.errors = []
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
  }
}
</script>

<style>
span.box{
    display: flex;
    border-radius: 100%;
    width: 70px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
}
span.box2{
    display: flex;
    background-color: grey;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
    z-index: -1;
}
</style>
