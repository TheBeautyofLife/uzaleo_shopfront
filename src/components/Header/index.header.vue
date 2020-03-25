<template>
  <v-app-bar>
     <v-layout row mr-6 align-center justify-end>
         <span v-if="user" class="nav-item font-weight-medium">
            {{ user.firstname }}
        </span>

        <v-menu close-on-click close-on-content-click offset-y>
            <template v-slot:activator="{ on }">
                <v-avatar v-if="user" color="blue lighten-4" size="45" class="ml-3" v-on="on">
                    <v-img :src="user.profile" @click="index = !index"></v-img>
                </v-avatar>
            </template>

   <!-- drop down menu from the admin profile picture -->
          <div>
            <v-card flat  to="/profile" class="pa-5" style="border-radius:0px !important">
                <v-icon color="green" class="mr-3 ml-6"> mdi-account</v-icon>
                <span text class="text-lowercase" >Profile</span>
            </v-card>
            <v-card flat @click="logout" class="pa-5" style="border-radius:0px !important">
                <v-icon color="red" class="mr-3 ml-6">mdi-logout</v-icon>
                <span text class="text-lowercase" >Logout</span>
            </v-card>
            </div>
        </v-menu>
        </v-layout>
  </v-app-bar>
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
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      const getItems = this.$cookies.get('user')
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
a {
    color: black !important;
    text-decoration: none;
}
</style>
