<template>
  <v-content>
    <header-main />
    <v-container class="my-6">
          <v-content class="containerBox" v-if="user">
              <v-row>
                  <v-layout column justify-center align-center>
                      <div>
                        <v-avatar
                           size="200"
                           color="red"
                           class="mt-4"
                           v-if="user"
                        >
                            <img :src="user.profile" alt="alt">
                        </v-avatar>
                     </div>
                        <v-btn outlined @click="uploadlink = !uploadlink" class="mt-4" color="grey">Upload Image</v-btn>
                  </v-layout>
                   <v-col class="mr-9">
                  <div class="userInfo mr-9">
                      <v-card flat width="500">
                          <v-card-text class="display-1">
                              {{ user.firstname }} {{ user.lastname }}
                          <span class="subtitle-1 mt-3">
                              {{ user.email}}
                          </span>
                          </v-card-text>
                      </v-card>
                     <v-btn @click="updateUser = !updateUser" class="ml-4 mt-6" color="blue darken-2" dark>Edit</v-btn>
                  </div>
                   </v-col>
              </v-row>
              <v-row>
              </v-row>
          </v-content>
          <v-content class="elevation-1" v-if="user">
            <v-col class="ma-5">
              <v-row>
                <div class="title">Shipping Information</div>
              </v-row>
              <v-row class="mt-4">
                  <span class="mr-1">{{user.region}}</span>
                  <span>{{user.city}}</span>
              </v-row>
              <v-row class="mt-4">
                  <span class="mr-1">{{user.address}}</span>
              </v-row>
            </v-col>
          </v-content>
    </v-container>
    <v-dialog
        v-model="uploadlink"
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card class="pa-6">
            <form @submit.prevent="updateProfile">
              <v-layout column>
                <span class="title">Profile Picture</span>
                <span class="body-2">Press enter to upload </span>
              <v-col>
                  <v-text-field
                    name="upload link"
                    label="paste the image link here"
                    v-model="profilePic"
                    hint="http://cdn.pixabay.com/avatar-1606914_1280.png"
                    append-icon="mdi-upload-outline"
                  >
                  </v-text-field>
              </v-col>
                </v-layout>
            </form>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="updateUser"
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card class="pa-6">
            <form @submit.prevent="updateUserInfo">
              <v-layout column>
                <span class="title">Edit Personal Info</span>
                <span class="body-2"></span>
              <v-col>
                  <v-select
                    name="Region"
                    label="Select County"
                    :items="this.jsonData()"
                    item-text="name"
                    item-value="name"
                    v-model="region"
                  >
                  </v-select>
                  <v-select
                    :items="this.jsonData()"
                    label="Select city"
                    item-text="capital"
                    item-value="capital"
                    v-model="city"
                  >
                  </v-select>
                  <v-textarea
                    name="address"
                    label="Physical Address"
                    multi-line
                    v-model="address"
                  >
                  {{ jsonData }}
                  </v-textarea>
                  <v-layout justify-end align-center>
                       <v-btn text @click="updateUser = !updateUser" color="grey">cancel</v-btn>
                       <v-btn type="submit" class="ml-3" color="blue darken-2" dark>Submit</v-btn>
                  </v-layout>
              </v-col>
                </v-layout>
            </form>
        </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import Header from '@/components/Header/index.header'
import { API_AUTH } from '@/config'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    'header-main': Header
  },

  data () {
    return {
      profilePic: '',
      uploadlink: false,
      updateUser: false,
      city: '',
      region: '',
      address: '',

      cities: [
        'Nairobi',
        'Mombasa',
        'Nakuru'
      ]
    }
  },

  created () {
    //
  },

  computed: {
    user () {
      const getItems = this.$cookies.get('user')
      return getItems
    },
    profile () {
      const getProfile = this.$cookies.get('profile')
      return getProfile
    }
  },

  methods: {
    updateProfile () {
      const formData = {
        profile: this.profilePic
      }

      axios.patch(`${API_AUTH}/users/profile/${this.user._id}`, formData)
        .then(res => {
          console.log('test')
          // eslint-disable-next-line dot-notation
          this.$cookies.set('user', res.data)
          this.uploadlink = false
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
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
.containerBox{
    width: 100vw!important;
    height: 300px;
}
</style>
