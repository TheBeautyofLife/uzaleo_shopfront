<template>
  <v-content>
     <!-- <main-header /> -->
    <v-layout
        column
        justify-center
        align-center
        class=""
        style="height:80vh!important"
    >
   <form @submit.prevent="login" class="elevation-1 pa-12">
              <h1 class="headline font-weight-medium mb-5"> Login</h1>
              <v-text-field
                color="#77BDD9"
                v-model="email"
                label="E-mail"
                :rules="emailRules"
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

                <v-layout row wrap justify-center align-center my-9>
              <v-btn
                v-show="!showLoader"
                color="orange"
                dark
                depressed
                type="submit"
                width="200"
              >
              Login
              </v-btn>
               </v-layout>
            </form>
      </v-layout>
      <v-layout class="overlay" v-show="showLoader">
        <v-progress-circular
            indeterminate
            color="orange"
        ></v-progress-circular>
    </v-layout>
  </v-content>
</template>

<script>
// import Header from '@/components/header/main.header'

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
    // 'main-header': Header
  },
  computed: {
    // showLoader () {
    //   return this.$store.state.showLoader
    // }
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
