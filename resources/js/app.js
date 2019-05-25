/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import "./bootstrap";
import "es6-promise/auto";
import axios from "axios";
import Vue from "vue";
import VueAuth from "@websanova/vue-auth";
import VueAxios from "vue-axios";
import VueShortkey from "vue-shortkey";
import router from "./router";
import auth from "./utils/auth";
import "./utils/markdownConverter";
import App from "./App.vue";

/**
 * Adding shortcut support
 */
Vue.use(VueShortkey);

/**
 * Set Vue Authentication
 */

Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
Vue.use(VueAuth, auth);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, we say to Vue that it need to render our "App" component.
 */

new Vue({
  el: "#app",
  render: h => h(App),
  router
});