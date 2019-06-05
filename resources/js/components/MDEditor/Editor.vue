<template>
  <div id="md-editor" class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="mdeditor--toolbar title is-marginless">
          <div class="field has-addons">
            <div class="control">
              <a
                v-shortkey="['ctrl', 'g']"
                class="button"
                :disabled="preview"
                title="Ctrl+B"
                @click="setBold"
                @shortkey="setBold"
              >
                <span class="icon is-small">
                  <i class="fas fa-bold" />
                </span>
              </a>
            </div>
            <div class="control">
              <a
                v-shortkey="['ctrl', 'i']"
                class="button"
                :disabled="preview"
                title="Ctrl+I"
                @click="setItalic"
                @shortkey="setItalic"
              >
                <span class="icon is-small">
                  <i class="fas fa-italic" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setCode">
                <span class="icon is-small">
                  <i class="fas fa-code" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setLink">
                <span class="icon is-small">
                  <i class="fas fa-link" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setStrikethrough">
                <span class="icon is-small">
                  <i class="fas fa-strikethrough" />
                </span>
              </a>
            </div>
            <div class="control">
              <a
                v-shortkey="['ctrl', 'u']"
                class="button"
                :disabled="preview"
                title="Ctrl+U"
                @click="setUnderline"
                @shortkey="setUnderline"
              >
                <span class="icon is-small">
                  <i class="fas fa-underline" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setImage">
                <span class="icon is-small">
                  <i class="fas fa-images" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setListUl">
                <span class="icon is-small">
                  <i class="fas fa-list-ul" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setListOl">
                <span class="icon is-small">
                  <i class="fas fa-list-ol" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" :disabled="preview" @click="setQuotes">
                <span class="icon is-small">
                  <i class="fas fa-quote-right" />
                </span>
              </a>
            </div>
            <div class="control">
              <a class="button" @click="togglePreview">
                <span class="icon is-small">
                  <i class="fas" :class="preview ? 'fa-eye-slash' : 'fa-eye'" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="content">
          <div v-show="!preview" class="mdeditor--editor" :class="errorClass">
            <textarea v-model="content" @input="updateSelf($event.target.value)" />
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <div v-show="preview" class="mdeditor--preview" v-html="previewText" />
          <!--eslint-enable-->
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import CodeMirror from "codemirror";
  import emojiConvert from "../../utils/emojiConverter";
  import markdownConvert from "../../utils/markdownConverter";
  import "codemirror/mode/markdown/markdown";
  import "codemirror/lib/codemirror.css";
  import "./editor.scss";
  export default {
    name: "MdEditor",
    model: {
      prop: "content",
      event: "input"
    },
    props: {
      content: {
        type: String,
        default: "",
        required: false
      },
      errorClass: {
        type: [String, Object],
        default: "",
        required: false
      }
    },
    data() {
      return {
        editor: null,
        preview: false
      };
    },

    computed: {
      previewText() {
        return emojiConvert(
          markdownConvert(
            this.content === null || this.content === undefined ? "" : this.content
          )
        );
      }
    },

    mounted() {
      this.editor = CodeMirror.fromTextArea(document.querySelector("textarea"), {
        mode: "markdown",
        lineWrapping: true,
        viewportMargin: Infinity,
        cursorBlinkRate: 0,
        value: this.content,

      });

      this.editor.on("change", editor => {
        this.updateSelf(editor.getDoc().getValue());
      });

      this.$root.$on("mdeditor-action", (event) => {
        this[`${event.action}`]({}, event.content);
      });
    },

    methods: {
      updateSelf(value) {
        this.$emit("input", value);
      },
      setEditorValue(value) {
        console.log(value);
        this.editor.getDoc().setValue(value);
      },
      action(event) {
        console.log(event);
      },
      setBold(event, content) {
        console.log(content);
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("**" + (content ? content : this.editor.getDoc().getSelection()) + "**");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 2 });
      },
      setItalic(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("*" + (content ? content : this.editor.getDoc().getSelection()) + "*");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 1 });
      },
      setCode(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection(
            "```\n" + (content ? content : this.editor.getDoc().getSelection()) + "\n```"
          );
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line - 1, ch: cursorPos.ch });
      },
      setLink(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("[" + (content ? content : this.editor.getDoc().getSelection()) + "]()");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 3 });
      },
      setStrikethrough(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("~~" + (content ? content : this.editor.getDoc().getSelection()) + "~~");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 2 });
      },
      setUnderline(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("__" + (content ? content : this.editor.getDoc().getSelection()) + "__");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 2 });
      },
      setImage(event, content) {
        if (this.preview) return;
        this.editor
          .getDoc()
          .replaceSelection("![](" + (content ? content : this.editor.getDoc().getSelection()) + ")");
        this.editor.focus();
        const cursorPos = this.editor.getCursor();
        this.editor.setCursor({ line: cursorPos.line, ch: cursorPos.ch - 1 });
      },
      setListUl(event, content) {
        if (this.preview) return;
        this.editor.focus();
        if (this.editor.getSelection().length == 0) {
          const cursorPos = this.editor.getCursor();
          this.editor.setCursor({ line: cursorPos.line, ch: 0 });
        }
        this.editor
          .getDoc()
          .replaceSelection("* " + (content ? content : this.editor.getDoc().getSelection()));
      },
      setListOl(event, content) {
        if (this.preview) return;
        this.editor.focus();
        if (this.editor.getSelection().length == 0) {
          const cursorPos = this.editor.getCursor();
          this.editor.setCursor({ line: cursorPos.line, ch: 0 });
        }
        this.editor
          .getDoc()
          .replaceSelection("1. " + (content ? content : this.editor.getDoc().getSelection()));
      },
      setQuotes(event, content) {
        if (this.preview) return;
        this.editor.focus();
        if (this.editor.getSelection().length == 0) {
          const cursorPos = this.editor.getCursor();
          this.editor.setCursor({ line: cursorPos.line, ch: 0 });
        }
        this.editor
          .getDoc()
          .replaceSelection("> " + (content ? content : this.editor.getDoc().getSelection()));
      },
      togglePreview() {
        this.preview = !this.preview;
      }
    }
  };
</script>
