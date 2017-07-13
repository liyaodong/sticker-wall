import Sticker from './Sticker.js';
import StickerList from './StickerList.js';

import Tag from './Tag.js';
import TagList from './TagList.js';

import { render } from './view.js';
import { $, eventDelegate, times, onEnter } from './utils.js';

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

  const stickers = new StickerList({ onChange: renderStickerList });
  const tags = new TagList({ onChange: renderTagList });

  times(5, () => tags.push(new Tag({ content: Math.random(), color: '#f0aebc' })));
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
    onEnter($stickerWrapper.querySelector('.js-sticker-form'), ({ target }) => {
      stickers.push(new Sticker({ content: target.innerHTML, tag: Math.random() }));
      target.innerHTML = '';
      $stickerWrapper.classList.remove('is-adding');
    });

    // listen tag click
    eventDelegate($tagsList, 'click', 'js-tag-item', ({ target }) => {
      if(confirm('Delete tag?')) {
        tags.delete(target.dataset.vId);
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
      tags.push(new Tag({ content: tagContent, color: tagColor }));
      target.innerHTML = '';
      $('.js-tag-form').classList.remove('is-adding');
    });
  };

  window.onload = init;
}
