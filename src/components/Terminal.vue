<template>
  <v-container class="blue lighten-2" fluid>
    <v-layout row justify-center>
      <v-flex xs12 lg8>
        <v-card class="pa-4 mt-8 mb-8 mx-6" id="console" style="font-family: 'Courier New';" dark>
          <span class="green--text" id="root1"></span>
          <span class="white--text" id="cmd1"></span><br><br>
          <span class="white--text ml-6" id="resp1"></span><br>
          <span class="white--text ml-6" id="resp2"></span><br>
          <span class="white--text ml-6" id="resp3"></span><br><br>
          <span class="green--text" id="root2"></span>
          <span class="white--text" id="cmd2"></span><br>
          <router-link to="/" style="text-decoration: none;" class="mr-4"><span class="red--text" id="ls1"></span></router-link>
          <span class="blue--text" style="cursor: pointer;" @click="listProjects()" id="ls2"></span><br>
          <span class="green--text" id="root3"></span>
          <span class="white--text" id="cmd3"></span><br>
          <span class="green--text" id="root4"></span>
          <span class="white--text" id="cmd4"></span><br>
          <router-link v-for="(project, index) in this.$store.state.liveProjects" :key="index" :to="project.path" style="text-decoration: none;" class="mr-4"><span class="red--text" :id="'proj' + index"></span></router-link>
          <br><br><br><br><br><br><br><br><br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      name: "Teminal",
      data: () => ({
          projectsListed: false
      }),
      methods: {
          async listProjects() {
              if(!this.projectsListed) {
                  this.projectsListed = true;

                  let root = "root@antony.red $ ";
                  let cd = "cd ./Projects";
                  let ls = "ls";
                  let projects = this.$store.state.liveProjects;

                  let cmd3 = document.getElementById("cmd3");
                  let root4 = document.getElementById("root4");
                  let cmd4 = document.getElementById("cmd4");
                  for await (let i of cd.split("")) {
                      await new Promise(resolve => {
                          setTimeout(() => {
                              cmd3.innerHTML += i;
                              resolve();
                          }, 100)
                      })
                  }

                  root4.innerHTML = root;

                  for await (let i of ls.split("")) {
                      await new Promise(resolve => {
                          setTimeout(() => {
                              cmd4.innerHTML += i;
                              resolve();
                          }, 100)
                      })
                  }

                  for await (let [index, project] of projects.entries()) {
                      let span = document.getElementById("proj" + index);

                      for (let i of project.name.split("")) {
                          await new Promise(resolve => {
                              setTimeout(() => {
                                  span.innerHTML += i;
                                  resolve();
                              }, 40)
                          })
                      }
                  }
              }
          }
      },
      mounted() {
          let root = "root@antony.red $ ";
          let cat = "cat introduction.txt";
          let infoText1 = "Hi, I'm Antony, a 15 year old freelance developer.";
          let infoText2 = "I have an understanding of Java and JavaScript.";
          let infoText3 = "I also have experience using Node.js, a very popular JavaScript runtime";
          let ls = "ls";
          let list1 = "Homepage";
          let list2 = "Projects";

          let root1 = document.getElementById("root1");
          let cmd1 = document.getElementById("cmd1");
          let resp1 = document.getElementById("resp1");
          let resp2 = document.getElementById("resp2");
          let resp3 = document.getElementById("resp3");
          let root2 = document.getElementById("root2");
          let cmd2 = document.getElementById("cmd2");
          let ls1 = document.getElementById("ls1");
          let ls2 = document.getElementById("ls2");
          let root3 = document.getElementById("root3");

          root1.innerHTML = root;
          setTimeout(async () => {
              for await (let i of cat.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          cmd1.innerHTML += i;
                          resolve();
                      }, 100)
                  })
              }

              for await(let i of infoText1.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          resp1.innerHTML += i;
                          resolve();
                      }, 40)
                  })
              }
              for await(let i of infoText2.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          resp2.innerHTML += i;
                          resolve();
                      }, 40)
                  })
              }
              for await(let i of infoText3.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          resp3.innerHTML += i;
                          resolve();
                      }, 40)
                  })
              }

              root2.innerHTML = root;

              for await (let i of ls.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          cmd2.innerHTML += i;
                          resolve();
                      }, 100)
                  })
              }

              for await(let i of list1.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          ls1.innerHTML += i;
                          resolve();
                      }, 40)
                  })
              }

              for await(let i of list2.split("")) {
                  await new Promise(resolve => {
                      setTimeout(() => {
                          ls2.innerHTML += i;
                          resolve();
                      }, 40)
                  })
              }

              root3.innerHTML = root;
          }, 1000);
      }
  }
</script>