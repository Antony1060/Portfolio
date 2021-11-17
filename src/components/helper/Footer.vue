<template>
  <v-system-bar height="50px" class="justify-center" style="z-index: 20">
    <v-icon>copyright</v-icon>
    <span>Antony 2020 - {{ new Date().getFullYear() }}. All rights reserved.</span>
  </v-system-bar>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>
