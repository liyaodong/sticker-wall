import { $$ } from './utils.js';

export function render({ $el, $template, itemSelector, data }) {
  const template = $template.content;

  const $items = data.map(dataItem => {
    const $item = document.importNode(template, true);
    const $payloads = $item.querySelectorAll('[data-payload]');

    $payloads.forEach($payload => {
      $payload.innerHTML = dataItem[$payload.dataset.payload];
    });

    return $item;
  });

  if($el.innerHTML.trim()) {
    const $oldItems = $el.querySelectorAll(itemSelector);
    $items.forEach(x => {
      const $prevItems = $el.querySelectorAll(itemSelector);
      $prevItems[$prevItems.length - 1].after(x);
    });

    $oldItems.forEach(x => x.remove());
  } else {
    $items.forEach(x => $el.append(x));
  }
}
