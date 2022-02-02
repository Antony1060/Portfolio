<template>
  <v-container class="blue lighten-2 mt-12 skewEffectContainer" fluid>
    <v-layout row wrap justify-center class="text-center skewEffectText">
      <v-row justify="center" xs12>
        <div class="hidden-xs-only">
          <p class="display-1 font-weight-regular mt-12">My contact information</p><br>
          <div v-if="this.contactInfo === null">
            <span class="headline font-weight-light">Loading...</span>
          </div>
          <div v-else>
            <span class="headline font-weight-light">Discord: <span class="font-italic">{{ this.contactInfo.discord }}</span></span><br>
            <span class="headline font-weight-light">Github: <a class="indigo--text font-weight-regular" :href="this.contactInfo.github">Antony1060</a></span> <br>
            <span class="headline font-weight-light">Email: <a class="indigo--text font-weight-regular" href="mailto:antony@antony.red">antony@antony.red</a></span><br>
            <span class="headline font-weight-light">Linked In: <a class="indigo--text font-weight-regular" :href="this.contactInfo.linkedIn">/in/Antony1060</a></span><br>
            <span class="headline font-weight-light">Twitter: <a class="indigo--text font-weight-regular" :href="this.contactInfo.twitter">@AntonyThe1060</a></span><br>
          </div>
        </div>
        <div class="hidden-sm-and-up">
          <p class="font-weight-regular mt-8" style="font-size: 28px">My contact information</p><br>
          <div v-if="this.contactInfo === null">
            <span class="headline font-weight-light">Loading...</span>
          </div>
          <div v-else>
            <span class="headline font-weight-light">Discord: <span class="font-italic">{{ this.contactInfo.discord }}</span></span><br>
            <span class="headline font-weight-light">Github: <a class="indigo--text font-weight-regular" :href="this.contactInfo.github">Antony1060</a></span> <br>
            <span class="headline font-weight-light">Email: <a class="indigo--text font-weight-regular" href="mailto:antony@antony.red">antony@antony.red</a></span><br>
            <span class="headline font-weight-light">Linked In: <a class="indigo--text font-weight-regular" :href="this.contactInfo.linkedIn">/in/Antony1060</a></span><br>
            <span class="headline font-weight-light">Twitter: <a class="indigo--text font-weight-regular" :href="this.contactInfo.twitter">@AntonyThe1060</a></span><br>
          </div>
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Contact",
    data: () => ({
      contactInfo: null
    }),
    mounted() {
      axios.get("https://backend.antony.red/about/contact").then(data => {
        this.contactInfo = data
      })
    }
  }
</script>

<style>
.skewEffectContainer {
  transform: skewY(1deg);
  height: 350px;
  transition: 0.06s linear;
}

.skewEffectText {
  transform: skewY(-1deg);
  transition: 0.06s linear;
}

.skewEffectContainer:hover {
  transform: skewY(-1deg);
  box-shadow: 4px 10px 20px gray;
  transition: 0.06s linear;
}

.skewEffectContainer:hover > .skewEffectText {
  transform: skewY(1deg);
  transition: 0.06s linear;
}
</style>
