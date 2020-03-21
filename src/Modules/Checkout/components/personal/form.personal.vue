<template>
  <v-layout row mr-8 mb-8 justify-center>
      <userForm @save-user="updateProfile"  :isEditing="isEditing" :user='user' />
        <v-btn  v-show="!isEditing" icon color="orange" @click="activateEditMode">
            <v-icon size="20">mdi-pencil</v-icon> edit Form
        </v-btn>
     <v-btn v-show="isEditing" icon color="orange" @click="deActivateEditMode">
        <v-icon size="25">mdi-close</v-icon> Close Form
    </v-btn>
  </v-layout>
</template>

<script>
import UserForm from './form/personal-details.form'

export default {
  data () {
    return {
      isEditing: false
      // user: {}
    }
  },

  components: {
    UserForm
  },

  methods: {
    activateEditMode () {
      this.isEditing = true
      // console.log(this.user)
    },
    deActivateEditMode () {
      this.isEditing = false
      // console.log(this.user)
    },
    updateProfile (user) {
      // console.log('user', user)
      this.$store.dispatch('updateUser', user).then(() => {
        this.deActivateEditMode()
      })
    }
  },
  created () {
    if (!this.user.name) {
      // console.log('dispatched', this.uuid)
      this.$store.dispatch('userById', this.uuid)
    }
  },
  computed: {
    uuid () {
      const userCookies = this.$cookies.get('user')
      const uuid = userCookies._id
      return uuid
    },
    user () {
      const userById = this.$store.getters.userById(this.uuid)
      // console.log('data', userById)
      return Object.assign({}, userById)
    }
  }
}
</script>

<style>
.inputbox {
    width: 250px!important;
}

</style>
