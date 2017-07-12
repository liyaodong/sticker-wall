import Sticker from './Sticker.js';
import StickerList from './StickerList.js';

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
      $('.js-sticker-form input').focus();
    });

    // listen sticker form submit
    eventDelegate($stickerWrapper, 'submit', 'js-sticker-form', e => {
      e.preventDefault();
      const $f = e.target;
      const $tag = $f.querySelector('input#tag');
      const $content = $f.querySelector('input#content');
      stickers.push(new Sticker({ content: $content.value, tag: $tag.value }));
      $tag.value = '';
      $content.value = '';

      $stickerWrapper.classList.remove('is-adding');
    });
  };

  window.onload = init;
}
