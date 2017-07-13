import Sticker from './Sticker.js';
import StickerList from './StickerList.js';

import Tag from './Tag.js';
import TagList from './TagList.js';

import { render } from './view.js';
import { $, eventDelegate, times } from './utils.js';

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
      data
    });
  };

  const stickers = new StickerList({ onChange: renderStickerList });
  const tags = new TagList({ onChange: renderTagList });

  times(5, () => tags.push(new Tag({ content: Math.random() })));
  stickers.push(new Sticker({ content: 'test sticker', tag: '12123123' }));


  const init = () => {
    // append add/form item
    $stickerWrapper.append($('#sitcker-form').content);
    $stickerWrapper.append($('#sitcker-add').content);

    // listen add sticker button
    eventDelegate($stickerWrapper, 'click', 'js-sticker-add', () => {
      $stickerWrapper.classList.add('is-adding');
      $stickerWrapper.querySelector('.js-sticker-content-input').focus();
    });

    // listen sticker content enter
    $stickerWrapper.querySelector('.js-sticker-form').addEventListener('keydown', ({ key, target }) => {
      if (key === 'Enter') {
        stickers.push(new Sticker({ content: target.innerHTML, tag: Math.random() }));
        target.innerHTML = '';
        $stickerWrapper.classList.remove('is-adding');
      }
    });

    // listen tag click
    eventDelegate($tagsList, 'click', 'js-tag-item', ({ target }) => {
      if(confirm('Delete tag?')) {
        tags.delete(target.dataset.vId);
      }
    });
  };

  window.onload = init;
}
