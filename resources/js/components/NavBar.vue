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

    <div id="navbarMobile" :class="{'is-active': showNav}" class="navbar-menu">
      <div class="navbar-start" />
      <div class="navbar-end">
        <router-link :class="textClass" class="navbar-item" to="/">
          Accueil
        </router-link>

        <router-link :class="textClass" class="navbar-item" to="/about-me">
          A propos
        </router-link>

        <router-link
          v-if="!$auth.check()"
          :class="textClass"
          class="navbar-item"
          to="/register"
        >
          Inscription
        </router-link>
        <router-link
          v-if="!$auth.check()"
          :class="textClass"
          class="navbar-item"
          to="/login"
        >
          Connexion
        </router-link>

        <router-link
          v-if="$auth.check([1, 2])"
          :class="textClass"
          class="navbar-item"
          to="/dashboard"
        >
          Mon compte
        </router-link>

        <router-link
          v-if="$auth.check(2)"
          :class="textClass"
          class="navbar-item"
          to="/admin"
        >
          Administration
        </router-link>

        <a
          v-if="$auth.check([1, 2])"
          :class="textClass"
          class="navbar-item"
          @click.prevent="$auth.logout()"
        >Déconnexion</a>
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
        default: "",
        required: false
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
@import "~bulma/bulma";

.navbar {
  &.is-transparent {
    background-color: transparent !important;
  }

  &.box {
    border-radius: 0 0 6px 6px !important;
  }
}

#navbarMobile {
  a:hover {
    background-color: rgba(255, 255, 255, 30%) !important;
  }

  @media screen and (max-width: (calc(#{$desktop} - 1px))) {
    background-color: rgba(0, 0, 0, 25%) !important;
  }
}
</style>


