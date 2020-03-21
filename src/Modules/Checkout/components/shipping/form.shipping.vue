<template>
  <v-layout ma-3 ml-8 mb-8 justify-space-between>
    <!--  -->
    <shippingForm @save-shipping="updateUserInfo"  :isEditing="isEditing" :user='user' />
    <v-col class="mx-8">
    <v-row class="ma-3">
        <v-btn  v-show="!isEditing" icon color="orange" @click="activateEditMode">
            <v-icon size="20">mdi-pencil</v-icon> edit Form
        </v-btn>
     <v-btn v-show="isEditing" icon color="orange" @click="deActivateEditMode">
        <v-icon size="25">mdi-close</v-icon> Close Form
    </v-btn>
    </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import shippingForm from './form/shipping.form'

export default {
  data () {
    return {
      isEditing: false
    }
  },
  components: {
    shippingForm
  },
  created () {
    if (!this.user.name) {
      console.log('dispatched', this.uuid)
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
      console.log('data', userById)
      return Object.assign({}, userById)
    }
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
    updateUserInfo (user) {
      this.$store.dispatch('updateUserLocation', user).then(() => {
        this.deActivateEditMode()
      })
    }
  }
}
</script>

<style>
.inputbox {
    width: 250px!important;
}

</style>
