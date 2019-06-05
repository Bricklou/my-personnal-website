<template>
  <div id="image-selector" class="box">
    <div class="columns">
      <div class="column is-full-mobile is-half-tablet">
        <figure class="image is-3by4" :style="{'background-image': 'url(' + (content) + ')'}" />
      </div>
      <div class="column is-full-mobile is-half-tablet buttons is-centered">
        <a class="button is-primary is-outlined" @click="showModal = true">Changer l'image</a>
        <a class="button is-danger is-outlined" @click="resetImage">Réinitialiser</a>
      </div>
    </div>

    <div v-if="showModal" class="modal is-active">
      <div class="modal-background" @click="cancelSelect" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Choisissez une image
          </p>
          <button class="delete" aria-label="close" @click="showModal = false" />
        </header>

        <section class="modal-card-body">
          <figure class="image" :style="{'background-image': 'url(' + (selectedImageOrDefault) + ')'}" />
          <file-dropper name="images-image-selector" :on-image-select="onImageSelect" file-type="banner" />
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" @click.prevent="saveImage">
            Sauvegarder
          </button>
          <button class="button" @click="cancelSelect">
            Annuler
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import FileDropper from "./FileDropper";
  import path from "path";

  export default {
    name: "ImageSelector",
    components: {FileDropper},
    model: {
      prop: "content",
      event: "input",
    },
    props: {
      content: {
        type: String,
        default: "",
        required: false
      },
      fileType: {
        type: String,
        required: false,
        default: ""
      }
    },

    data() {
      return {
        defaultImage: "http://lorempixel.com/640/480/abstract",
        selectedImage: this.defaultImage,
        showModal: false
      };
    },

    computed: {
      selectedImageOrDefault() {
        return this.selectedImage ? `/storage/images/${this.selectedImage}` : this.defaultImage;
      }
    },

    watch: {
      showModal(value) {
        document.querySelector("html").style.overflow = value ? "hidden" : "visible";
      }
    },

    mounted() {
      if (!this.content)
        this.$emit("input", this.defaultImage);
      else
        this.selectedImage = path.basename(this.content);
    },

    methods: {
      onImageSelect(event) {
        this.selectedImage = event;
      },
      saveImage() {
        this.$emit("input", `/storage/images/${this.selectedImage}`);
        this.showModal = false;
      },
      resetImage() {
        this.$emit("input", this.defaultImage);
      },
      cancelSelect() {
        this.showModal = false;
        this.selectedImage = null;
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../sass/app";

#image-selector {

  .image {
    background-position: center;
    background-size: cover;
  }

  @media screen and (max-width: $tablet) {

    .image {
      height: 200px;
      padding: 0;
    }
  }

  @media screen and (min-width: $tablet + 1) {

    .image {
      flex: 1;
      height: 350px;
      padding: 0;
    }
  }

  &::-webkit-scrollbar {
    width: 25px;
  }

  &::-webkit-scrollbar-thumb {
    border: solid 8px transparent;
    border-radius: 1em;
    box-shadow: inset 0 0 10px 10px $grey-lighter;
    margin-right: 5px;

    &:hover,
    &:focus {
      border: solid 7px transparent;
      box-shadow: inset 0 0 10px 10px $grey-light;
    }
  }
}
</style>


