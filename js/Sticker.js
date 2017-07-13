class Sticker {
  constructor({ content, tag }) {
    this.content = content;
    this.tag = tag;
  }

  toPlainData() {
    return {
      tag: this.tag,
      content: this.content
    };
  }
}


export default Sticker;
