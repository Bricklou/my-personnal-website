<template>
  <div class="card project-item">
    <header class="card-image">
      <figure class="image is-3by4" :style="{'background-image': 'url(' + imgUrl + ')'}" />
    </header>
    <div class="card-content">
      <div class="header">
        <p class="title is-4">
          <router-link :to="'/project/' + project.id">
            {{ project.title }}
          </router-link>
          <span v-if="$auth.check(2) && !project.published" class="tag is-danger">Non publié</span>
          <span v-if="$auth.check(2) && project.published && !compareDate(project.published_date)" class="tag is-warning">Publication programmé</span>
        </p>
        <p class="has-text-grey-light is-italic date">
          il y a {{ formatFrom(project.published_date) }} - {{ format(project.published_date) }}
        </p>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <p class="subtitle is-6" v-html="parsedDescription" />
      <!--eslint-enable-->
      <div v-if="$auth.check(2)" class="buttons action-buttons is-fixed-bottom has-text-right is-full">
        <router-link class="button" :to="'/project/' + project.id + '/edit'">
          <span class="icon is-small">
            <i class="fas fa-edit" />
          </span>
        </router-link>
        <a class="button" @click.prevent="deleteProject">
          <span class="icon is-small">
            <i class="fas fa-trash" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import emojiConvert from "../utils/emojiConverter";
  import markdownConvert from "../utils/markdownConverter";
  import DateTimeUtils from "../utils/DateTimeUtils.js";
  export default {
    name: "ProjectItem",
    props: {
      project: {
        type: Object,
        required: true,
        default: () => {
          return {
            title: "",
            description: ""
          };
        }
      }
    },
    data() {
      return {
        imgUrl: this.project.banner
      };
    },

    computed: {
      parsedDescription() {
        return emojiConvert(
          markdownConvert(
            this.project.description === null ||
              this.project.description === undefined
              ? ""
              : this.project.description
          )
        );
      }
    },

    methods: {
      format(data) {
        return DateTimeUtils.formatDate(data);
      },
      formatFrom(data) {
        return DateTimeUtils.formatDateFromNow(data);
      },
      compareDate(data) {
        return DateTimeUtils.compareIsBeforeFromNow(data);
      },
      deleteProject() {
        this.$root.$emit("deleteProject", this.project.id);
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../sass/app";

.project-item {
  margin-bottom: 20px;
  margin-top: 20px;

  @media screen and (max-width: $tablet) {
    min-height: 350px !important;

    .image {
      background-position: center;
      background-size: cover;
      height: 200px;
      padding: 0;
    }

    .card-content {

      .title {
        margin-bottom: 0;
        text-overflow: ellipsis;
      }

      .date {
        margin-top: 0 !important;
        text-align: left;
      }

      .action-buttons {
        bottom: 10px;
        position: absolute;
        right: 10px;
      }
    }
  }

  @media screen and (min-width: $tablet + 1) {
    display: flex;
    flex-direction: row;
    height: 350px;

    .image {
      background-position: center;
      background-size: cover;
      flex: 1;
      height: 350px;
      padding: 0;
      width: 350px;
    }

    .card-content {
      flex: 9 1 auto;

      .header {
        margin-bottom: 20px;

        .title {
          margin-bottom: 0 !important;
        }
      }

      .action-buttons {
        bottom: 10px;
        position: absolute;
        right: 10px;
      }
    }

    &:not(:hover) .action-buttons {
      display: none;
    }
  }
}
</style>
