import Sticker from './Sticker.js';
import { render } from './view.js';
import { $ } from './utils.js';

{
  const stickers = [];
  const tags = [];

  const init = () => {
    stickers.push(new Sticker({ content: 'test sticker', tag: '12123123' }));


    // render stickers to view
    render({
      $el: $('#sticker-wrapper'),
      $template: $('#sticker-template'),
      data: stickers
    });
  };

  window.onload = init;
}
