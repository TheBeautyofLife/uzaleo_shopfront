<template>
    <v-content>
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <p class="headline ma-3">Upload images</p>
        <small class="ml-4">This only accepts one file</small>
        <v-layout class="dropbox" justify-center align-center>
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              <!-- Drag your file(s) here to begin<br> or click to browse -->
              Drag a file here to begin<br> or click to browse
            </p>
            <p class="display 2" v-if="isSaving">
                <v-layout column justify-center>
                       Uploading {{ fileCount }} files...
                        <v-progress-linear
                            indeterminate
                            color="green"
                        >
                        </v-progress-linear>
                </v-layout>
            </p>
        </v-layout>
      </form>
      <!--SUCCESS-->
      <v-container v-if="isSuccess">
        <p class="headline ma-3">Uploaded {{ uploadedFiles.length }} file(s) successfully.</p>
        <v-layout pa-3>
          <v-card v-for="data in uploadedFiles" :key="data.id">
            <v-img contain width="240" height="auto" :src="data.url" class="img-responsive img-thumbnail" />
            <v-card-title class="subtitle-2">
                {{ data.title }}
            </v-card-title>
          </v-card>
        </v-layout>
        <v-layout justify-end pa-4>
          <v-btn color="orange" href="javascript:void(0)" @click="reset()">Upload again</v-btn>
        </v-layout>
      </v-container>
      <!--FAILED-->
      <v-container v-if="isFailed">
        <p class="headline ma-3">Uploaded failed.</p>
        <v-layout pa-3>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </v-layout>
        <pre>{{ uploadError }}</pre>
      </v-container>
    </v-content>
</template>

<script>
import { wait } from '@/utils/utils'
const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const STATUS_FAILED = 3

export default {
  name: 'upload',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      this.$store.dispatch('addImages', formData)
        .then(wait(1200)) // waiting for upload - 1 minute
        .then(i => {
          // this.uploadedFiles = [].concat(i)
          // console.log(i.data)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })

      // upload(formData)
      //   .then(wait(1200)) // DEV ONLY: wait for 1.5s
      //   .then(x => {
      //     this.uploadedFiles = [].concat(x)
      //     console.log(this.uploadedFiles)

      // Sending to the DB
      // const image = {
      //   images: this.uploadedFiles.map(v => ({ url: v.url })),
      //   length: this.uploadedFiles.length,
      //   product_id: this.$route.params.id
      // }
      // this.$store.dispatch('addImages', formData)
      //   .then(i => console.log(i.data))

      //   this.currentStatus = STATUS_SUCCESS
      // })
      // .catch(err => {
      //   this.uploadError = err.response
      //   this.currentStatus = STATUS_FAILED
      // })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append('File', fileList[x], fileList[x].name)
        })
      formData.append('length', fileList.length)
      formData.append('product_id', this.$route.params.id)
      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style scoped>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    /* background: lightcyan; */
    color: dimgray;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  /* .dropbox:hover {
    background: #abeaff79;
  } */

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
