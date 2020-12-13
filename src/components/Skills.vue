<template>
  <v-container>
    <v-layout row justify-center>
      <v-row justify="center" class="my-8">
        <p class="display-1">My skills</p>
      </v-row>
    </v-layout>
    <v-layout row justify-center wrap class="ma-2 mb-12" style="flex-wrap: wrap">
      <SkillsCard v-for="(item, index) in skills" :key="index"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :route="item.route"/>
    </v-layout>
  </v-container>
</template>

<script>
import SkillsCard from "@/components/SkillsCard";

export default {
  name: "Skills",
  components: {
    SkillsCard
  },
  data: () => ({
    skills: [{
        image: "/assets/images/javaLogo.png",
        title: "Java",
        description: "I can make all sorts of programs in Java. From simple CLIs to GUIs.",
        route: "/soon#java"
      },
      {
        image: "/assets/images/kotlinLogo.png",
        title: "Kotlin",
        description: "I have worked on many projects built with the Kotlin language.",
        route: "/soon#kotlin"
      },
      {
        image: "/assets/images/jsLogo.png",
        title: "JavaScript",
        description: "I'm very comfortable using both browser JS and Node.js.",
        route: "/soon#js"
      },
      {
        image: "/assets/images/tsLogo.png",
        title: "TypeScript",
        description: "I have made a few libraries with TypeScript and am comfortable using it.",
        route: "/soon#ts"
      },
      {
        image: "/assets/images/vueLogo.png",
        title: "Vue.js",
        description: "I understand the Vue ecosystem and can make websites like this one.",
        route: "/soon#vue"
      },
      {
        image: "/assets/images/cppLogo.png",
        title: "C/C++",
        description: "I can write fast and efficient algorithms to solve almost any problem.",
        route: "/soon#cpp"
      },
      {
        image: "/assets/images/pyLogo.png",
        title: "Python",
        description: "I have made many projects and command line tools using Python.",
        route: "/soon#py"
      },
      {
        image: "/assets/images/dbLogo.png",
        title: "MySQL & MongoDB",
        description: "These always help while working on projects.",
        route: "/soon#db"
      }]
  })
}
</script>