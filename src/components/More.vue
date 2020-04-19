<template>
  <v-container fluid class="my-12">
    <v-layout row justify-center wrap>
      <v-row justify="center">
        <v-card width="600px" height="500px" class="my-12 pa-6 text-center hidden-xs-only" elevation="20">
          <span class="display-2 font-weight-light">A bit more</span><br>
          <p class="title font-weight-regular mt-8 mb-10" style="line-height: 38px" v-html="aBitMore"></p>
          <v-btn outlined href="https://github.com/antony1060">My GitHub</v-btn>
          <v-btn outlined href="https://firecloud.tech" class="ml-8">Visit FireCloud</v-btn>
        </v-card>
        <v-card width="340px" height="800px" class="mt-12 pa-6 text-center hidden-sm-and-up" elevation="20">
          <span class="display-2 font-weight-light">A bit more</span><br>
          <p class="title font-weight-regular mt-6 mb-10" style="line-height: 38px" v-html="aBitMore"></p>
          <v-btn outlined href="https://github.com/antony1060" class="mb-4">My GitHub</v-btn><br>
          <v-btn outlined href="https://firecloud.tech">Visit FireCloud</v-btn>
        </v-card>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      name: "More",
      data: () => ({
          aBitMore: "Along with the languages and frameworks specified above, I know HTML, CSS, C and C++.\n" +
              "            I have had around 5-6 years of experience with general programming.\n" +
              "            I am currently taking commissions and trying to enlargen my scopes.\n" +
              "            Project I think are worthy, I will post on my GitHub.\n" +
              "            Besides being a developer, I am also the CTO and a Manager of Firecloud Hosting,\n" +
              "            a small startup started by my friend <a href=\"https://derock.dev\">Derock</a>."
      })
  }
</script>