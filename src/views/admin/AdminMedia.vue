<template>
  <div>
    <AdminNav />

    <v-container fluid class="mt-4">
      <v-row justify="end" v-show="!loading">
        <v-col cols="10" sm="4" md="2" class="pa-0 mx-12" :class="{ 'mx-auto': $vuetify.breakpoint.xs, 'mt-12': $vuetify.breakpoint.xs }">
          <v-row justify="center" justify-sm="start">
            <p class="ma-2 mt-0">Sorting | Total images: {{ files.length }}</p>
          </v-row>
          <v-row justify="end" class="mb-0">
            <v-select :items="sortingOptions" v-model="sorting" solo></v-select>
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
    files: [],
    showFiles: [],
    loading: true,
    state: "Loading....",
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
    sorting: "createdNewest"
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

      this.showFiles = this.files.slice(0, 20)
      this.loading = false
    }
  },
  watch: {
    sorting() {
      this.sort()
    }
  },
  async mounted() {
    util.request("/media/list", {}, {}, "GET").then(response => {
      if(!response.data.data || !response.data.data.files) {
        this.loading = false
        return
      }

      this.files = response.data.data.files
      this.showFiles = this.files.slice(0, 20)

      this.sort()
    }).catch(() => {
      this.loading = false
      this.$store.commit("pushAlert", { text: "Getting images failed", type: "error" })
    })

    eventBus.$on("file-delete", (name) => {
      let found = this.files.find(it => it.name == name)
      
      if(!found) return

      this.files.splice(this.files.indexOf(found), 1)
      this.$store.commit("pushAlert", { text: "File successfully deleted.", type: "success" })
    })

    eventBus.$on("file-rename", (data) => {
      let { name, newName } = data
      let found = this.files.find(it => it.name == name)
      
      if(!found) return

      found.name = newName
      this.$store.commit("pushAlert", { text: "File successfully renamed.", type: "success" })
    })
  }
}
</script>
