<template>
<v-card class="pa-5">
    <v-card-title>Add Product</v-card-title>
<v-container>
    <form @submit.prevent="addProduct">
        <v-text-field
          type="text"
          v-model="model.name"
          v-validate="'required'"
          label="Name"
          name="name"
          :class="{'form-control': true, 'error': errors.has('name') }">
        </v-text-field>
        <small class="text-danger" v-show="errors.has('name')"> {{ errors.has('name') }}</small>

        <v-text-field
          type="number"
          v-model="model.price"
          v-validate="'required'"
          label="Price"
          name="price"
          :class="{'form-control': true, 'error': errors.has('price') }">
          </v-text-field>
          <small class="text-danger" v-show="errors.has('price')"> {{ errors.has('price') }}</small>

        <v-select
          type="text"
          :items="statusItems"
          v-model="model.status"
          v-validate="'required'"
          label="Avaliability Status"
          name="status"
          :class="{'form-control': true, 'error': errors.has('status') }">
        </v-select>
          <small class="text-danger" v-show="errors.has('status')"> {{ errors.has('status') }}</small>

        <v-select
         type="text"
         :items="featuredItems"
          v-model="model.featured"
          item-value="id"
          item-text="value"
          v-validate="'required'"
          label="Featured Product"
          name="featured"
          :class="{'form-control': true, 'error': errors.has('featured') }">
        </v-select>
          <small class="text-danger" v-show="errors.has('featured')"> {{ errors.has('featured') }}</small>

        <v-textarea
         type="text"
          rows="5"
          v-model="model.description"
          label="Description"
          v-validate="'required'"
          name="description"
          :class="{'form-control': true, 'error': errors.has('description') }">
          </v-textarea>
          <small class="text-danger" v-show="errors.has('description')"> {{ errors.has('description') }}</small>

        <v-select
          name="productqty"
          disabled
          :items="QtyItems"
          item-value="value"
          item-text="value"
          return-object
          v-model="model.quantity"
          hidden
        ></v-select>
        <v-btn icon color="#77BDD9" type="submit">
            Add Product
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
      featuredItems: [
        { id: 1, value: 'Yes' },
        { id: 0, value: 'No' }
      ],
      QtyItems: [
        { value: 1 }
      ],
      statusItems: [
        'Avaliable',
        'Unavaliable'
      ]
    }
  },
  methods: {
    addProduct () {
      this.save()
    },

    save () {
      // console.log(this.fields.valid())
      console.log(this.model)
      this.$validator.validateAll().then(() => {
        this.$emit('save-product', this.model)
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
