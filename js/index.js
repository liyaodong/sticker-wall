import Sticker from './Sticker.js';
import StickerList from './StickerList.js';

import Tag from './Tag.js';
import TagList from './TagList.js';

import { render } from './view.js';
import { $, eventDelegate } from './utils.js';

{
  const $stickerWrapper = $('#sticker-items');

  const renderList = data => {
    // render stickers to view
    render({
      $el: $stickerWrapper,
      $template: $('#sticker-template'),
      itemSelector: '.js-sticker-item',
      data
    });
  };

  const stickers = new StickerList({ onChange: renderList });
  const tags = [];

  const init = () => {
    stickers.push(new Sticker({ content: 'test sticker', tag: '12123123' }));

    // append add/form item
    $stickerWrapper.append($('#sitcker-form').content);
    $stickerWrapper.append($('#sitcker-add').content);

    // listen add sticker button
    eventDelegate($stickerWrapper, 'click', 'js-sticker-add', () => {
      $stickerWrapper.classList.add('is-adding');
      $stickerWrapper.querySelector('.js-sticker-content-input').focus();
    });

    // listen sticker form submit
    $stickerWrapper.querySelector('.js-sticker-form').addEventListener('keydown', ({ key, target }) => {
      if (key === 'Enter') {
        stickers.push(new Sticker({ content: target.innerHTML, tag: Math.random() }));
        target.innerHTML = '';
        $stickerWrapper.classList.remove('is-adding');
      }
    });
  };

  window.onload = init;
}
