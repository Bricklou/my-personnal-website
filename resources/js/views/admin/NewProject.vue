<template>
  <div id="new-project">
    <h1 class="title is-1">
      Nouveau project
    </h1>

    <form method="post" class="columns is-desktop">
      <div class="box column is-three-fifths is-offset-one-fifth">
        <div v-if="has_error" class="notification is-danger">
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
            <input v-model="title"
                   class="input"
                   placeholder="Titre"
                   type="text"
                   :class="{ 'is-danger': has_error && errors.title}"
            >

            <span v-if="has_error && errors.title">
              <p
                v-for="error in errors.title"
                :key="error"
                class="help is-danger"
              >{{ error }}</p>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input v-model="description"
                   class="input"
                   placeholder="Description"
                   type="text"
                   :class="{ 'is-danger': has_error && errors.title}"
            >

            <span v-if="has_error && errors.description">
              <p
                v-for="error in errors.description"
                :key="error"
                class="help is-danger"
              >{{ error }}</p>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Affiche</label>
          <div class="control">
            <image-selector v-model="banner" name="file-selector-editor" file-type="banners" />
          </div>

          <span v-if="has_error && errors.banner">
            <p
              v-for="error in errors.banner"
              :key="error"
              class="help is-danger"
            >{{ error }}</p>
          </span>
        </div>

        <div class="field">
          <label class="label">Contenu</label>
          <div class="control">
            <MDEditor v-model="content" name="new-project-editor" :error-class="{ 'is-danger': has_error && errors.content}" />
          </div>

          <span v-if="has_error && errors.content">
            <p
              v-for="error in errors.content"
              :key="error"
              class="help is-danger"
            >{{ error }}</p>
          </span>
        </div>

        <div class="field">
          <label class="label">Images</label>
          <div class="control">
            <file-dropper name="images-file-dropper" :on-image-select="onImageSelect" file-type="projects" />
          </div>
        </div>

        <div class="field">
          <label class="label">Date de publication</label>
          <div class="control">
            <input ref="calendarTrigger" class="input" type="datetime" placeholder="Date de publication">
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <input id="publish" v-model="publish" class="is-checkradio" type="checkbox" checked="checked">
          <label for="publish">Publier directement</label>
        </div>

        <div class="field is-horizontal is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" @click.prevent="send">
              Créer
            </button>
            <button class="button" @click.prevent="$router.push({name: 'projects-list'})">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import MDEditor from "../../components/MDEditor/Editor";
  import FileDropper from "../../components/FileDropper";
  import ImageSelector from "../../components/ImageSelector";
  import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";

  export default {
    name: "NewProject",
    components: {MDEditor, FileDropper, ImageSelector},
    data() {
      return {
        title: "",
        description: "",
        content: "",
        banner: "",
        publish: false,
        publish_date: new Date(),
        has_error: false,
        errors: {},
        validation_error: false
      };
    },

    mounted() {
      const calendar = bulmaCalendar.attach(this.$refs.calendarTrigger, {
        lang: "fr",
        closeOnSelect: false,
        displayMode: "dialog",
        type: "datetime",
        minuteSteps: 1,
        weekStart: 1
      })[0];

      calendar.on("date:selected", e => (this.publish_date = e.start || null));
      calendar.value(this.publish_date);
    },

    methods: {
      send(event) {
        event.target.classList.add("is-loading");
        this.axios
          .post("/projects/new", {
            title: this.title,
            description: this.description,
            content: this.content,
            banner: this.banner,
            publish: this.publish,
            publish_date: this.publish_date
          })
          .then(() => {
            event.target.classList.remove("is-loading");

            this.$router.push({
              name: "projects-list"
            });

            this.$notify({
              group: "notify",
              type: "success",
              text: "Projet créé avec succès."
            });
          })
          .catch((res) => {
            this.has_error = true;
            this.errors = res.response.data.errors || {};
            this.validation_error = res.response.data.hasOwnProperty("errors");

            this.$notify({
              group: "notify",
              type: "error",
              text: "Une erreur s'est produite."
            });
          });
      },
      onImageSelect(event) {
        this.$root.$emit("mdeditor-action", {
          action: "setImage",
          content: `/storage/images/${event}`
        });
      }
    }
  };
</script>
