<template>
  <div id="register">
    <h1 class="title is-1">
      Inscription
    </h1>

    <form
      v-if="!success"
      autocomplete="off"
      class="columns is-desktop"
      method="post"
      @submit.prevent="register"
    >
      <div class="box column is-three-fifths is-offset-one-fifth">
        <div v-if="has_error && !success" class="notification is-danger">
          <p
            v-if="validation_error"
          >
            Erreur(s) de validation, veuillez consulter le(s) message(s) ci-dessous.
          </p>
          <p v-else>
            Erreur, impossible de s'inscrire pour le moment. Si le problème persiste, veuillez contacter un
            administrateur.
          </p>
        </div>

        <div class="control is-expanded">
          <div class="field">
            <label class="label">Nom d'utilisateur</label>
            <div class="control has-icons-left">
              <input
                v-model="username"
                :class="{ 'is-danger': has_error && errors.username}"
                class="input"
                placeholder="Nom d'utilisateur"
                type="text"
              >
              <span v-if="has_error && errors.username">
                <p
                  v-for="error in errors.username"
                  :key="error"
                  class="help is-danger"
                >{{ error }}</p>
              </span>
              <span class="icon is-small is-left">
                <i class="fas fa-user" />
              </span>
            </div>
          </div>
        </div>

        <div class="field is-horizontal is-grouped is-grouped-centered">
          <div class="control is-expanded">
            <div class="field">
              <label class="label">Prénom</label>
              <div class="control">
                <input
                  v-model="firstName"
                  :class="{ 'is-danger': has_error && errors.firstName}"
                  class="input"
                  placeholder="Prénom"
                  type="text"
                >
                <span v-if="has_error && errors.firstName">
                  <p
                    v-for="error in errors.firstName"
                    :key="error"
                    class="help is-danger"
                  >{{ error }}</p>
                </span>
              </div>
            </div>
          </div>
          <div class="control is-expanded">
            <div class="field">
              <label class="label">Nom</label>
              <div class="control">
                <input
                  v-model="lastName"
                  :class="{ 'is-danger': has_error && errors.lastName}"
                  class="input"
                  placeholder="Nom"
                  type="text"
                >
                <span v-if="has_error && errors.lastName">
                  <p
                    v-for="error in errors.lastName"
                    :key="error"
                    class="help is-danger"
                  >{{ error }}</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Adresse E-mail</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              :class="{ 'is-danger': has_error && errors.email}"
              class="input"
              placeholder="Adresse E-mail"
              type="email"
            >
            <span v-if="has_error && errors.email">
              <p v-for="error in errors.email" :key="error" class="help is-danger">{{ error }}</p>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control has-icons-left">
            <input
              v-model="password"
              :class="{ 'is-danger': has_error && errors.password}"
              class="input"
              placeholder="Mot de passe"
              type="password"
            >
            <span v-if="has_error && errors.password">
              <p
                v-for="error in errors.password"
                :key="error"
                class="help is-danger"
              >{{ error }}</p>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Confirmation du mot de passe</label>
          <div class="control has-icons-left">
            <input
              v-model="password_confirmation"
              :class="{ 'is-danger': has_error && errors.password}"
              class="input"
              placeholder="Confirmation du mot de passe"
              type="password"
            >
            <span v-if="has_error && errors.password_confirmation">
              <p
                v-for="error in errors.password_confirmation"
                :key="error"
                class="help is-danger"
              >{{ error }}</p>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </div>
        </div>

        <div class="field is-horizontal is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary">
              S'inscrire
            </button>
          </div>
          <div class="control">
            <button class="button is-light" type="reset">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: "",
        has_error: false,
        errors: {},
        validation_error: false,
        success: false
      };
    },

    methods: {
      register() {
        const app = this;
        this.$auth.register({
          data: {
            username: app.username,
            firstName: app.firstName,
            lastName: app.lastName,
            email: app.email,
            password: app.password,
            password_confirmation: app.password_confirmation
          },
          success: () => {
            app.success = true;
            this.$router.push({
              name: "login",
              params: {
                successRegistrationRedirect: true
              }
            });
          },
          error: res => {
            app.has_error = true;
            app.errors = res.response.data.errors || {};
            app.validation_error = res.response.data.hasOwnProperty("errors");
          }
        });
      }
    }
  };
</script>
