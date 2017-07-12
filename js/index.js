import Sticker from './Sticker.js';
import { render } from './view.js';
import { $, eventDelegate } from './utils.js';

{
  const stickers = [];
  const tags = [];

  const init = () => {
    for (let i = 0; i < 10; i++) {
      stickers.push(new Sticker({ content: 'test sticker', tag: '12123123' }));
    }

    const $stickerWrapper = $('#sticker-items');

    // render stickers to view
    render({
      $el: $stickerWrapper,
      $template: $('#sticker-template'),
      data: stickers
    });

    // append add/form item
    $stickerWrapper.append($('#sitcker-form').content);
    $stickerWrapper.append($('#sitcker-add').content);

    // listen add sticker button
    eventDelegate($stickerWrapper, 'click', 'js-sticker-add', () => {
      $stickerWrapper.classList.add('is-adding');
    });

    // listen sticker form submit
    eventDelegate($stickerWrapper, 'submit', 'js-sticker-form', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(formData);
    });
  };

  window.onload = init;
}
