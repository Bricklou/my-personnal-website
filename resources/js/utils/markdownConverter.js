import showdown from "showdown";
import xssFilter from "showdown-xss-filter";

/**
 * Remap classes for elements
 */
const classMap = {
  h1: "title is-1",
  h2: "title is-2",
  h3: "title is-3",
  h4: "title is-4",
  h5: "title is-5",
  blockquote: "message message-body"
};

let bindings = Object.keys(classMap)
  .map(key => ({
    type: "output",
    regex: new RegExp(`<${key}(.*)>`, "g"),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));

bindings.push({
  type: "output",
  regex: new RegExp("<img(.*)>", "g"),
  replace: "<figure class=\"image\"><img $1/><figcaption $2></figcaption></figure>"
});

const converter = new showdown.Converter({
  noHeaderId: true,
  parseImgDimensions: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  requireSpaceBeforeHeadingText: true,
  emoji: true,
  underline: true,
  extensions: [xssFilter, ...bindings]
});


export default function(text) {
  return converter.makeHtml(text);
}
