<template>
  <v-row>
    <v-col>
      <p id="info" class="text-center my-2 headline">{{ infoText }}{{ infoValue }}</p>
      <p class="text-center my-2 headline">Time: {{ Math.round(this.time * 100) / 100 }}</p>
      <v-btn class="my-2" @click="click" :disabled="disabled" id="btn" outlined>
        <span class="display-4 hidden-sm-and-down">Click me</span>
        <span class="display-2 hidden-md-and-up">Click me</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
      name: "Cps",
      data: () => ({
          clicks: 0,
          infoText: "Clicks ",
          infoValue: "",
          disabled: false,
          time: 0,
          interval: null
      }),
      methods: {
          click() {
              if (this.clicks === 0) {
                  this.infoText = "Clicks: ";
                  this.infoValue = this.clicks;
                  setTimeout(() => {
                      this.infoText = "CPS: ";
                      this.infoValue = this.clicks / 10;
                      this.disabled = true;
                      this.clicks = 0;
                      this.time = 0;
                      clearInterval(this.interval);
                      setTimeout(() => {
                          this.disabled = false;
                      }, 1000)
                  }, 10000);
                  this.interval = setInterval(() => {
                      this.time += 0.1;
                  }, 100);
              }
              this.clicks++;
              this.infoValue = this.clicks;
          }
      }
  }
</script>

<style scoped>
  #btn {
    height: 40vh;
    width: 80vw;
    margin: 10vw;
  }
</style>