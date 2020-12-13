<template>
  <div>
    <AdminNav />

    <v-container fluid class="mt-4">
      <v-row justify="end" v-show="!loading">
        <v-col cols="10" sm="4" md="2" class="pa-0 mx-12" :class="{ 'mx-auto': $vuetify.breakpoint.xs, 'mt-12': $vuetify.breakpoint.xs }">
          <v-row justify="center" justify-sm="start">
            <p class="ma-2 mt-0">Sorting | Total images: {{ files.length }} | Page: {{ page }}</p>
          </v-row>
          <v-row justify="end" class="mb-0">
            <v-select :items="sortingOptions" v-model="sorting" solo></v-select>
            <v-menu
              v-model="actionsOpen"
              :close-on-click="true"
              :close-on-content-click="true"
              :offset-y="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  tile
                  dark
                  color="blue"
                  class="mx-auto mb-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  Actions
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="uploadDialog = true">Upload</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="load()">Refresh</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="resyncCache()">Resync cache</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="deleteDialog = filesSelected() > 0">Delete selected</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="selectAll()">Select all</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text dark color="blue darken-2" class="mx-auto" width="100%" @click="deselectAll()">Deselect all</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn dark color="blue" class="mx-auto" @click="previousPage"><v-icon>navigate_before</v-icon></v-btn>
            <v-btn dark color="blue" class="mx-auto" @click="nextPage"><v-icon>navigate_next</v-icon></v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" v-show="!loading">
        <v-col cols="3" class="hidden-sm-and-down ma-6 mt-0" v-for="file in showFiles" :key="file.name + '1'" style="max-width: 18vw;">
          <v-row justify="center">
            <AdminMediaImageCard :fileData="file" width="16vw" height="16vh"/>
          </v-row>
        </v-col>
        <v-col cols="4" class="hidden-xs-only hidden-md-and-up ma-2" v-for="file in showFiles" :key="file.name + '2'">
          <v-row justify="center">
            <AdminMediaImageCard :fileData="file" width="30vw" height="40vh"/>
          </v-row>
        </v-col>
        <v-col cols="12" class="hidden-sm-and-up ma-2" v-for="file in showFiles" :key="file.name + '3'">
          <v-row justify="center">
            <AdminMediaImageCard :fileData="file" width="80vw" height="16vh"/>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4" v-show="loading">
        <v-col cols="10" sm="6" md="3">
          <v-row justify="center">
            <p>{{ state }}</p>
            <v-progress-linear indeterminate height="16px" style="border-radius: 2px;"></v-progress-linear>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="deleteDialog" max-width="400" :persistent="deleting">
      <v-card>
        <v-col>
          <v-row justify="center" align="center" class="my-6">
            <p v-show="!this.deleting">Delete <b>{{ filesSelected() }}</b> files. Are you sure?</p>
            <p v-show="this.deleting">Deleted <b>{{ this.deleted }}</b> files ({{ Math.ceil((this.deleted / (this.filesSelected() + 1) + 0.05) * 100) }}%)</p>
            <v-progress-linear v-show="this.deleting" height="20px" style="border-radius: 2px;" :value="Math.ceil((this.deleted / (this.filesSelected() + 1) + 0.05) * 100)" class="mx-12">
              <template v-slot="{ value }">
                <p class="pt-4 white--text" style="font-size: 16px">{{ Math.ceil(value) }}%</p>
              </template>
            </v-progress-linear>
          </v-row>
          <v-row justify="center" align="center" class="my-6">
            <v-btn tile color="red" class="mx-2" :disabled="deleting" @click="deleteFiles()">Yes, delete it</v-btn>
            <v-btn tile color="blue" class="mx-2" :disabled="deleting" @click="deleteDialog = false">No, don't</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog v-model="uploadDialog" max-width="400" :persistent="uploading">
      <v-card>
        <v-col>
          <v-row justify="center" align="center" class="mt-6 mb-2">
            <p>Upload an image!</p>
          </v-row>
          <v-row justify="center" align="center">
            <v-file-input
              v-model="uploadSelection"
              placeholder="Select files"
              label="File input"
              multiple
              prepend-icon="mdi-camera"
              class="mx-12"
              @change="uploadSelectionCheck()"
            >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-row>
          <v-row justify="center" align="center" class="mb-6 mt-2">
            <v-btn tile color="red" class="mx-2" :disabled="uploading" @click="upload()">Upload!</v-btn>
            <v-btn tile color="blue" class="mx-2" :disabled="uploading" @click="uploadDialog = false; uploadSelection = []">No, don't</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue"
import AdminMediaImageCard from "@/components/admin/AdminMediaImageCard.vue"
import { eventBus } from "@/event/eventBus.js"

import util from '../../util/util'

export default {
  name: "AdminMedia",
  components: {
    AdminNav,
    AdminMediaImageCard
  },
  data: () => ({
    page: 1,
    files: [],
    showFiles: [],
    selectedFiles: new Map(),
    loading: true,
    state: "Loading....",
    actionsOpen: false,
    sortingOptions: [
      {
        text: "Created date (newest first)",
        value: "createdNewest"
      },
      {
        text: "Created date (oldest first)",
        value: "createdOldest"
      },
      {
        text: "Alphabetically (A-Z)",
        value: "alphabetAz"
      },
      {
        text: "Alphabetically (Z-A)",
        value: "alphabetZa"
      }
    ],
    sorting: "createdNewest",
    deleteDialog: false,
    deleting: false,
    deleted: 0,
    uploadDialog: false,
    uploading: false,
    uploadSelection: [],
    uploaded: 0
  }),
  methods: {
    async sort() {
      this.loading = true
      this.state = "Sorting...."

      if(this.sorting === "createdNewest" || this.sorting === "createdOldest") {
        this.files.sort((a, b) => {
          if(a.createdAt < b.createdAt) return 1;
          
          if(a.createdAt > b.createdAt) return -1;
          
          return 0;
        })

        if(this.sorting === "createdOldest") this.files.reverse()
      }

      if(this.sorting === "alphabetAz" || this.sorting === "alphabetZa") {
        this.files.sort((a, b) => {
          if(a.name > b.name) return 1;
          
          if(a.name < b.name) return -1;
          
          return 0;
        })

        if(this.sorting === "alphabetZa") this.files.reverse()
      }

      this.refreshList()
      this.loading = false
    },
    
    async load() {
      this.parsePage()
      this.state = "Loading...."
      this.loading = true

      util.request("/media/list", {}, {}, "GET").then(response => {
        if(!response.data || !response.data.files) {
          this.loading = false
          return
        }

        this.files = response.data.files
        this.refreshList()

        this.sort()
      }).catch(() => {
        this.loading = false
        this.$store.commit("pushAlert", { text: "Getting images failed", type: "error" })
      })
    },

    refreshList() {
      const pageArray = this.pageArray()
      this.showFiles = this.files.slice(pageArray[0], pageArray[1])
    },

    parsePage() {
      const queryString = window.location.search
      const keyValuePairs = queryString.startsWith("?") ? queryString.substring(1, queryString.length).split("&") : []
      const query = new Map()
      keyValuePairs.forEach(pair => { const pairSplit = pair.split(/=+/); query.set(pairSplit[0], pairSplit[1]) })
      
      if(!query.has("page") || isNaN(parseInt(query.get("page")))) {
        this.page = 1;
        return
      }

      this.page = parseInt(query.get("page"))
    },

    pageArray() {
      if(this.page <= 1) {
        return [0, 20]
      }

      this.page = Math.min(Math.ceil(this.files.length / 20), this.page)

      return [(this.page - 1) * 20, this.page * 20]
    },

    nextPage() {
      this.page++
      this.refreshList()
    },

    previousPage() {
      this.page--
      this.refreshList()
    },

    resyncCache() {
      util.request("/media/resync").then(() => {
        this.loading = false
        this.$store.commit("pushAlert", { text: "Cache resync successful", type: "success" })
      }).catch(() => {
        this.loading = false
        this.$store.commit("pushAlert", { text: "Cache resync failed", type: "error" })
      })
    },

    filesSelected() {
      let count = 0;
      for(let entry of this.selectedFiles.entries()) if(entry[1]) count++;
      return count
    },

    selectAll() {
      this.files.forEach(it => {
        this.selectedFiles.set(it.name, true)
        eventBus.$emit("media-select", { name: it.name, state: true })
      })
    },

    deselectAll() {
      this.files.forEach(it => {
        if(!this.selectedFiles.has(it.name)) return
        this.selectedFiles.delete(it.name)
        eventBus.$emit("media-select", { name: it.name, state: false })
      })
    },

    deleteFiles() {
      this.deleted = 0;
      this.deleting = true
      for(let [name, state] of this.selectedFiles.entries()) {
        if(!state) continue
        util.request("/media/delete", {}, { name }, "DELETE").then(() => {
          this.deleted++;

          eventBus.$emit("file-delete", name)

          if(this.deleted >= this.filesSelected()) {
            this.deleting = false;
            this.deleteDialog = false;
            this.deleted = 0;
          }
        }).catch(error => {
          this.deleted++;
          let errorMessage = "Unknown"
          if(error.response && error.response.data && error.response.data.error) errorMessage = error.response.data.error;
          this.$store.commit("pushAlert", { text: `Deletion failed for ${name}. Error: ${errorMessage}`, type: "error" })
        })
      }
    },

    uploadSelectionCheck() {
      this.uploadSelection = this.uploadSelection.filter(it => [".png", ".jpg", ".jpeg", ".gif"].filter(extension => it.name.endsWith(extension)).length > 0)
    },

    async upload() {
      for(let file of this.uploadSelection) {
        const fileBase64 = await this.fileToBase64(file).catch(() => new Error())
        if(fileBase64 instanceof Error) {
          this.$store.commit("pushAlert", { text: `Upload failed for ${file.name}. Error: Base64 conversion failed`, type: "error" })
          continue;
        }
        util.request("/media/uploadBase64", {}, { imageBase64: fileBase64.split(",")[1], fileType: file.type.replace("image/", "") }).then(() => {
          this.$store.commit("pushAlert", { text: `Uploaded ${file.name}`, type: "success" })
          
          this.uploaded++;

          if(this.uploaded >= this.uploadSelection.length) {
            this.uploadSelection = []
            this.uploading = false;
            this.uploadDialog = false;
            this.uploaded = 0;

            this.load()
          }
        }).catch(error => {
          let errorMessage = "Unknown"
          if(error.response && error.response.data && error.response.data.error) errorMessage = error.response.data.error;
          this.$store.commit("pushAlert", { text: `Upload failed for ${file.name}. Error: ${errorMessage}`, type: "error" })
          this.uploaded++;
        })
      }
    },

    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    }
  },
  watch: {
    sorting() {
      this.sort()
    },

    page() {
      this.page = Math.max(1, this.page)

      if(this.files.length > 0) {
        this.page = Math.min(Math.ceil(this.files.length / 20), this.page)
      }
    }
  },
  async mounted() {
    this.load()

    eventBus.$on("file-delete", (name) => {
      let found = this.files.find(it => it.name == name)
      let showFound = this.showFiles.find(it => it.name == name)
      
      if(!found) return

      this.files.splice(this.files.indexOf(found), 1)
      this.$store.commit("pushAlert", { text: "File successfully deleted.", type: "success" })

      if(showFound) {
        this.showFiles.splice(this.showFiles.indexOf(showFound), 1)
      }
    })

    eventBus.$on("file-rename", (data) => {
      let { name, newName } = data
      let found = this.files.find(it => it.name == name)
      
      if(!found) return

      found.name = newName
      found.url = `https://media.antony.red/${newName}`
      this.$store.commit("pushAlert", { text: "File successfully renamed.", type: "success" })
    })

    eventBus.$on("media-check", (data) => {
      if(!data.state) {
        this.selectedFiles.delete(data.name)
        return
      }

      this.selectedFiles.set(data.name, data.state)
    })
  }
}
</script>
