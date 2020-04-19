<template>
  <div style="min-width: 100%">
    <Terminal />
    <Skills id="skills"/>
    <Contact />
    <More />
    <Footer />
  </div>
</template>

<script>
  import Terminal from "../components/Terminal";
  import Skills from "../components/Skills";
  import Contact from "../components/Contact";
  import More from "../components/More";
  import Footer from "../components/helper/Footer";

  export default {
      name: 'Home',
      components: {
          Footer,
          More,
          Contact,
          Terminal,
          Skills
      },
      mounted() {
          if(this.$router.currentRoute.fullPath === "/#skills") {
              this.$vuetify.goTo("#skills", { offset: -80, duration: 0 });
          }
      }
  }
</script>

<style scoped>
</style>