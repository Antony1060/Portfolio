<template>
  <v-container fluid class="my-12">
    <v-layout row justify-center wrap>
      <v-row justify="center">
        <v-card width="600px" height="460px" class="my-12 pa-6 text-center hidden-xs-only" elevation="20">
          <span class="display-2 font-weight-light">A bit more</span><br>
          <p class="title font-weight-regular mt-8 mb-10" style="line-height: 38px" v-html="aBitMore"></p>
          <v-btn outlined href="https://github.com/antony1060">My GitHub</v-btn>
        </v-card>
        <v-card width="340px" height="800px" class="mt-12 pa-6 text-center hidden-sm-and-up" elevation="20">
          <span class="display-2 font-weight-light">A bit more</span><br>
          <p class="title font-weight-regular mt-6 mb-10" style="line-height: 38px" v-html="aBitMore"></p>
          <v-btn outlined href="https://github.com/antony1060" class="mb-4">My GitHub</v-btn><br>
        </v-card>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      name: "More",
      data: () => ({
          aBitMore: `Hi.
                          I'm an ambitious 17-year-old developer positioned in Croatia.
                          Currently working on expanding my skillset constantly looking for new job opportunities.
                          Have currently worked with many happy clients as a freelancer.
                          If you're interested in my work or just want to talk to me, feel free to message me!
                          ...
                          Also, join <a href="https://discord.gg/mH5xzQmPaq">DevTalk</a>`
      })
  }
</script>