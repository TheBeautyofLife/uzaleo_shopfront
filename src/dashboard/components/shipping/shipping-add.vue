<template>
<v-card class="pa-5">
    <v-card-title>Add Shipping</v-card-title>
<v-container>
    <form @submit.prevent="addShipping">
        <v-text-field
          type="text"
          v-model="model.type"
          v-validate="'required'"
          label="Type"
          name="type"
          :class="{'form-control': true, 'error': errors.has('type') }">
        </v-text-field>
        <small class="text-danger" v-show="errors.has('type')"> {{ errors.has('type') }}</small>

        <v-text-field
          type="number"
          v-model="model.shipping_fee"
          v-validate="'required'"
          label="Shipping Fee"
          name="shipping_fee"
          :class="{'form-control': true, 'error': errors.has('shipping_fee') }">
          </v-text-field>
          <small class="text-danger" v-show="errors.has('shipping_fee')"> {{ errors.has('shipping_fee') }}</small>
        <v-btn color="#77BDD9" type="submit" class="mt-4">
            Add Shipping
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </form>
</v-container>
</v-card>
</template>

<script>
import {
  ERROR_MSG
} from '@/store/mutation-types'
export default {
  props: ['model'],
  data () {
    return {
    //
    }
  },
  methods: {
    addShipping () {
      this.save()
    },

    save () {
      // console.log(this.fields.valid())
      console.log(this.model)
      this.$validator.validateAll().then(() => {
        this.$emit('save-shipping', this.model)
      }).catch(() => {
        // eslint-disable-next-line no-undef
        this.$store.commit(ERROR_MSG, {
          type: 'error',
          title: 'Validation!',
          content: 'Please ensure the form is valid.'
        })
      })
    }

  }
}
</script>

<style>

</style>
