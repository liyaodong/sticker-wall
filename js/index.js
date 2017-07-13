import Sticker from './Sticker.js';
import StickerList from './StickerList.js';

import Tag from './Tag.js';
import TagList from './TagList.js';

import { render } from './view.js';
import { $, eventDelegate, times, onEnter } from './utils.js';

import store from './store.js';

const STICKER = 'stickers';
const TAG = 'tags';

{
  const $stickerWrapper = $('#sticker-items');
  const $tagsList = $('#tags-list');

  const renderStickerList = data => {
    // render stickers to view
    render({
      $el: $stickerWrapper,
      $template: $('#sticker-template'),
      itemSelector: '.js-sticker-item',
      data
    });
  };

  const renderTagList = data => {
    render({
      $el: $tagsList,
      $template: $('#tag-item'),
      itemSelector: '.js-tag-item',
      data,
      onRender: ($item, { color }) => $item.style.backgroundColor = color
    });

  };

  const syncStickers = data => store.set(STICKER, data);
  const syncTags = data => store.set(TAG, data);

  const pageData = {
    [STICKER]: new StickerList({ onChange: renderStickerList }),
    [TAG]: new TagList({ onChange: renderTagList })
  };

  const init = () => {
    initDataFromStore();

    // append add/form item
    $stickerWrapper.append($('#sitcker-form').content);
    $stickerWrapper.append($('#sitcker-add').content);

    // listen add sticker button
    eventDelegate($stickerWrapper, 'click', 'js-sticker-add', () => {
      $stickerWrapper.classList.add('is-adding');
      $stickerWrapper.querySelector('.js-sticker-content-input').focus();
    });

    // listen sticker content enter
    onEnter($stickerWrapper.querySelector('.js-sticker-form'), ({ target }) => {
      pageData[STICKER].push(new Sticker({ content: target.innerHTML, tag: Math.random() }));
      target.innerHTML = '';
      $stickerWrapper.classList.remove('is-adding');
      syncStickers(pageData[STICKER]);
    });

    // listen tag click
    eventDelegate($tagsList, 'click', 'js-tag-item', ({ target }) => {
      if(confirm('Delete tag?')) {
        pageData[TAG].delete(target.dataset.vId);
        syncTags(pageData[TAG]);
      }
    });

    $('.js-tag-add').addEventListener('click', () => {
      const $f = $('.js-tag-form');
      $f.classList.add('is-adding');
      $f.querySelector('.js-tag-form-content').focus(); 
    });

    onEnter($('.js-tag-form-content'), ({ target }) => {
      const tagContent = target.innerHTML;
      const tagColor = $('.js-tag-color').value;
      pageData[TAG].push(new Tag({ content: tagContent, color: tagColor }));
      target.innerHTML = '';
      $('.js-tag-form').classList.remove('is-adding');
      syncTags(pageData[TAG]);
    });
  };

  window.onload = init;

  function initList (key, data, pageListItem) {
    return ({
      [TAG]: () => data.reduce((list, item) => {
        list.push(new Tag(item));
        return list;
      }, pageListItem),
      [STICKER]: () => data.reduce((list, item) => {
        list.push(new Sticker(item));
        return list;
      }, pageListItem)
    })[key]();
  };

  function initDataFromStore() {
    const storeData = store.getAllData();
    if (!storeData) {
      return;
    }

    Object.keys(storeData).forEach(key => {
      switch(key) {
      case STICKER:
        storeData[key].forEach(x => pageData[key].push(new Sticker(x)));
        break;
      case TAG: 
        storeData[key].forEach(x => pageData[key].push(new Tag(x)));
        break;
      }
    });
  }
}
