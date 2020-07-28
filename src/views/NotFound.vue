<template>
  <v-container fluid class="grey lighten-4" fill-height>
    <v-layout row wrap justify-center align-center class="text-center">
      <v-row justify="center" class="mb-12" align="center">
        <div class="mb-12">
          <p class="display-4 mb-6">404</p><br>
          <span class="display-2">Looks like you got lost....</span><br>
          <v-btn class="headline mt-8 px-5 py-5" router to="/" outlined>Homepage</v-btn>
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      name: "NotFound"
  }
</script>