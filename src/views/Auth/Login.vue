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

            <form @submit.prevent="login" class="pa-8">
              <h1 class="headline font-weight-medium mb-5"> Login</h1>
              <v-text-field
                color="#77BDD9"
                v-model="email"
                label="E-mail"
                :rules="emailRules"
                class="box"
                required
              >
              </v-text-field>
              <v-text-field
                color="#77BDD9"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="passwordRules"
                @click:append="show1 = !show1"
                label="Password"
                class="box"
                required
              >
              </v-text-field>
              <!-- <v-btn small text color="grey" class="mb-2">FORGOT YOUR PASSWORD</v-btn> -->
               <v-layout column justify-center align-center mt-5>
                  <span>Already have an account?</span>
                  <v-btn text to="/auth/register" small color="orange" class="mb-4 mt-3">
                      Register
                  </v-btn>
              </v-layout>

              <v-layout row wrap justify-center>
              <v-btn
                color="orange"
                dark
                depressed
                type="submit"
                height="50"
                width="200"
                :disabled="loading"
                :loading="loading"
              >
              LOGIN
              </v-btn>
               </v-layout>
            </form>
             </v-layout>
          </v-card>
          </v-layout>
    </v-content>
</template>

<script>
import Header from '@/components/header/index.vue'
export default {
  data () {
    return {
      valid: true,
      show1: false,
      email: '',
      password: '',
      errors: [],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 6) || 'Name must be less than 6 characters'
      ]
    }
  },
  components: {
    'header-main': Header
    // eslint-disable-next-line vue/no-unused-components
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    login: function () {
      /* let data = {
        username: this.username,
        role: this.role,
        email: this.email,
        password: this.password
      } */

      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
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
