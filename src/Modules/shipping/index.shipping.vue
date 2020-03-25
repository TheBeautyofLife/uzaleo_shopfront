<template>
  <v-content>
   <!-- <header-main /> -->
    <v-container class="mt-6">

      <v-layout column justify-start my-12>
         <!-- Breadcrumbs -->
        <v-breadcrumbs :items="breadcrumbs" :divider="divider">
            <template v-slot:divider>
               <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <!-- *************** -->
        <span class="headline font-weight-medium mt-3">
            Shipping All
            </span>
      </v-layout>
      <v-flex xs12>
          <v-layout row wrap>
              <!-- Buttons to add -->
              <v-btn color="success" @click="addshipping = true">Add Shipping</v-btn>
          </v-layout>
        <!--  -->

        <v-container>
          <v-simple-table fixed-header height="300px">
             <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Type</th>
                        <th class="text-left">Shipping Fee</th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="shipping of shippings"
                        :key="shipping._id"
                    >
                        <td>{{ shipping.type }}</td>
                        <td>{{ shipping.shipping_fee }}</td>
                        <td><v-btn icon><v-icon color="red" @click="deleteItem(shipping._id)">mdi-delete-outline</v-icon></v-btn></td>
                    </tr>
                </tbody>
             </template>
          </v-simple-table>
       </v-container>
      </v-flex>
      <v-dialog
      v-model="addshipping"
      max-width="500px"
    >
        <add-shipping-options @save-shipping="addShipping" :model="model" />
    </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
// import Header from '@/dashboard/components/header/index.vue'
import AddShipping from '@/components/shipping/shipping-add'

export default {
  name: 'Shipping',
  data () {
    return {
      divider: '',
      model: {},
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Manage Shipping',
          disabled: true,
          href: '#'
        }
      ],
      addshipping: false
    }
  },
  components: {
    // 'header-main': Header,
    'add-shipping-options': AddShipping
  },
  methods: {
    addShipping (model) {
      console.log('model', model)
      this.$store.dispatch('addShipping', model).then(() => {
        this.addshipping = false
        this.model = ''
        // location.reload()
      })
    },
    deleteItem (id) {
      this.$store.dispatch('removeShipping', id).then(() => {
        // location.reload()
      }).catch(() => {
        console.log('not deleted')
      })
    }
  },
  created () {
    if (this.shippings.length === 0) {
      this.$store.dispatch('allShipping')
    }
  },
  computed: {
    shippings () {
      return this.$store.getters.allShipping
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px dashed grey
}
</style>
