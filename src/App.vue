<template>
  <v-app class="">
    <Navbar v-if="!this.$router.currentRoute.path.includes('soon')"></Navbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-alert :type="alertOptions.type" id="alertPosition" elevation="12" v-show="alertOptions.visible" transition="fade-transition">
      {{ alertOptions.text }}
    </v-alert>

    <Footer v-if="!this.$router.currentRoute.path.includes('soon')"/>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Footer from "./components/helper/Footer"
  import { eventBus } from "./event/eventBus"

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data: () => ({
      alertOptions: {
        text: "",
        type: "info",
        visible: false
      }
    }),
    mounted() {
      eventBus.$on("alert-change", (alertOptions) => {
        this.alertOptions = alertOptions
      })
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

  #alertPosition {
    position: fixed;
    z-index: 40;
    right: 20px;
    bottom: 10px;
  }
</style>
