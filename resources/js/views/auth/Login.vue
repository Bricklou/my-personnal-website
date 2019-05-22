<template>
  <div id="login">
    <h1 class="title is-1">
      Connexion
    </h1>

    <form method="post" class="columns is-desktop" @submit.prevent="login">
      <div class="box column is-three-fifths is-offset-one-fifth">
        <div v-if="has_error" class="notification is-danger">
          <p>Erreur, impossible de se connecter avec ces identifiants.</p>
        </div>

        <div class="field">
          <label class="label">Adresse E-mail</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="email"
                   class="input"
                   placeholder="Adresse E-mail"
                   type="email"
                   required
            >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control has-icons-left">
            <input v-model="password"
                   class="input"
                   placeholder="Mot de passe"
                   type="password"
                   required
            >
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <label class="checkbox">
            <input v-model="remember" type="checkbox">
            Se souvenir de moi
          </label>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" type="submit">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        email: null,
        password: null,
        remember: false,
        has_error: false
      };
    },

    methods: {
      login() {
        const redirect = this.$auth.redirect();
        const app = this;
        this.$auth.login({
          params: {
            email: app.email,
            password: app.password
          },
          success: () => {
            const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? "admin.dashboard" : "dashboard";
            this.$router.push({
              name: redirectTo
            });
          },

          error: () => {
            app.has_error = true;
          },

          rememberMe: this.remember,
          fetchUser: true
        });
      }
    }
  };
</script>
