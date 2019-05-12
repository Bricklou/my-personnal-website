/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import "./bootstrap";
import Vue from "vue";
import App from "./App.vue";

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, we say to Vue that it need to render our "App" component.
 */

new Vue({
  el: "#app",
  render: h => h(App)
});
