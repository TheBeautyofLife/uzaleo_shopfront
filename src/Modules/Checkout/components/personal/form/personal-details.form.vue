<template>
      <form @submit.prevent='updateProfile' style='width:300px!important'>
        <v-layout column>
            <span class="orange--text">Firstname</span>
            <span class="mb-1" v-show="!isEditing">{{ user.firstname }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-text-field type="text" v-model="user.firstname" class="inputbox" />
            </span>
        </v-layout>
         <v-layout column>
            <span class="orange--text">Lastname</span>
            <span class="mb-1" v-show="!isEditing">{{ user.lastname }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-text-field type="text" v-model="user.lastname" class="inputbox" />
            </span>
        </v-layout>
         <v-layout column>
            <span class="orange--text">Phone number</span>
            <span class="mb-1" v-show="!isEditing">{{ user.phoneNumber }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-text-field type="text" v-model="user.phoneNumber" class="inputbox" />
            </span>
        </v-layout>
         <v-layout column id="buttons">
            <span v-show="isEditing">
                <v-btn type="submit" class="inputbox"> Submit </v-btn>
            </span>
        </v-layout>
    </form>
</template>

<script>
export default {
  props: ['user', 'isEditing'],
  methods: {
    updateProfile () {
      this.save()
    },

    save () {
      // // console.log(this.fields.valid())
      this.$validator.validateAll().then(() => {
        this.$emit('save-user', this.user)
      }).catch(() => {
      //   // eslint-disable-next-line no-undef
        // this.$store.commit(ERROR_MSG, {
        //   type: 'error',
        //   title: 'Validation!',
        //   content: 'Please ensure the form is valid.'
        // })
      })
    }

  }
}
</script>

<style>

</style>
