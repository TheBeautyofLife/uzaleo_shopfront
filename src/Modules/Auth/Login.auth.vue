<template>
    <v-content class="login">
  <header-main />
    <v-layout column justify-center align-center>
        <!-- <v-img :src="require('../../assets/logo.svg')" class="my-9" width="350"/> -->
        <v-card flat class="mt-7">
         <v-layout column justify-center align-center mt-10>
            <v-card dark flat class="transparent red--text error-messages mb-4" width="350">
                <span v-for="(error, i) in errors" :key="i">{{ error.message }}</span>
            </v-card>

              <!--  -->
                <submit-login-form @submit-login-form="Login" :user="user" style="width:30vw" />
             </v-layout>
          </v-card>
       </v-layout>
    </v-content>
</template>

<script>
import Header from '@/components/Header/index.header'
import LoginForm from './components/form.login'

export default {
  data () {
    return {
      valid: true,
      show1: false,
      user: {},
      errors: []
    }
  },
  components: {
    'header-main': Header,
    'submit-login-form': LoginForm
  },
  computed: {
    // showLoader () {
    //   return this.$store.state.showLoader
    // }
  },
  methods: {
    Login (user) {
      this.$store
        .dispatch('login', user)
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

<style scoped>
.login {
  background: #fff;
  width: 100vw;
  height: 100vh
}
.box {
    width: 340px !important;
}
</style>
