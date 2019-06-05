(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{307:function(e,t,r){"use strict";r.r(t);var s=r(16),a=r(17),i=r(37),o=r(6),n=r(36),c=r.n(n),l={name:"EditProject",components:{MDEditor:s.a,FileDropper:a.a,ImageSelector:i.a,Loading:o.a},data:function(){return{project:null,has_error:!1,errors:{},success:!1,validation_error:!1,calendar:null,from:null}},mounted:function(){this.fetchData()},methods:{send:function(e){var t=this;e.target.classList.add("is-loading"),this.axios.post("/project/update?id=".concat(this.$route.params.projectID),this.project).then(function(){e.target.classList.remove("is-loading"),t.$router.push({name:"project",params:{projectID:t.$route.params.projectID}}),t.$notify({group:"notify",type:"success",text:"Projet mis à jours avec succès."})}).catch(function(e){t.has_error=!0,t.errors=e.response.data.errors||{},t.validation_error=e.response.data.hasOwnProperty("errors")})},onImageSelect:function(e){this.$root.$emit("mdeditor-action",{action:"setImage",content:"/storage/images/".concat(e)})},fetchData:function(){var e=this;this.axios.get("/project/get?id=".concat(this.$route.params.projectID)).then(function(t){var r=t.data;e.project=r.project,e.$nextTick(function(){e.calendar=c.a.attach(e.$refs.calendarTrigger,{lang:"fr",closeOnSelect:!1,displayMode:"dialog",type:"datetime",minuteSteps:1,weekStart:1})[0],e.calendar.on("select",function(){e.project.published_date=new Date(e.calendar.value())||null}),e.calendar.value(r.project.published_date)})}).catch(function(t){console.log(t),e.has_error=!0,e.errors=t.response.data.errors||{},e.validation_error=!1})}}},p=r(1),d=Object(p.a)(l,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"new-project"}},[r("h1",{staticClass:"title is-1"},[e._v("\n    Editer le projet\n  ")]),e._v(" "),e.project?r("form",{staticClass:"columns is-desktop",attrs:{method:"post"}},[r("div",{staticClass:"box column is-three-fifths is-offset-one-fifth"},[e.has_error&&!e.success?r("div",{staticClass:"notification is-danger"},[e.validation_error?r("p",[e._v("\n          Erreur(s) de validation, veuillez consulter le(s) message(s) ci-dessous.\n        ")]):r("p",[e._v("\n          Une erreur est survenue. Si le problème persiste, veuillez contacter un\n          administrateur.\n        ")])]):e._e(),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Titre")]),e._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.title,expression:"project.title"}],staticClass:"input",class:{"is-danger":e.has_error&&e.errors.title},attrs:{placeholder:"Titre",type:"text"},domProps:{value:e.project.title},on:{input:function(t){t.target.composing||e.$set(e.project,"title",t.target.value)}}}),e._v(" "),e.has_error&&e.errors.title?r("span",e._l(e.errors.title,function(t){return r("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])}),0):e._e()])]),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Description")]),e._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.description,expression:"project.description"}],staticClass:"input",class:{"is-danger":e.has_error&&e.errors.title},attrs:{placeholder:"Description",type:"text"},domProps:{value:e.project.description},on:{input:function(t){t.target.composing||e.$set(e.project,"description",t.target.value)}}}),e._v(" "),e.has_error&&e.errors.description?r("span",e._l(e.errors.description,function(t){return r("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])}),0):e._e()])]),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Affiche")]),e._v(" "),r("div",{staticClass:"control"},[r("image-selector",{attrs:{name:"file-selector-editor","file-type":"banners"},model:{value:e.project.banner,callback:function(t){e.$set(e.project,"banner",t)},expression:"project.banner"}})],1),e._v(" "),e.has_error&&e.errors.banner?r("span",e._l(e.errors.banner,function(t){return r("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])}),0):e._e()]),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Contenu")]),e._v(" "),r("div",{staticClass:"control"},[r("MDEditor",{attrs:{name:"new-project-editor","error-class":{"is-danger":e.has_error&&e.errors.content}},model:{value:e.project.content,callback:function(t){e.$set(e.project,"content",t)},expression:"project.content"}})],1),e._v(" "),e.has_error&&e.errors.content?r("span",e._l(e.errors.content,function(t){return r("p",{key:t,staticClass:"help is-danger"},[e._v(e._s(t))])}),0):e._e()]),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Images")]),e._v(" "),r("div",{staticClass:"control"},[r("file-dropper",{attrs:{name:"images-file-dropper","on-image-select":e.onImageSelect,"file-type":"projects"}})],1)]),e._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[e._v("Date de publication")]),e._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.published_date,expression:"project.published_date"}],ref:"calendarTrigger",staticClass:"input",attrs:{type:"datetime",placeholder:"Date de publication"},domProps:{value:e.project.published_date},on:{input:function(t){t.target.composing||e.$set(e.project,"published_date",t.target.value)}}})])]),e._v(" "),r("div",{staticClass:"field is-grouped is-grouped-centered"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.published,expression:"project.published"}],staticClass:"is-checkradio",attrs:{id:"publish",type:"checkbox",checked:"checked"},domProps:{checked:Array.isArray(e.project.published)?e._i(e.project.published,null)>-1:e.project.published},on:{change:function(t){var r=e.project.published,s=t.target,a=!!s.checked;if(Array.isArray(r)){var i=e._i(r,null);s.checked?i<0&&e.$set(e.project,"published",r.concat([null])):i>-1&&e.$set(e.project,"published",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.project,"published",a)}}}),e._v(" "),r("label",{attrs:{for:"publish"}},[e._v("Publier directement")])]),e._v(" "),r("div",{staticClass:"field is-horizontal is-grouped is-grouped-centered"},[r("div",{staticClass:"control"},[r("button",{staticClass:"button is-primary",on:{click:function(t){return t.preventDefault(),e.send(t)}}},[e._v("\n            Modifer\n          ")]),e._v(" "),r("button",{staticClass:"button",on:{click:function(t){return t.preventDefault(),e.$router.push({name:"project",params:{projectID:e.$route.params.projectID}})}}},[e._v("\n            Annuler\n          ")])])])])]):r("Loading")],1)},[],!1,null,null,null);t.default=d.exports}}]);