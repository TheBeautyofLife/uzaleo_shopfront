<template>
  <v-layout ma-3 ml-8 mb-8 justify-space-between>
      <v-col>
      <form action="">
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
         <v-layout column id="buttons">
            <span v-show="isEditing">
                <v-btn type="submit" class="inputbox"> Submit </v-btn>
            </span>
        </v-layout>
    </form>
    </v-col>
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
export default {
  data () {
    return {
      isEditing: false
    }
  },
  computed: {
    user () {
      const getItems = this.$cookies.get('user')
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // console.log(getItems)
      return getItems
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
    }
  }
}
</script>

<style>
.inputbox {
    width: 250px!important;
}

</style>
