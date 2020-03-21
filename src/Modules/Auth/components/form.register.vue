<template>
 <!-- <ValidationObserver ref="observer"> -->
       <form @submit.prevent="submit"  class="pa-8">
          <h1 class="headline font-weight-medium mb-5"> Create Account</h1>
            <!-- <ValidationProvider v-slot="{ errors }" name="Your name" rules="required"> -->
            <v-row>
               <v-text-field
                  :error-messages="errors"
                  color="forms"
                  v-model="user.firstname"
                  label="Firstname"
                  :rules="firstRules"
                  class="box ma-3"
                  required
                >
              </v-text-field>
              <v-text-field
                :error-messages="errors"
                color="forms"
                v-model="user.lastname"
                label="Lastname"
                :rules="lastRules"
                class="box ma-3"
                required
              >
              </v-text-field>
                </v-row>
            <!-- </ValidationProvider> -->
            <!-- <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email"> -->
                <v-row>
                  <v-text-field
                    :error-messages="errors"
                    color="forms"
                    v-model="user.email"
                    label="E-mail"
                    class="box ma-3"
                    required
                  >
                  </v-text-field>
                </v-row>
            <!-- </ValidationProvider> -->
            <!-- <ValidationProvider v-slot="{ errors }" name="Message" rules="required|max:6"> -->
                <v-row>
                <v-text-field
                    :error-messages="errors"
                    v-model="user.password"
                    label="Create Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
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
            <!-- </ValidationProvider> -->

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
  props: ['user', 'error'],
  components: {
    // ValidationProvider,
    // ValidationObserver
  },
  data: () => ({
    password_confirmation: '',
    errors: []
  }),
  methods: {
    submit () {
      this.save()
    },
    save () {
      // this.isValidation = true
      // this.$refs.observer.validate().then(() => {
      this.$emit('submit-register-form', this.user)
      // }).catch(() => {
      //   console.log('Not submitted')
      // })
    },
    clear () {
      this.contactform = null
      // this.$refs.observer.reset()
    }
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
  }

}
</script>
