<template>
  <div>
    <AdminNav />

    <v-container fluid class="mt-12">
      <v-layout row justify-center>
        <v-flex xs12 lg8>
          <v-card class="pa-4 mt-8 mb-8 mx-6" style="font-family: monospace;" dark>
            <div id="backendLogsDiv">
            </div>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row justify-center>
        <v-flex xs12 lg8>
          <p>Cpu: {{ sysInfo[sysInfo.length - 1].cpu.load }}%</p>
          <p>Ram: {{ sysInfo[sysInfo.length - 1].memory.usage }}%</p>
          <p>Disk: {{ sysInfo[sysInfo.length - 1].disk.usage }}%</p>
          <p>Net-Down: {{ sysInfo[sysInfo.length - 1].network.down }}B</p>
          <p>Net-Up: {{ sysInfo[sysInfo.length - 1].network.up }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue"
import io from 'socket.io-client'
import AnsiUp from 'ansi_up'
import util from '../../util/util'

const ansi = new AnsiUp();

export default {
  name: "AdminPanel",
  components: {
    AdminNav
  },
  data: () => ({
    sysInfo: []
  }),
  methods: {
    startSocket() {
      if(this.$store.state.socket) {
        return
      }
      
      this.$store.state.socket = io("https://socket.antony.red:8443", {
        path: "/backend"
      });

      this.$store.state.socket.on("connect", () => {
        console.log("WebSocket connected.")
      })

      this.$store.state.socket.on("log-formatted", msg => {
        if(this.$router.currentRoute.name !== "AdminPanel") return
        this.sendLogMesssge(msg)
      })
    },

    sendLogMesssge(message) {
      console.log(message)
      let html = ansi.ansi_to_html(message).split("\n").join("<br>");

      let logDiv = document.getElementById("backendLogsDiv");
      logDiv.innerHTML += html + "<br>";
      logDiv.scrollTop = logDiv.scrollHeight;
    },

    pushAlert(text, type) {
      this.$store.commit('pushAlert', { text, type });
    }
  },
  mounted() {
    util.request("/log/getInitialLog", {}, {}, "GET").then(response => {
      if(!response.data) this.startSocket();

      this.sendLogMesssge(response.data)
      this.startSocket()
    }).catch(error => {
      console.error(error);
      this.startSocket();
    });

    util.request("/sys/latest", {}, {}, "GET").then(response => {
      this.sysInfo = response.data;
      setInterval(() => {
        util.request("/sys/latest", {}, {}, "GET").then(response => {
          this.sysInfo = response.data;
        })
      }, 2000);
    })
  }
}
</script>

<style scoped>
  #backendLogsDiv {
    height: 500px;
    min-height: 500px;
    max-height: 500px;
    overflow-y: auto;
  }
</style>
