class Sticker {
  constructor({ content, tag }) {
    this.content = content;
    this.tag = tag;
  }

  toPlanData() {
    return {
      tag: this.tag,
      content: this.content
    };
  }
}


export default Sticker;
