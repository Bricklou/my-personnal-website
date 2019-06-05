<template>
  <transition mode="out-in" name="fade">
    <div v-if="project" id="project-view">
      <section class="section">
        <h1 class="title is-1 is-marginless">
          {{ project.title }}
          
          <router-link
            id="edit_btn"
            class="button"
            to="/my-projects"
          >
            <span class="icon is-small">
              <i class="fas fa-arrow-left" />
            </span>
            <span>Retour</span>
          </router-link>

          <router-link
            v-if="$auth.check(2)"
            id="edit_btn"
            class="button"
            :to="'/project/' + project.id + '/edit'"
          >
            <span>Modifier</span>
            <span class="icon is-small">
              <i class="fas fa-edit" />
            </span>
          </router-link>

          <a
            v-if="$auth.check(2)"
            id="delete_btn"
            class="button"
            @click.prevent="deleteProject"
          >
            <span>Supprimer</span>
            <span class="icon is-small">
              <i class="fas fa-trash" />
            </span>
          </a>
        </h1>

        <p class="has-text-grey-light is-italic">
          Publié le {{ format(project.published_date) }}
        </p>
      </section>

      <section class="hero">
        <div class="hero-head">
          <div id="banner-container" class="container">
            <img id="banner" :src="project.banner">
          </div>
        </div>
      </section>

      <div class="columns">
        <section id="description" class="section column is-full-mobile is-two-thirds is-offset-2">
          <div class="container">
            <!-- eslint-disable vue/no-v-html -->
            <div class="is-italic" v-html="descriptionText" />
            <!--eslint-enable-->
          </div>
        </section>
      </div>

      <div class="columns">
        <section class="section column is-full-mobile is-two-thirds is-offset-2">
          <div class="container">
            <!-- eslint-disable vue/no-v-html -->
            <div id="project-render" v-html="contentText" />
            <!--eslint-enable-->
          </div>
        </section>
      </div>

      <div v-if="deleteModal" class="modal is-active">
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Attention
            </p>
            <button class="delete" aria-label="close" @click="deleteModal = null" />
          </header>
          <section class="modal-card-body">
            <p>
              Êtes-vous sûr de vouloir supprimer ce projet: <br>
              <span class="has-text-weight-semibold">
                {{ deleteModal.title }}
              </span>
            </p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-danger is-outlined" @click="confirmDeleteProject">
              Oui
            </button>
            <button class="button is-outlined" @click="deleteModal = null">
              Non
            </button>
          </footer>
        </div>
      </div>
    </div>

    <div v-else-if="notFound" id="project-view">
      <div v-if="error && !project" class="notification is-danger">
        <p>
          Erreur, impossible de récupérer les informations pour le moment. Si le problème persiste, veuillez contacter un
          administrateur.
        </p>
      </div>
    </div>

    <div v-else-if="error" id="project-view">
      <div v-if="error && !project" class="notification is-danger">
        <p>
          Erreur, impossible de récupérer les informations pour le moment. Si le problème persiste, veuillez contacter un
          administrateur.
        </p>
      </div>
    </div>

    <div v-else id="project-view">
      <Loading />
    </div>
  </transition>
</template>

<script>
  import Loading from "../components/Loading";
  import DateTimeUtils from "../utils/DateTimeUtils.js";
  import emojiConvert from "../utils/emojiConverter";
  import markdownConvert from "../utils/markdownConverter";

  export default {
    name: "ProjectView",
    components: { Loading },
    data() {
      return {
        project: null,
        error: null,
        deleteModal: null
      };
    },

    computed: {
      descriptionText() {
        return emojiConvert(
          markdownConvert(
            this.project.description === null ||
              this.project.description === undefined
              ? ""
              : this.project.description
          )
        );
      },
      contentText() {
        return emojiConvert(
          markdownConvert(
            this.project.content === null || this.project.content === undefined
              ? ""
              : this.project.content
          )
        );
      },

      notFound() {
        return this.error ? this.error.status === 404 : false;
      }
    },

    watch: {
      deleteModal(value) {
        document.querySelector("html").style.overflow = value ? "hidden" : "visible";
      }
    },

    mounted() {
      this.fetchData();
    },

    methods: {
      format(data) {
        return DateTimeUtils.formatDate(data);
      },

      fetchData() {
        this.axios
          .get(`/project/get?id=${this.$route.params.projectID}`)
          .then(({ data }) => {
            this.project = data.project;
          })
          .catch(error => {
            this.error = error.response;
          });
      },

      deleteProject() {
        this.deleteModal = this.project;
      },

      confirmDeleteProject(event) {
        event.target.classList.add("is-loading");
        this.axios
          .post("/project/delete", {
            id: this.deleteModal.id
          })
          .then(() => {
            this.deleteModal = null;
            event.target.classList.remove("is-loading");

            this.router.push({
              name: "projects-list"
            });

            this.$notify({
              group: "notify",
              type: "success",
              text: "Projet supprimé avec succès."
            });
          })
          .catch(error => {
            this.$notify({
              group: "notify",
              type: "danger",
              text: `Une erreur est survenur (erreur: "${error.toString()}")`
            });
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../sass/app";

#project-view {

  #edit_btn,
  #delete_btn {
    top: 15px;
    width: fit-content;

    .icon {
      transition: 0.25s color ease-out;
    }

    &:hover .icon {
      color: $link-hover !important;
    }
  }

  #banner-container {
    text-align: center;

    #banner {
      justify-content: center;
      max-height: 500px;
      object-fit: cover;
      object-position: center;
      width: 90%;
    }
  }

  #description {
    padding-bottom: 0;
  }
}
</style>

