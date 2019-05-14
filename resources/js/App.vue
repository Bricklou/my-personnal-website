<template>
  <div id="app">
    <transition mode="out-in" name="fade">
      <div id="page">
        <section class="hero">
          <div class="hero-head" :style="{'background-image': 'url(' + imgUrl + ')'}">
            <nav-bar class="is-transparent" text-class="has-text-white" />
          </div>
          <div class="hero-body">
            <div class="container">
              <transition mode="out-in" name="fade">
                <router-view />
              </transition>
            </div>
          </div>
        </section>
        <transition mode="out-in" name="fade">
          <nav-bar
            v-if="showDynNavBar"
            id="dynamic-navbar"
            class="is-white is-fixed-top box is-paddingless"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  export default {
    name: "App",
    components: { NavBar },
    data() {
      return {
        showDynNavBar: false,
        ready: false,
        imgUrl: "/images/banner.jpg"
      };
    },
    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          this.ready = true;
        }
      };
      document.addEventListener("scroll", () => {
        this.showDynNavBar = window.scrollY >= 75;
      });
    }
  };
</script>

<style lang="scss" scoped>
@import '../sass/app';

.hero-head {
  background: grey no-repeat fixed center/cover;
  height: 500px;
}

#loading {
  bottom: 25%;
  height: 50%;
  margin: auto;
  position: relative;
  top: 25%;
}

#app {
  height: 200vh;

  .hero-body .container {
    min-height: 50vh;
  }
}
</style>


