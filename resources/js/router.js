import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  history: true,
  routes: [{
    path: "/",
    name: "home",
    component: () =>
                import ( /* webpackChunkName: "home" */ "./views/Home.vue"),
    meta: {
      auth: undefined
    }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
                import ( /* webpackChunkName: "register" */ "./views/auth/Register.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
                import ( /* webpackChunkName: "login" */ "./views/auth/Login.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/about-me",
    name: "about-me",
    component: () =>
                import ( /* webpackChunkName: "about-me" */ "./views/AboutMe.vue"),
    meta: {
      auth: undefined
    }
  },
  // USER ROUTES
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
                import ( /* webpaclChunkName: "dashboard" */ "./views/user/Dashboard.vue"),
    meta: {
      auth: true
    }
  },
  // ADMIN ROUTES
  {
    path: "/admin",
    name: "admin.dashboard",
    component: () =>
                import ( /* webpackChunkName: "admin" */ "./views/admin/Dashboard.vue"),
    meta: {
      auth: {
        roles: 2,
        redirect: {
          name: "login"
        },
        forbiddenRedirect: "/403"
      }
    }
  }
  ]
});

Vue.router = router;

export default router;