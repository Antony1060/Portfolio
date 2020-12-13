<template>
  <div style="min-width: 100%">
    <Terminal />
    <Skills id="skills"/>
    <Contact />
    <More />
  </div>
</template>

<script>
  import Terminal from "../components/Terminal";
  import Skills from "../components/Skills";
  import Contact from "../components/Contact";
  import More from "../components/More";

  export default {
      name: 'Home',
      components: {
          More,
          Contact,
          Terminal,
          Skills
      },
      mounted() {
          if(this.$router.currentRoute.fullPath === "/#skills") {
              this.$vuetify.goTo("#skills", { offset: -20 });
          }
      }
  }
</script>

<style scoped>
</style>