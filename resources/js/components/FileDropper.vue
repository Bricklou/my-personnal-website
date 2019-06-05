<template>
  <div id="file-dropper" class="box">
    <div v-if="error" class="notification is-danger">
      <button class="delete is-small" @click="error = null" />
      <p>Une erreur est survenue (code d'erreur: {{ error }}).</p>
    </div>
    <div class="container dropbox">
      <input type="file" accept="image/*" class="input-file" @change="onImageChange">

      <p>Déposer vos fichiers ici.</p>
    </div>

    <div class="container files-viewer box">
      <div v-for="({filename: file}, key) in imageFiles" :key="key" class="box">
        <button class="delete is-small" @click.prevent="deleteImage(file)" />
        <a class="is-small icon link-image" @click.prevent="onImageSelect(file)">
          <i class="fas fa-link" />
        </a>
        <figure class="image" :style="{'background-image': `url(/storage/images/${file})`}" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FileDropper",
    props: {
      onImageSelect: {
        type: Function,
        required: false,
        default: () => {}
      },
      "fileType": {
        type: String,
        required: false,
        default: ""
      }
    },
    data() {
      return {
        image: "",
        imageFiles: [],
        error: null
      };
    },

    mounted() {
      this.fetchImages();
    },

    methods: {
      fetchImages() {
        this.axios
          .get(`/files/get/images?type=${this.fileType}`)
          .then(data => {
            this.imageFiles = data.data.images;
          })
          .catch(error => {
            this.error = error.responce.status;
          });
      },
      onImageChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        const reader = new FileReader();
        reader.onload = e => {
          this.image = e.target.result;

          axios
            .post("/files/upload/images", {
              image: this.image,
              type: this.fileType
            })
            .then(responce => {
              if (responce.data.status === "success") {
                this.imageFiles.push(responce.data.image);
              }
            });
        };
        reader.readAsDataURL(files[0]);
      },
      deleteImage(filename) {
        this.axios
          .post("/files/delete/images", {
            image: filename
          })
          .then(() => {
            this.imageFiles = this.imageFiles.filter((e) => {
              return e.filename != filename;
            });
          })
          .catch(error => {
            this.error = error.responce.status;
            console.log(error.responce);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../sass/app";

.dropbox {
  color: dimgray;
  cursor: pointer;
  min-height: 200px; /* minimum height */
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  padding: 10px;
  position: relative;
  transition: 0.1s background-color ease-in-out;
}

.input-file {
  cursor: pointer;
  height: 200px;
  opacity: 0; /* invisible but it's there! */
  position: absolute;
  width: 100%;
}

.dropbox:hover {
  background: rgba(0, 0, 0, 0.05); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  padding: 50px 0;
  text-align: center;
}

.files-viewer {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 5px rgba(10, 10, 10, 0.1) inset, 0 0 0 1px rgba(10, 10, 10, 0.1) inset;
  color: #4a4a4a;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding: 1.25rem;

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

  .box {
    flex: 1;
    height: 270px;
    margin: 5px;
    max-width: fit-content;
    text-align: center;

    .link-image {
      background-color: rgba(10, 10, 10, 0.2);
      border-radius: 290486px;
      cursor: pointer;
      display: inline-block;
      height: 16px;
      max-height: 16px;
      max-width: 16px;
      min-height: 16px;
      min-width: 16px;
      outline: none;
      pointer-events: auto;
      position: relative;
      vertical-align: top;
      width: 16px;

      i {
        color: white !important;
        font-size: 10px;
        position: relative;
        top: -6px;
      }

      &:focus,
      &:hover {
        background-color: rgba(10, 10, 10, 0.3);
      }
    }

    figure {
      background-position: center;
      background-size: cover;
      height: 200px;
      margin: auto;
      padding: 5px;
      width: 200px;
    }
  }
}
</style>
