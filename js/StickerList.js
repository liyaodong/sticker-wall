class StickerList {
  constructor({ onChange }) {
    this._list = [];
    this.onChange = onChange;
  }

  push(sticker) {
    this._list.push(sticker);
    this.onChange(this._list);
  }
}

export default StickerList;
