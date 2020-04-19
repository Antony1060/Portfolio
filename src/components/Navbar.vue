<template>
  <nav>
    <v-app-bar class="grey darken-4" app>
      <v-toolbar-title @click="this.$router.push('/')">
        <router-link to="/" id="title" class="black--text" style="text-decoration: none">
          <span class="font-weight-light grey--text text--lighten-2">Antony</span>
          <span class="font-weight-bold grey--text text--lighten-2">Site</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text class="blue--text" router to="/">
          Home
        </v-btn>
        <!--<v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="blue--text text--darken-2">
              <v-icon left>expand_more</v-icon>
              <span>Projects</span>
            </v-btn>
          </template>
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>Live</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item v-for="(project, index) in this.$store.state.liveProjects" :key="index" router :to="project.path">
                    <v-list-item-title>{{ project.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Downloadable</v-expansion-panel-header>
              <v-expansion-panel-content>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-menu>-->
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
  export default {
      name: "Navbar",
      data: () => ({
      })
  }
</script>

<style scoped>
  #title {

  }
</style>