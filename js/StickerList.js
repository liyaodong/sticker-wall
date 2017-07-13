class StickerList {
  constructor({ onChange }) {
    this._list = [];
    this.onChange = onChange;
  }

  push(sticker) {
    this._list.push(sticker);
    this.onChange(this._list);
  }

  toPlainData() {
    return this._list.map(x => x.toPlainData() || x);
  }
}

export default StickerList;
