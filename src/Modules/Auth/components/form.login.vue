<template>
  <!-- <ValidationObserver ref="observer"> -->
     <form @submit.prevent="submit" class="pa-8">
        <h1 class="headline font-weight-medium mb-5"> Login</h1>
         <!-- <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email"> -->
            <v-text-field
              :error-messages="errors"
              color="forms"
              v-model="user.email"
              label="E-mail"
              :rules="emailRules"
              class="box"
              required
            >
            </v-text-field>
         <!-- </ValidationProvider> -->
         <!-- <ValidationProvider v-slot="{ errors }" name="Message" rules="required|max:6"> -->
            <v-text-field
               :error-messages="errors"
               color="forms"
               v-model="user.password"
               :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
               :type="show1 ? 'text' : 'password'"
               @click:append="show1 = !show1"
               label="Password"
               class="box"
               required
            >
            </v-text-field>
         <!-- </ValidationProvider> -->

            <!-- <v-btn small text color="grey" class="mb-2">FORGOT YOUR PASSWORD</v-btn> -->

            <v-layout column justify-center align-center mt-5>
               <span>Already have an account?</span>
               <v-btn text to="/auth/register" small color="orange" class="mb-4 mt-3">
                   Register
               </v-btn>
            </v-layout>

            <v-layout row wrap justify-center align-center my-9>
                <v-layout class="overlay" v-show="showLoader">
                    <v-progress-circular
                      indeterminate
                      color="orange"
                    ></v-progress-circular>
            </v-layout>
            <v-btn
                v-show="!showLoader"
                color="orange"
                dark
                depressed
                type="submit"
                height="50"
                width="200"
            >
                Login
            </v-btn>
        </v-layout>
      </form>
  <!-- </ValidationObserver> -->
</template>

<script>
// import { required, email, max } from 'vee-validate/dist/rules'
// import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

// setInteractionMode('eager')

// extend('required', {
//   ...required,
//   message: '{_field_} can not be empty'
// })

// extend('max', {
//   ...max,
//   message: '{_field_} may not be greater than {length} characters'
// })

// extend('email', {
//   ...email,
//   message: 'Email must be valid'
// })

export default {
  props: ['user'],
  components: {
    // ValidationProvider,
    // ValidationObserver
  },
  data: () => ({
  }),
  methods: {
    submit () {
      this.save()
    },
    save () {
    //   this.isValidation = true
    //   this.$refs.observer.validate().then(() => {
      this.$emit('submit-login-form', this.user)
    //   }).catch(() => {
    //     console.log('Not submitted')
    //   })
    },
    clear () {
      this.login = ''
    //   this.$refs.observer.reset()
    }
  },
  computed: {
    showLoader () {
      return this.$store.state.showLoader
    }
  }

}
</script>

<style>

</style>
