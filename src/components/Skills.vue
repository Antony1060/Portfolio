<template>
  <v-container>
    <v-layout row justify-center>
      <v-row xs12 justify="center" class="my-8">
        <p class="display-1">I can speak</p>
      </v-row>
    </v-layout>
    <v-layout row justify-center wrap class="ma-2 mb-12">
      <v-row justify="center" class="mt-2 mb-4 mx-4">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 20 : 6" height="420px" width="240px" class="pa-6 pt-2">
            <div class="text--primary headline mt-6" align="center">
              <v-img src="../assets/javaLogo.png" height="160px" width="160px"></v-img>
              Java
            </div>
            <div class="black--text font-weight-regular text-center mt-4" style="font-size: 18px">
              I can make all sorts of programs in java. From simple CLIs to GUIs
              <v-btn outlined width="140px" class="mt-8" router to="/soon">More</v-btn>
            </div>
          </v-card>
        </v-hover>
      </v-row>
      <v-row justify="center" class="mt-2 mb-4 mx-6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 20 : 6" height="420px" width="240px" class="pa-6 pt-2">
            <div class="text--primary headline mt-6" align="center">
              <v-img src="../assets/spigotLogo.png" height="160px" width="160px"></v-img>
              Spigot
            </div>
            <div class="black--text font-weight-regular text-center mt-4" style="font-size: 18px">
              I can offer highly customizable custom plugins with Spigot.
              <v-btn outlined width="140px" class="mt-8" router to="/soon">More</v-btn>
            </div>
          </v-card>
        </v-hover>
      </v-row>
      <v-row justify="center" class="mt-2 mb-4 mx-6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 20 : 6" height="420px" width="240px" class="pa-6 pt-2">
            <div class="text--primary headline mt-6" align="center">
              <v-img src="../assets/jsLogo.png" height="160px" width="160px"></v-img>
              JavaScript
            </div>
            <div class="black--text font-weight-regular text-center mt-4" style="font-size: 18px">
              I'm very comfortable with general JS and APIs like Discord.js
              <v-btn outlined width="140px" class="mt-8" router to="/soon">More</v-btn>
            </div>
          </v-card>
        </v-hover>
      </v-row>
      <v-row justify="center" class="mt-2 mb-4 mx-6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 20 : 6" height="420px" width="240px" class="pa-6 pt-2">
            <div class="text--primary headline mt-6" align="center">
              <v-img src="../assets/vueLogo.png" height="160px" width="160px"></v-img>
              Vue.js
            </div>
            <div class="black--text font-weight-regular text-center mt-4" style="font-size: 18px">
              I understand the Vue ecosystem and can make websites like this
              <v-btn outlined width="140px" class="mt-8" router to="/soon">More</v-btn>
            </div>
          </v-card>
        </v-hover>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      name: "Skills"
  }
</script>