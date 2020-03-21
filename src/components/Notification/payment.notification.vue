<template>
  <div>
    <v-dialog
        v-model="notification.successful"
        max-width="680"
        persistent
    >
     <v-card>
       <v-layout justify-end pr-4 pt-4>
         <a @click="closeredirect()">
           <v-icon  class="mr-2"> mdi-close</v-icon> <span class="mr-3 grey--text">close</span>
          </a>
       </v-layout>

       <v-layout column wrap pa-4 justify-center align-center>
         <v-icon size="40" class="mb-6 mt-4" color="green">mdi-checkbox-marked-circle-outline</v-icon>
          <span class="title mb-4">Order Successfully Created</span>
       </v-layout>
     </v-card>
    </v-dialog>

   <v-dialog
    v-model="notification.unsuccessful"
    max-width="680"
    persistent
    >
     <v-card>
       <v-layout justify-end pr-4 pt-4>
         <a flat @click="closereturn()">
           <v-icon class="mr-2"> mdi-close</v-icon> <span class="mr-3 grey--text">close</span>
          </a>
       </v-layout>

       <v-layout column wrap pa-4 justify-center align-center>
         <v-icon size="40" class="mb-6 mt-4" color="red">mdi-close-circle-outline</v-icon>
          <span class="title mb-4">Oupss...</span>
          <p class="body-2"> There must have been an error, please try again</p>
       </v-layout>
     </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  props: ['notification'],
  data: () => ({
  }),
  methods: {
    closeredirect () {
      this.$emit('close-direct', this.notification)
    },
    closereturn () {
      this.$emit('close-return', this.notification)
    }
  }

}
</script>

<style>

</style>
