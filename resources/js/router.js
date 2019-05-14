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
            import ( /* webpackChunkName: "home" */ "./views/Home.vue")
  }]
});

export default router;