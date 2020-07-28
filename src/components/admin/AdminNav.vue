<template>
  <div>
    <v-navigation-drawer dark fixed stateless permanent :mini-variant="this.$store.state.navigationOpen" class="hidden-sm-and-down" style="z-index: 10; top: 64px;">
      <AdminNavList :propObj="{ closeTitle: 'Expand', menuIcon: this.$store.state.navigationOpen ? 'menu' : 'menu_open', click: modifyStoreOpenState }" />
    </v-navigation-drawer>

    <v-btn absolute dark class="hidden-md-and-up" :top="true" :left="true" @click="mobileVisible = !mobileVisible; this.$store.state.mobileNavigationOpen = this.mobileVisible;">
      <v-icon>
        menu
      </v-icon>
    </v-btn>
    <v-navigation-drawer dark absolute touchless v-model="mobileVisible" class="hidden-md-and-up">
      <AdminNavList :propObj="{ closeTitle: 'Close', menuIcon: 'menu_open', click() { mobileVisible = !mobileVisible; this.$store.state.mobileNavigationOpen = this.mobileVisible; } }" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import AdminNavList from "../helper/AdminNavList.vue"
import { eventBus } from "@/event/eventBus.js"

export default {
  name: "AdminNav",
  components: {
    AdminNavList
  },
  data: () => ({
    mobileVisible: false
  }),
  methods: {
    modifyStoreOpenState() {
      this.$store.commit("modifyNavigationOpen", !this.$store.state.navigationOpen)
    }
  },
  mounted() {
    this.mobileVisible = this.$store.state.mobileNavigationOpen;
    eventBus.$on("mobile-navigation-change", () => {
      this.mobileVisible = !this.mobileVisible
      this.$store.state.mobileNavigationOpen = this.mobileVisible
    })
  }
}
</script>