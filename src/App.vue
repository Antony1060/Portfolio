<template>
  <v-app class="">
    <Navbar v-if="!this.$router.currentRoute.path.includes('timetable') && !this.$router.currentRoute.path.includes('soon')"></Navbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";
  export default {
      name: 'App',
      components: {
        Navbar
      }
  };
</script>

<style>
  html, body {
    overflow-x: hidden;
  }

  body {
    background-color: #212121;
  }
</style>
