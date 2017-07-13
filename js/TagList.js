class TagList {
  constructor({ onChange }) {
    this._list = [];
    this.onChange = onChange;
  }

  push(item) {
    this._list.push(item);
    this.onChange(this._list);
  }

  delete(id) {
    this._list = this._list.filter(x => x.id !== +id);
    this.onChange(this._list);
  }
}


export default TagList;
