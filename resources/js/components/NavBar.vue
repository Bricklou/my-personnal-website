<template>
  <nav aria-label="main navigation" class="navbar has-text-weight-semibold" role="navigation">
    <div class="navbar-brand">
      <router-link :class="textClass" class="navbar-item" to="/">
        Bricklou's website
      </router-link>
      <a
        :class="[showNav ? 'is-active' : '', textClass]"
        aria-expanded="false"
        aria-label="menu"
        class="navbar-burger burger"
        data-target="navbarMobile"
        role="button"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarMobile" :class="{'is-active': showNav}" class="navbar-menu is-transparent">
      <div class="navbar-start" />
      <div class="navbar-end">
        <router-link :class="textClass" class="navbar-item" to="/">
          Accueil
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    props: {
      textClass: {
        type: String,
        default: () => ""
      }
    },
    data() {
      return {
        showNav: false
      };
    }
  };
</script>

<style lang="scss" scoped>
@import '~bulma/bulma';

#navbarMobile {
  a:hover {
    background-color: rgba(255, 255, 255, 30%) !important;
  }

  @media screen and (max-width: (calc(#{$desktop} - 1px))) {
    background-color: rgba(0, 0, 0, 25%) !important;
  }
}
</style>


