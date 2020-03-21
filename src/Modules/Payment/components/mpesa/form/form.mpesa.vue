<template>
   <form @submit.prevent='updateProfile' style='width:300px!important'>
         <v-layout column>
            <strong>Phone number</strong>
                 <span class="mt-4" v-show="!isEditing">{{ user.phoneNumber }}</span>
                 <span v-show="isEditing">
                     <v-text-field
                        outlined
                        small
                        type="text"
                        v-model="user.phoneNumber"
                        v-mask="mask"
                        placeholder="700 000 000"
                        class="inputbox"
                      />
                 </span>
                  <!-- <small class="text-danger" v-show="errors.has('phone')"> {{ errors.has('phone') }}</small> -->
        </v-layout>
        <!-- ------------------- -->
         <v-layout column id="buttons">
            <span v-show="isEditing">
                <v-btn type="submit" class="inputbox"> Submit </v-btn>
            </span>
        </v-layout>
    </form>
</template>

<script>
import { mask } from 'vue-the-mask'
// import { ERROR_MSG } from '@/store/mutation-types'

export default {
  props: ['user', 'isEditing'],
  directives: {
    mask
  },
  data () {
    return {
      mask: '+254#########'
    }
  },
  components: {
    //
  },
  methods: {
    updateProfile () {
      this.save()
    },

    save () {
      // this.$validator.validateAll().then(() => {
      this.$emit('save-number', this.user)
      // }).catch(() => {
      //   // eslint-disable-next-line no-undef
      //   this.$store.commit(ERROR_MSG, {
      //     type: 'error',
      //     title: 'Validation!',
      //     content: 'Please ensure the form is valid.'
      //   })
    }
  },
  clear () {
    this.contactform = null
    this.$refs.observer.reset()
  }

}
</script>

<style>

</style>
