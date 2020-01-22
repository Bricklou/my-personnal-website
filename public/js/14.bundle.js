(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{330:function(e,t,s){"use strict";s.r(t);var r=s(11),i=s(12),a=s(25),n=s(24),l=s.n(n),o={name:"NewProject",components:{MDEditor:r.a,FileDropper:i.a,ImageSelector:a.a},data:function(){return{title:"",description:"",content:"",banner:"",publish:!1,publish_date:new Date,has_error:!1,errors:{},validation_error:!1}},mounted:function(){var e=this,t=l.a.attach(this.$refs.calendarTrigger,{lang:"fr",closeOnSelect:!1,displayMode:"dialog",type:"datetime",minuteSteps:1,weekStart:1})[0];t.on("date:selected",(function(t){return e.publish_date=t.start||null})),t.value(this.publish_date)},methods:{send:function(e){var t=this;e.target.classList.add("is-loading"),this.axios.post("/projects/new",{title:this.title,description:this.description,content:this.content,banner:this.banner,publish:this.publish,publish_date:this.publish_date}).then((function(){e.target.classList.remove("is-loading"),t.$router.push({name:"projects-list"}),t.$notify({group:"notify",type:"success",text:"Projet créé avec succès."})})).catch((function(e){t.has_error=!0,t.errors=e.response.data.errors||{},t.validation_error=e.response.data.errors,t.$notify({group:"notify",type:"error",text:"Une erreur s'est produite."})}))},onImageSelect:function(e){this.$root.$emit("mdeditor-action",{action:"setImage",content:"/storage/images/".concat(e)})}}},c=s(0),d=Object(c.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"new-project"}},[s("h1",{staticClass:"title is-1"},[e._v("\n    Nouveau project\n  ")]),e._v(" "),s("form",{staticClass:"columns is-desktop",attrs:{method:"post"}},[s("div",{staticClass:"box column is-three-fifths is-offset-one-fifth"},[e.has_error?s("div",{staticClass:"notification is-danger"},[e.validation_error?s("p",[e._v("\n          Erreur(s) de validation, veuillez consulter le(s) message(s) ci-dessous.\n        ")]):s("p",[e._v("\n          Une erreur est survenue. Si le problème persiste, veuillez contacter un\n          administrateur.\n        ")])]):e._e(),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Titre")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticClass:"input",class:{"is-danger":e.has_error&&e.errors.title},attrs:{placeholder:"Titre",type:"text"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}}),e._v(" "),e.has_error&&e.errors.title?s("span",e._l(e.errors.title,(function(t){return s("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])})),0):e._e()])]),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Description")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"description"}],staticClass:"input",class:{"is-danger":e.has_error&&e.errors.title},attrs:{placeholder:"Description",type:"text"},domProps:{value:e.description},on:{input:function(t){t.target.composing||(e.description=t.target.value)}}}),e._v(" "),e.has_error&&e.errors.description?s("span",e._l(e.errors.description,(function(t){return s("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])})),0):e._e()])]),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Affiche")]),e._v(" "),s("div",{staticClass:"control"},[s("image-selector",{attrs:{name:"file-selector-editor","file-type":"banners"},model:{value:e.banner,callback:function(t){e.banner=t},expression:"banner"}})],1),e._v(" "),e.has_error&&e.errors.banner?s("span",e._l(e.errors.banner,(function(t){return s("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])})),0):e._e()]),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Contenu")]),e._v(" "),s("div",{staticClass:"control"},[s("MDEditor",{attrs:{name:"new-project-editor","error-class":{"is-danger":e.has_error&&e.errors.content}},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1),e._v(" "),e.has_error&&e.errors.content?s("span",e._l(e.errors.content,(function(t){return s("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])})),0):e._e()]),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Images")]),e._v(" "),s("div",{staticClass:"control"},[s("file-dropper",{attrs:{name:"images-file-dropper","on-image-select":e.onImageSelect,"file-type":"projects"}})],1)]),e._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v("Date de publication")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{ref:"calendarTrigger",staticClass:"input",attrs:{type:"datetime",placeholder:"Date de publication"}})])]),e._v(" "),s("div",{staticClass:"field is-grouped is-grouped-centered"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.publish,expression:"publish"}],staticClass:"is-checkradio",attrs:{id:"publish",type:"checkbox",checked:"checked"},domProps:{checked:Array.isArray(e.publish)?e._i(e.publish,null)>-1:e.publish},on:{change:function(t){var s=e.publish,r=t.target,i=!!r.checked;if(Array.isArray(s)){var a=e._i(s,null);r.checked?a<0&&(e.publish=s.concat([null])):a>-1&&(e.publish=s.slice(0,a).concat(s.slice(a+1)))}else e.publish=i}}}),e._v(" "),s("label",{attrs:{for:"publish"}},[e._v("Publier directement")])]),e._v(" "),s("div",{staticClass:"field is-horizontal is-grouped is-grouped-centered"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-primary",on:{click:function(t){return t.preventDefault(),e.send(t)}}},[e._v("\n            Créer\n          ")]),e._v(" "),s("button",{staticClass:"button",on:{click:function(t){return t.preventDefault(),e.$router.push({name:"projects-list"})}}},[e._v("\n            Annuler\n          ")])])])])])])}),[],!1,null,null,null);t.default=d.exports}}]);