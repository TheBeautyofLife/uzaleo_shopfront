<template>
  <v-layout ma-3 ml-8 mb-8 justify-space-between>
      <v-col>
      <form @submit.prevent="updateUserInfo">
        <v-layout column>
            <span class="orange--text">County</span>
            <span class="mb-1" v-show="!isEditing">{{ user.region }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-select
                    name="Region"
                    :items="this.jsonData()"
                    item-text="name"
                    item-value="name"
                    type="text"
                    v-model="region"
                />
            </span>
        </v-layout>

         <v-layout column>
            <span class="orange--text">City</span>
            <span class="mb-1" v-show="!isEditing">{{ user.city }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-select
                    name="City"
                    :items="this.jsonData()"
                    item-text="capital"
                    item-value="capital"
                    type="text"
                    v-model="city"
                  />
            </span>
        </v-layout>

         <v-layout column>
            <span class="orange--text">Address</span>
            <span class="mb-1" v-show="!isEditing">{{ user.address }}</span>
                    <!-- edit field -->
            <span v-show="isEditing">
                <v-textarea type="text" v-model="address" class="inputbox" />
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
import axios from 'axios'
import { API_AUTH } from '@/config'

export default {
  data () {
    return {
      isEditing: false,
      city: '',
      region: '',
      address: ''
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
    },
    updateUserInfo () {
      axios.put(`${API_AUTH}/users/location/${this.user._id}`, {
        city: this.city,
        region: this.region,
        address: this.address
      })
        .then(res => {
          // location.reload()
          console.log(res.data)
          location.reload()
          this.updateUser = false
          this.$cookies.set('user', res.data)

          // this.errors = []
        })
        .catch(err => {
          this.errors.push(err)
        })
    },
    jsonData () {
      const jsonData = require('@/data/counties.json')
      // console.log(jsonData)
      return jsonData
    }
  }
}
</script>

<style>
.inputbox {
    width: 250px!important;
}

</style>
