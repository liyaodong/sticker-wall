class Tag {
  constructor({ content }) {
    this.id = Math.random();
    this.content = content;
  }

  toPlanData() {
    return {
      id: this.id,
      content: this.content
    };
  }
}


export default Tag;
