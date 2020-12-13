<template>
  <v-container class="blue lighten-2 mt-12 skewEffectContainer" fluid>
    <v-layout row wrap justify-center class="text-center skewEffectText">
      <v-row justify="center" xs12>
        <div class="hidden-xs-only">
          <p class="display-1 font-weight-regular mt-12">Want to reach out to me?</p><br>
          <span class="headline font-weight-light">Discord: <span class="font-italic">Antony#9971</span></span><br>
          <span class="headline font-weight-light">Email me: <a class="font-italic indigo--text font-weight-regular" href="mailto:antony@antony.red">antony@antony.red</a></span><br>
          <span class="headline font-weight-light">Tweet at me <a class="font-italic indigo--text font-weight-regular" href="https://twitter.com/AntonyThe1060">@AntonyThe1060</a></span><br>
        </div>
        <div class="hidden-sm-and-up">
          <p class="font-weight-regular mt-8" style="font-size: 28px">Want to reach out to me?</p><br>
          <span class="headline font-weight-light">Discord: <span class="font-italic">Antony#9971</span></span><br>
          <span class="headline font-weight-light">Email me: <a class="font-italic indigo--text font-weight-regular" href="mailto:antony@antony.red">antony@antony.red</a></span><br>
          <span class="headline font-weight-light">Tweet at me <a class="font-italic indigo--text font-weight-regular" href="https://twitter.com/AntonyThe1060">@AntonyThe1060</a></span><br>
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Contact",
  }
</script>

<style>
.skewEffectContainer {
  transform: skewY(1deg);
  height: 300px;
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
