class Tag {
  constructor({ content, color }) {
    this.id = Math.random();
    this.content = content;
    this.color = color;
  }

  toPlanData() {
    return {
      id: this.id,
      content: this.content,
      color: this.color
    };
  }
}


export default Tag;
