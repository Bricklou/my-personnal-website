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
  {
    path: "/my-projects",
    name: "projects-list",
    component: () =>
      import ( /* webpackChunkNam: "projects-list" */ "./views/ProjectsList.vue"),
    meta: {
      auth: undefined
    }
  },
  {
    path: "/my-projects/:pageNumber",
    component: () =>
      import ( /* webpackChunkNam: "projects-list" */ "./views/ProjectsList.vue"),
    meta: {
      auth: undefined
    }
  },
  {
    path: "/new-project",
    name: "new-project",
    component: () =>
      import ( /* webpackChunckName: "new-project" */ "./views/admin/NewProject.vue"),
    meta: {
      auth: {
        roles: 2,
        redirect: {
          name: "login"
        },
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/project/:projectID",
    name: "project",
    component: () =>
      import ( /* webpackChunckName: "project" */ "./views/ProjectView.vue"),
    meta: {
      auth: undefined
    }
  },
  {
    path: "/project/:projectID/edit",
    name: "editProject",
    component: () =>
      import ( /* webpackChunckName: "editProject" */ "./views/admin/EditProject.vue"),
    meta: {
      auth: {
        roles: 2,
        redirect: {
          name: "login"
        },
        forbiddenRedirect: "/403"
      }
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
  },
  {
    path: "/404",
    component: () =>
      import ( /* webpackChunkName: "not-found" */ "./views/NotFound.vue"),
  },
  {
    path: "*",
    redirect: "/404"
  },
  ]
});

Vue.router = router;

export default router;