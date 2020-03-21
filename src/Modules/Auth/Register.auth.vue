<template>
    <v-content class="register">
  <header-main />
    <v-layout column justify-center align-center>
        <!-- <v-img :src="require('../../assets/logo.svg')" class="my-9" width="350"/> -->
          <v-card flat class="mt-7">
            <v-layout column justify-center align-center>
              <v-card dark flat class="transparent red--text error-messages pa-4 mb-4" width="350">
                  <span v-for="(error, i) in errors" :key="i">{{ error.message }}</span>
              </v-card>

              <!--  -->
              <submit-register-form @submit-register-form="register" :user="user" style="width:50vw" />
            </v-layout>
         </v-card>
      </v-layout>
    </v-content>
</template>

<script>
import Header from '@/components/Header/index.header'
import RegisterForm from './components/form.register'

export default {
  data () {
    return {
      user: {}
    }
  },
  components: {
    'header-main': Header,
    'submit-register-form': RegisterForm
  },
  methods: {
    register (user) {
      this.$store
        .dispatch('register', user)
        .then(() => {
          this.$router.push('/auth/login')
          // this.errors = []
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
    width: 240px !important;
}
</style>
