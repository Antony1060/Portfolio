<template>
  <v-container>
    <v-layout row justify-center>
      <v-row justify="center" class="my-8">
        <p class="display-1">My skills</p>
      </v-row>
    </v-layout>
    <div v-for="(skills, name) in skills" :key="name">
      <v-layout row justify-center>
        <v-row justify="center">
          <p style="font-size: 2rem">{{ name }}</p>
        </v-row>
      </v-layout>
      <v-layout row justify-center wrap class="ma-2 mb-12" style="flex-wrap: wrap">
        <SkillsCard v-for="(item, index) in skills" :key="index"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          :route="item.route"/>
      </v-layout>
    </div>
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
    skills: {
      "Languages & frameworks": [
        {
          image: "/assets/images/java.png",
          title: "Java"
        },
        {
          image: "/assets/images/kotlin.png",
          title: "Kotlin"
        },
        {
          image: "/assets/images/typescript.png",
          title: "TypeScript"
        },
        {
          image: "/assets/images/javascript.png",
          title: "JavaScript"
        },
        {
          image: "/assets/images/react.svg",
          title: "ReactJS"
        },
        {
          image: "/assets/images/vue.png",
          title: "Vue.js"
        },
        {
          image: "/assets/images/golang.svg",
          title: "GoLang"
        },
        {
          image: "/assets/images/cpp.png",
          title: "C/C++"
        },
        {
          image: "/assets/images/python.png",
          title: "Python"
        },
        {
          image: "/assets/images/php.svg",
          title: "PHP"
        }
      ],
      Databases: [
        {
          image: "/assets/images/mysql.png",
          title: "MySQL"
        },
        {
          image: "/assets/images/mongodb.png",
          title: "MongoDB"
        },
        {
          image: "/assets/images/cassandra.png",
          title: "Cassandra"
        },
        {
          image: "/assets/images/scylla.svg",
          title: "Scylla"
        },
        {
          image: "/assets/images/redis.svg",
          title: "Redis"
        }
      ],
      Tools: [
        {
          image: "/assets/images/maven.png",
          title: "Maven"
        },
        {
          image: "/assets/images/gradle.svg",
          title: "Gradle"
        },
        {
          image: "/assets/images/yarn.svg",
          title: "Yarn"
        },
        {
          image: "/assets/images/npm.svg",
          title: "npm"
        },
        {
          image: "/assets/images/jest.svg",
          title: "Jest"
        },
        {
          image: "/assets/images/eslint.svg",
          title: "ESLint"
        },
        {
          image: "/assets/images/docker.png",
          title: "Docker"
        },
        {
          image: "/assets/images/kubernetes.svg",
          title: "Kubernetes"
        },
        {
          image: "/assets/images/git.png",
          title: "Git"
        },
        {
          image: "/assets/images/parcel.png",
          title: "Parcel"
        },
        {
          image: "/assets/images/terraform.svg",
          title: "Terraform"
        },
        {
          image: "/assets/images/ansible.svg",
          title: "Ansible"
        },
        {
          image: "/assets/images/bash.svg",
          title: "Bash"
        }
      ],
      Methodologies: [
        {
          image: "/assets/images/containerization.png",
          title: "Containerization"
        },
        {
          image: "/assets/images/agile.png",
          title: "Agile Development"
        },
        {
          image: "/assets/images/devops.png",
          title: "DevOps"
        }
      ]
    }
  })
}
</script>