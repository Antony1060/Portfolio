<template>
  <v-card max-width="70vw">
    <v-img
      :src="fileData.url"
      :height="height" :width="width"
      class="grey"
      contain
      @click="previewDialog = true"
    ></v-img>

    <v-dialog v-model="previewDialog" max-width="80vw" max-height="80vh">
      <v-card color="grey" @click="previewDialog = false">
        <v-img
          :src="fileData.url"
          height="80vh" width="80vw"
          contain
        ></v-img>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400" :persistent="deleting">
      <v-card>
        <v-col>
          <v-row justify="center" align="center" class="my-6">
            <p>Delete <b>{{ fileData.name }}</b>. Are you sure?</p>
          </v-row>
          <v-row justify="center" align="center" class="my-6">
            <v-btn tile color="red" class="mx-2" :disabled="deleting" @click="deleteFile">Yes, delete it</v-btn>
            <v-btn tile color="blue" class="mx-2" :disabled="deleting" @click="deleteDialog = false">No, don't</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="copyDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Copied</v-card-title>

        <v-card-text>
          <b>{{ fileData.url }}</b> copied to clipboard.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="copyDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="renameDialog" max-width="400" :persistent="renaming">
      <v-card>
        <v-col>
          <v-row justify="center" align="center" class="mt-6">
            <center><p class="mx-2" style="overflow: hidden;">Rename <b>{{ fileData.name }}</b></p></center>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="6">
              <v-row justify="center" align="center">
                <v-text-field width="80%" :label="'New name (+ .' + extension + ')'" v-model="newName"></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" class="my-6">
            <v-btn tile color="blue" class="mx-2" :disabled="renaming" @click="renameFile">Rename</v-btn>
            <v-btn tile color="red" class="mx-2" :disabled="renaming" @click="renameDialog = false">Cancel</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>

    <v-card-actions class="grey lighten-2">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <p class="text--center ma-auto ml-2" style="max-width: 100px; max-height: 24px; overflow: hidden;" v-on="on" v-bind="attrs">{{ fileData.name }}</p>
        </template>
        <span>{{ fileData.name }}</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-btn icon @click="renameDialog = true">
        <v-icon>edit</v-icon>
      </v-btn>

      <v-btn icon @click="copy">
        <v-icon>content_copy</v-icon>
      </v-btn>

      <v-btn icon @click="deleteDialog = true">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { eventBus } from "@/event/eventBus.js"

import util from "@/util/util"

export default {
  name: "AdminMediaImageCard",
  props: {
    fileData: {
      default: {}
    },
    width: {
      default: "16vw"
    },
    height: {
      default: "16vw"
    }
  },
  data: () => ({
    previewDialog: false,
    copyDialog: false,
    deleteDialog: false,
    deleting: false,
    renameDialog: false,
    renaming: false,
    newName: ""
  }),
  computed: {
    extension() {
      let extensionSplit = this.fileData.name.split(".")
      return extensionSplit.splice(extensionSplit.length - 1, extensionSplit.length)
    }
  },
  methods: {
    copy() {
      this.$copyText(this.fileData.url).then(this.copyDialog = true).catch(console.error)
    },

    deleteFile() {
      let name = this.fileData.name
      this.deleting = true;
      util.request("/media/delete", {}, { name }, "DELETE").then(() => {
        eventBus.$emit("file-delete", name)
        this.deleting = false;
      }).catch(error => {
        let errorMessage = "Unknown"
        if(error.response.data.error) errorMessage = error.response.data.error;
        this.$store.commit("pushAlert", { text: `Deletion failed. Error: ${errorMessage}`, type: "error" })
        this.deleteDialog = false;
        this.deleting = false;
      })
    },

    renameFile() {
      let name = this.fileData.name
      let newName = this.newName + "." + this.extension
      if(newName.length - this.extension.length > 32) {
        this.$store.commit("pushAlert", { text: `Renaming failed. Too many characters (max 32)`, type: "error" })
        return
      }
      if(newName.length - this.extension.length < 0) {
        this.$store.commit("pushAlert", { text: `Renaming failed. Name can't be empty`, type: "error" })
        return
      }
      this.renaming = true;
      util.request("/media/rename", {}, { name, newName }).then(() => {
        eventBus.$emit("file-rename", { name, newName })
        this.renaming = false;
      }).catch(error => {
        let errorMessage = "Unknown"
        if(error.response.data.error) errorMessage = error.response.data.error;
        this.$store.commit("pushAlert", { text: `Renaming failed. Error: ${errorMessage}`, type: "error" })
        this.renameDialog = false;
        this.renaming = false;
      })
    }
  }
}
</script>