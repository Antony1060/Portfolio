import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont';

Vue.config.productionTip = false

Vue.use(VueClipboard)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')