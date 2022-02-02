import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cps from '../views/Cps.vue'
import Random from '../views/Random.vue'
import NotFound from "../views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/cps',
    name: 'Cps',
    component: Cps,
    meta: {
      title: "CPS"
    }
  },
  {
    path: "/random",
    name: "Random",
    component: Random,
    meta: {
      title: "Random"
    }
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
    meta: {
      title: "404 Not Found"
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = "AntonyDev | " + (to.meta.title || "Unknown page");
  next();
});

export default router
