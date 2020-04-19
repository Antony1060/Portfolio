import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    liveProjects: [
      { name: "CPS", path: "/cps", icon: "" },
      { name: "Random", path: "/random", icon: "" },
      { name: "Url Shortner", path: "/u", icon: "" }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
