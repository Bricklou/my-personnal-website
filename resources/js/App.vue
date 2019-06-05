<template>
  <div id="app">
    <transition mode="out-in" name="fade">
      <div v-if="$auth.ready() && ready" id="page">
        <nav-bar
          id="navbar"
          class="is-fixed-top box is-paddingless"
          :class="showDynNav ? 'is-white' : 'is-transparent'"
          :text-class="showDynNav ? '' : 'has-text-white'"
        />
        <section class="hero">
          <div class="hero-head" :style="{'background-image': 'url(' + imgUrl + ')'}" />
          <div class="hero-body">
            <div class="container">
              <transition mode="out-in" name="fade">
                <router-view />
              </transition>
            </div>
          </div>
        </section>

        <notifications group="notify" position="top right" class="vue-notification-handler">
          <template slot="body" slot-scope="props">
            <div class="notification" :class="'is-' + props.item.type">
              <button class="delete is-small" @click="props.close" />
              <p>{{ props.item.text }}</p>
            </div>
          </template>
        </notifications>
      </div>
      <loading v-else id="loading" size="big" text="Bricklou's website" />
    </transition>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  import Loading from "./components/Loading.vue";

  export default {
    name: "App",
    components: { NavBar, Loading },
    data() {
      return {
        ready: false,
        imgUrl: "/images/banner.jpg",
        showDynNav: false
      };
    },

    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          this.ready = true;
        }
      };

      document.addEventListener("scroll", () => {
        this.showDynNav = window.scrollY > 60;
      });
    },
    destroyed() {
      document.removeEventListener("scroll");
    }
  };
</script>

<style lang="scss" scoped>
@import "../sass/app";

#app {
  height: 100vh;

  #page {

    .hero-head {
      background: grey no-repeat fixed center/cover;
      height: 500px;
    }

    .hero-body .container {
      min-height: 50vh;
    }
  }

  #loading {
    bottom: 25%;
    height: 50%;
    margin: auto;
    position: relative;
    top: 25%;
  }
}
</style>


