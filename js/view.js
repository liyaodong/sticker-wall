import { $$ } from './utils.js';

export function render({ $el, $template, data }) {
  $el.innerHTML = '';

  const template = $template.content;

  data.forEach(dataItem => {
    const $item = document.importNode(template, true);
    const $payloads = $item.querySelectorAll('[data-payload]');

    $payloads.forEach($payload => {
      $payload.innerHTML = dataItem[$payload.dataset.payload];
    });

    $el.appendChild($item);
  });
}
