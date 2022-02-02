<template>
  <v-app class="">
    <Navbar />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Footer from "./components/helper/Footer"

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
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
