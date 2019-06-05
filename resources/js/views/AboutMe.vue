<template>
  <div id="about_me">
    <h1 class="title is-1">
      A propos de moi
      <a
        v-if="$auth.check(2) && !edit && data !== null"
        id="edit_about_btn"
        class="button"
        @click.prevent="edit = !edit"
      >
        <span>Editer</span>
        <span class="icon is-small has-text-grey-light">
          <i class="fas fa-edit" />
        </span>
      </a>
    </h1>

    <transition mode="out-in" name="fade">
      <div v-if="!edit">
        <!-- eslint-disable vue/no-v-html -->
        <div v-if="data" id="page" class="content" v-html="page" />
        <!--eslint-enable-->
        <div v-else-if="data === ''">
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
      </div>
      <div v-else class="box">
        <MDEditor v-model="editorValue" name="about_me-editor" />
        <div class="field is-horizontal is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" @click="send">
              Enregistrer
            </button>
          </div>
          <div class="control">
            <button class="button is-light" type="reset" @click="cancel">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Loading from "../components/Loading.vue";
  import MDEditor from "../components/MDEditor/Editor.vue";
  import emojiConvert from "../utils/emojiConverter";
  import markdownConvert from "../utils/markdownConverter";

  export default {
    name: "AboutMe",
    components: { Loading, MDEditor },
    data() {
      return {
        edit: false,
        data: null,
        error: null,
        editorValue: ""
      };
    },

    computed: {
      page() {
        return emojiConvert(
          markdownConvert(
            this.data === null || this.data === undefined ? "" : this.data
          )
        );
      }
    },

    mounted() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        this.axios
          .get("/globals/get/about-me")
          .then(data => {
            if (typeof data.data.value != "string") {
              this.data = "";
            } else {
              this.data = data.data.value;
            }
            this.editorValue = this.data;
          })
          .catch(error => {
            this.error = error.response.status;
          });
      },
      send() {
        this.axios
          .post("/globals/set/about-me", {
            value: this.editorValue
          })
          .then(() => {
            this.edit = false;
            this.data = this.editorValue;
          })
          .catch(error => {
            this.error = error.response.status;
          });
      },
      cancel() {
        this.edit = false;
        this.editorValue = this.data;
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../sass/app";

#about_me {

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
