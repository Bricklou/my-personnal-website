import EmojiConvertor from "emoji-js";
import twemoji from "twemoji";

export default (text) => {
  const emojiConverter = new EmojiConvertor();
  emojiConverter.init_env();
  emojiConverter.allow_native = false;
  return twemoji.parse(emojiConverter.replace_emoticons_with_colons(text));
};