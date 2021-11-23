<template>
  <div>
    <AdminNav />
    <v-layout row justify-center v-if="sysInfo.length > 0" class="mt-12">
      <v-flex xs12 lg8 row style="gap: 2rem; justify-content: space-evenly;">
        <SysInfoDataCard name="Cpu" :data="systemInfo.cpu" />
        <SysInfoDataCard name="Ram" :data="systemInfo.ram" />
        <SysInfoDataCard name="Disk" :data="systemInfo.disk" />
        <SysInfoDataCard name="Net-Down" :data="systemInfo.netDown" />
        <SysInfoDataCard name="Net-Up" :data="systemInfo.netUp" />
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout row justify-center>
        <v-flex xs12 lg8>
          <v-card class="pa-4 mt-8 mb-8 mx-6" style="font-family: monospace;" dark>
            <div id="backendLogsDiv">
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue"
import SysInfoDataCard from "@/components/admin/SysInfoDataCard.vue"
import io from 'socket.io-client'
import AnsiUp from 'ansi_up'
import util from '../../util/util'

const ansi = new AnsiUp();

export default {
  name: "AdminPanel",
  components: {
    AdminNav,
    SysInfoDataCard
  },
  data: () => ({
    sysInfo: []
  }),
  methods: {
    startSocket() {
      if(this.$store.state.socket) return;
      
      this.$store.state.socket = io(process.env.VUE_APP_SOCKET_URL, {
        auth: {
          token: localStorage.getItem("jwtToken")
        }
      });

      this.$store.state.socket.on("connect_error", (err) => {
        this.sendLogMesssge("Socket connection error: " + err.message);
      });

      this.$store.state.socket.on("connect", () => {
        console.log("WebSocket connected.")
      });

      this.$store.state.socket.on("log-formatted", msg => {
        if(this.$router.currentRoute.name !== "AdminPanel") return
        this.sendLogMesssge(msg)
      });

      this.$store.state.socket.on("sys-info", info => {
        this.sysInfo = info;
      });
    },

    endSocket() {
      if(!this.$store.state.socket) return;

      this.$store.state.socket.disconnect();
      this.$store.state.socket = null;
    },

    sendLogMesssge(message) {
      let html = ansi.ansi_to_html(message).split("\n").join("<br>");

      let logDiv = document.getElementById("backendLogsDiv");
      logDiv.innerHTML += html + "<br>";
      if(logDiv.scrollTop === 0 || logDiv.scrollHeight - (logDiv.scrollTop + logDiv.clientHeight) < 100)
        logDiv.scrollTop = logDiv.scrollHeight;
    },

    pushAlert(text, type) {
      this.$store.commit('pushAlert', { text, type });
    }
  },
  computed: {
    systemInfo() {
      const latest = this.sysInfo[this.sysInfo.length - 1];

      return {
        cpu: latest.cpu.load.toFixed(2) + "%",
        ram: latest.memory.usage + "%",
        disk: latest.disk.usage.toFixed(2) + "%",
        netDown: latest.network.down.toFixed(2) + " b/s",
        netUp: latest.network.up.toFixed(2) + " b/s"
      }
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
  },
  beforeDestroy() {
    this.endSocket();
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
