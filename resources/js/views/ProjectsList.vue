<template>
  <div id="projects-list">
    <h1 class="title is-1">
      Mes projets
      <router-link
        v-if="$auth.check(2) && projects !== null"
        id="edit_about_btn"
        class="button"
        to="/new-project"
      >
        <span>Créer</span>
        <span class="icon is-small has-text-grey-light">
          <i class="fas fa-plus" />
        </span>
      </router-link>
    </h1>
    <transition mode="out-in" name="fade">
      <div v-if="projects && projects.length > 0">
        <project-item v-for="project in projects" :key="project.id" :project="project" />
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <router-link
            v-if="pagination.current_page != 1"
            class="pagination-previous"
            :to="'/my-projects/' + (pagination.current_page - 1)"
          >
            Page précédente
          </router-link>
          <router-link
            v-if="pagination.current_page != pagination.last_page"
            class="pagination-next"
            :to="'/my-projects/' + (pagination.current_page + 1)"
          >
            Page suivante
          </router-link>

          <ul v-if="pagination.last_page <= 5" class="pagination-list">
            <li key="1">
              <router-link
                class="pagination-link"
                aria-label="Allez à la page 1"
                to="/my-projects"
                :class="{'is-current' : pagination.current_page === 1}"
              >
                1
              </router-link>
            </li>

            <li v-for="page in pagination.last_page - 1 " :key="page + 1">
              <router-link
                class="pagination-link"
                :aria-label="'Allez à la page ' + page + 1"
                :to="'/my-projects/' + (page + 1)"
                :class="{'is-current' : pagination.current_page === (page+1)}"
              >
                {{ page + 1 }}
              </router-link>
            </li>
          </ul>

          <ul v-else class="pagination-list">
            <li v-if="(pagination.current_page - 1) > 1" key="1">
              <router-link
                class="pagination-link"
                aria-label="Allez à la page 1"
                to="/my-projects"
              >
                1
              </router-link>
            </li>

            <li v-if="(pagination.current_page - 1) > 1">
              <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <li v-if="(pagination.current_page - 1) >= 1" :key="pagination.current_page - 1">
              <router-link
                class="pagination-link"
                aria-label="Allez à la page 1"
                :to="'/my-projects/'+ (pagination.current_page - 1)"
              >
                {{ pagination.current_page - 1 }}
              </router-link>
            </li>
            <li :key="pagination.current_page">
              <router-link
                class="pagination-link is-current"
                aria-label="Allez à la page 1"
                :to="'/my-projects/' + pagination.current_page"
              >
                {{ pagination.current_page }}
              </router-link>
            </li>
            <li
              v-if="(pagination.current_page + 1) <= pagination.last_page"
              :key="pagination.current_page + 1"
            >
              <router-link
                class="pagination-link"
                aria-label="Allez à la page 1"
                :to="'/my-projects/' + (pagination.current_page + 1)"
              >
                {{ pagination.current_page +1 }}
              </router-link>
            </li>

            <li v-if="(pagination.current_page + 1) < pagination.last_page">
              <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <li
              v-if="(pagination.current_page + 1) < pagination.last_page"
              :key="pagination.last_page"
            >
              <router-link
                class="pagination-link"
                aria-label="Allez à la page 1"
                :to="'/my-projects/' + pagination.last_page"
                :class="{'is-current' : pagination.current_page === pagination.last_page}"
              >
                {{ pagination.last_page }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else-if="projects && projects.length === 0">
        <p>Il n'y aucune donnée à afficher.</p>
      </div>
      <div v-else-if="error">
        <article class="message is-danger">
          <div class="message-body">
            Une erreur s'est produite (code d'erreur: {{ error }})
          </div>
        </article>
      </div>
      <Loading v-else />
    </transition>

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
</template>

<script>
  import Loading from "../components/Loading";
  import ProjectItem from "../components/ProjectItem";
  export default {
    name: "ProjectList",
    components: { Loading, ProjectItem },
    data() {
      return {
        edit: false,
        projects: null,
        error: null,
        pagination: null,
        deleteModal: null
      };
    },

    watch: {
      $route() {
        this.fetchData();
      },

      deleteModal(value) {
        document.querySelector("html").style.overflow = value ? "hidden" : "visible";
      }
    },

    mounted() {
      this.fetchData();

      this.$root.$on("deleteProject", id => {
        this.deleteModal = this.projects.find((project) => {
          return project.id == id;
        });

      });
    },

    methods: {
      fetchData() {
        this.projects = null;
        this.axios
          .get(
            "/projects/get?page=" +
              (this.$route.params.pageNumber ? this.$route.params.pageNumber : 1)
          )
          .then(({ data: pagination }) => {
            this.pagination = pagination.projects;
            this.projects = pagination.projects.data;
          })
          .catch(error => {
            this.error = error.response.status;
          });
      },

      confirmDeleteProject(event) {
        event.target.classList.add("is-loading");
        this.axios
          .post("/project/delete", {
            id: this.deleteModal.id
          })
          .then(() => {
            this.projects = this.projects.filter(project => {
              return project.id != this.deleteModal.id;
            });

            this.deleteModal = null;
            event.target.classList.remove("is-loading");

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

#projects-list {

  #edit_about_btn {
    top: 15px;
    width: fit-content;

    .icon {
      transition: 0.25s color ease-out;
    }

    &:hover .icon {
      color: $link-hover !important;
    }
  }
}
</style>
