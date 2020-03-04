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

        <form @submit.prevent="register" class="pa-8">
          <h1 class="headline font-weight-medium mb-5"> Create Account</h1>
            <v-row>
               <v-text-field
                  color="#77BDD9"
                  v-model="firstname"
                  label="Firstname"
                  :rules="firstRules"
                  class="box ma-3"
                  required
                >
              </v-text-field>
              <v-text-field
                color="#77BDD9"
                v-model="lastname"
                label="Lastname"
                :rules="lastRules"
                class="box ma-3"
                required
              >
              </v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    color="#77BDD9"
                    v-model="email"
                    label="E-mail"
                    :rules="emailRules"
                    class="box ma-3"
                    required
                  >
                  </v-text-field>
                </v-row>
                <v-row>
                <v-text-field
                    v-model="password"
                    label="Create Password"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :counter="6"
                    @click:append="show = !show"
                    required
                    class="ma-3"
                >
                </v-text-field>
              <v-text-field
                type="password"
                v-model="password_confirmation"
                label="Confirm Password"
                class="ma-3"
                required
              >
              </v-text-field>
                </v-row>
              <!-- <v-btn small text color="grey" class="mb-2">FORGOT YOUR PASSWORD</v-btn> -->
              <v-layout column justify-center align-center mt-5>
                  <span>Already have an account?</span>
                  <v-btn text to="/auth/login" small color="orange" class="mb-4 mt-3">
                      Sign In
                  </v-btn>
              </v-layout>

              <v-layout row wrap justify-center align-center my-9>
                <v-layout class="overlay" v-if="showLoader">
                    <v-progress-circular
                      indeterminate
                      color="orange"
                    ></v-progress-circular>
                </v-layout>
              <v-btn
                v-else
                color="orange"
                dark
                depressed
                type="submit"
                height="50"
                width="200"
              >
              REGISTER
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
      show: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'Admin',
      errors: [],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 6) || 'Name must be more than 6 characters'
      ],

      firstRules: [
        v => !!v || 'Firstname is required'
      ],
      lastRules: [
        v => !!v || 'Lastname is required'
      ]
    }
  },
  components: {
    'header-main': Header
    // eslint-disable-next-line vue/no-unused-components
  },
  computed: {
    showLoader () {
      return this.$store.state.showLoader
    },
    notSamePasswords () {
      if (this.passwordsFilled) {
        return (this.password !== this.password_confirmation)
      } else {
        return false
      }
    },
    passwordsFilled () {
      return (this.password !== '' && this.password_confirmation !== '')
    }
  },
  methods: {
    register: function () {
      /* let data = {
        username: this.username,
        role: this.role,
        email: this.email,
        password: this.password
      } */

      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.email
        })
        .then(() => {
          this.$router.push('/auth/login')
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
    width: 240px !important;
}
</style>
