import Vue from 'vue'
import Vuex from 'vuex'
import { eventBus } from '../event/eventBus'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    liveProjects: [
      { name: "Soon", path: "/", icon: "" }
    ],
    socket: null,
    navigationOpen: !false
  },
  mutations: {
    pushAlert(state, alertOptions) {
      if(!alertOptions.text) alertOptions.text = ""
      if(!alertOptions.type) alertOptions.type = "info"
      alertOptions.visible = true

      eventBus.$emit("alert-change", alertOptions)
      setTimeout(() => {
        alertOptions.visible = false;
        eventBus.$emit("alert-change", alertOptions)
      }, 2000)
    },

    pushMobileNavigationChange() {
      eventBus.$emit("mobile-navigation-change")
    },

    modifyNavigationOpen(state, navigationOpenState) {
      state.navigationOpen = navigationOpenState;
    }

  },
  actions: {
  },
  getters: {
    getToken() {
      return localStorage.getItem("jwtToken")
    }
  }
})
