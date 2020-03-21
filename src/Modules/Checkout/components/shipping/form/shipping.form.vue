<template>
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
                <v-textarea type="text" v-model="user.address" class="inputbox" />
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
    updateUserInfo () {
      this.save()
    },

    save () {
      // // console.log(this.fields.valid())
      this.$validator.validateAll().then(() => {
        this.$emit('save-shipping', this.user)
      }).catch(() => {
      //   // eslint-disable-next-line no-undef
        // this.$store.commit(ERROR_MSG, {
        //   type: 'error',
        //   title: 'Validation!',
        //   content: 'Please ensure the form is valid.'
        // })
      })
    },

    jsonData () {
      const jsonData = require('@/data/counties.json')
      return jsonData
    }
  }

}
</script>

<style>

</style>
