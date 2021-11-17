<template>
  <nav>
    <v-app-bar class="grey darken-4" app>
      <v-toolbar-title @click="this.$router.push('/')">
        <router-link to="/" id="title" class="black--text" style="text-decoration: none">
          <span class="font-weight-light grey--text text--lighten-2">Antony</span>
          <span class="font-weight-bold grey--text text--lighten-2">Dev</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text class="blue--text" router to="/">
          Home
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
  export default {
      name: "Navbar"
  }
</script>
