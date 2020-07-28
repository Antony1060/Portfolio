import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cps from '../views/Cps.vue'
import Random from '../views/Random.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../views/admin/AdminPanel.vue'
import AdminMedia from '../views/admin/AdminMedia.vue'
import PrivateTimetable from "../views/PrivateTimetable";
import Soon from "../views/Soon";
import NotFound from "../views/NotFound";

import util from "../util/util"

Vue.use(VueRouter);

const restrictLogged = ["Login"]
const allowLogged = ["AdminPanel", "AdminMedia"]

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
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/admin",
    redirect: "/admin/main"
  },
  {
    path: "/admin/main",
    name: "AdminPanel",
    component: AdminPanel,
    meta: {
      title: "Admin Panel"
    }
  },
  {
    path: "/admin/media",
    component: AdminMedia,
    name: "AdminMedia",
    meta: {
      title: "Admin Media Panel"
    }
  },
  {
    path: "/timetable",
    name: "Timetable",
    component: PrivateTimetable,
    meta: {
      title: "Timetable"
    }
  },
  {
    path: "/soon",
    name: "Soon",
    component: Soon,
    meta: {
      title: "To be added"
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    meta: {
      title: "404 Not Found"
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if(!restrictLogged.includes(to.name) && !allowLogged.includes(to.name)) {
    next()
    return
  }

  let authenticated = await isAuthenticated()
  if(restrictLogged.includes(to.name) && authenticated) {
    next({ name: "AdminPanel" })
    return
  } else if(allowLogged.includes(to.name) && !authenticated) {
    next({ name: "Login" })
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  document.title = "AntonySite | " + (to.meta.title || "Unknown page");
  next();
});

/**
 * @returns {Boolean} True if authenticated, false if not.
 */
function isAuthenticated() {
  return new Promise((resolve) => {
    let token = localStorage.getItem("jwtToken");

    if(!token) resolve(false)
  
    util.request("/auth/validate", {}, { token }, "POST").then(response => {
      resolve(response.data.data.valid)
    }).catch(error => {
      console.log(error)
      resolve()
    })
  })
}

export default router
