<template>
  <div id="new-project">
    <h1 class="title is-1">
      Editer le projet
    </h1>

    <form v-if="project" method="post" class="columns is-desktop">
      <div class="box column is-three-fifths is-offset-one-fifth">
        <div v-if="has_error && !success" class="notification is-danger">
          <p
            v-if="validation_error"
          >
            Erreur(s) de validation, veuillez consulter le(s) message(s) ci-dessous.
          </p>
          <p v-else>
            Une erreur est survenue. Si le problème persiste, veuillez contacter un
            administrateur.
          </p>
        </div>

        <div class="field">
          <label class="label">Titre</label>
          <div class="control">
            <input
              v-model="project.title"
              class="input"
              placeholder="Titre"
              type="text"
              :class="{ 'is-danger': has_error && errors.title}"
            >

            <span v-if="has_error && errors.title">
              <p v-for="error in errors.title" :key="error" class="help is-danger">{{ error }}</p>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input
              v-model="project.description"
              class="input"
              placeholder="Description"
              type="text"
              :class="{ 'is-danger': has_error && errors.title}"
            >

            <span v-if="has_error && errors.description">
              <p v-for="error in errors.description" :key="error" class="help is-danger">{{ error }}</p>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Affiche</label>
          <div class="control">
            <image-selector v-model="project.banner" name="file-selector-editor" file-type="banners" />
          </div>

          <span v-if="has_error && errors.banner">
            <p v-for="error in errors.banner" :key="error" class="help is-danger">{{ error }}</p>
          </span>
        </div>

        <div class="field">
          <label class="label">Contenu</label>
          <div class="control">
            <MDEditor
              v-model="project.content"
              name="new-project-editor"
              :error-class="{ 'is-danger': has_error && errors.content}"
            />
          </div>

          <span v-if="has_error && errors.content">
            <p v-for="error in errors.content" :key="error" class="help is-danger">{{ error }}</p>
          </span>
        </div>

        <div class="field">
          <label class="label">Images</label>
          <div class="control">
            <file-dropper
              name="images-file-dropper"
              :on-image-select="onImageSelect"
              file-type="projects"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Date de publication</label>
          <div class="control">
            <input ref="calendarTrigger" v-model="project.published_date" class="input" type="datetime" placeholder="Date de publication">
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <input
            id="publish"
            v-model="project.published"
            class="is-checkradio"
            type="checkbox"
            checked="checked"
          >
          <label for="publish">Publier directement</label>
        </div>

        <div class="field is-horizontal is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" @click.prevent="send">
              Modifer
            </button>
            <button class="button" @click.prevent="$router.push({name: 'project', params: {projectID: $route.params.projectID}})">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </form>
    <Loading v-else />
  </div>
</template>

<script>
  import MDEditor from "../../components/MDEditor/Editor";
  import FileDropper from "../../components/FileDropper";
  import ImageSelector from "../../components/ImageSelector";
  import Loading from "../../components/Loading";
  import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";

  export default {
    name: "EditProject",
    components: { MDEditor, FileDropper, ImageSelector, Loading },
    data() {
      return {
        project: null,
        has_error: false,
        errors: {},
        success: false,
        validation_error: false,
        calendar: null,
        from: null
      };
    },

    mounted() {
      this.fetchData();
    },

    methods: {
      send(event) {
        event.target.classList.add("is-loading");
        this.axios
          .post(`/project/update?id=${this.$route.params.projectID}`, this.project)
          .then(() => {
            event.target.classList.remove("is-loading");

            this.$router.push({
              name: "project",
              params: {
                projectID: this.$route.params.projectID
              }
            });

            this.$notify({
              group: "notify",
              type: "success",
              text: "Projet mis à jours avec succès."
            });
          })
          .catch((res) => {
            this.has_error = true;
            this.errors = res.response.data.errors || {};
            this.validation_error = res.response.data.hasOwnProperty("errors");
          });
      },
      onImageSelect(event) {
        this.$root.$emit("mdeditor-action", {
          action: "setImage",
          content: `/storage/images/${event}`
        });
      },

      fetchData() {
        this.axios
          .get(`/project/get?id=${this.$route.params.projectID}`)
          .then(({data}) => {
            this.project = data.project;
            this.$nextTick(() => {
              this.calendar = bulmaCalendar.attach(this.$refs.calendarTrigger, {
                lang: "fr",
                closeOnSelect: false,
                displayMode: "dialog",
                type: "datetime",
                minuteSteps: 1,
                weekStart: 1
              })[0];

              this.calendar.on("select", () => {
                this.project.published_date = new Date(this.calendar.value()) || null;
              });

              this.calendar.value(data.project.published_date);
            });
          })
          .catch((res) => {
            console.log(res);
            this.has_error = true;
            this.errors = res.response.data.errors || {};
            this.validation_error = false;
          });
      }
    }
  };
</script>
