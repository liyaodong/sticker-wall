import { $$ } from './utils.js';

function convertObjectKeyToLowerCase(obj) {
  const convertedObj = obj.toPlanData() || obj;
  return Object.keys(convertedObj).reduce((acc, key) => {
    return {...acc, [key.toLowerCase()]: obj[key]};
  }, {});
}

export function render({ $el, $template, itemSelector, data, onRender = f => f }) {
  const template = $template.content;

  const $items = data.map(convertObjectKeyToLowerCase).map(dataItem => {
    const $item = document.importNode(template, true);
    const $payloads = $item.querySelectorAll('[data-payload]');

    $payloads.forEach($payload => {
      $payload.innerHTML = dataItem[$payload.dataset.payload];
      const dataSet = JSON.parse(JSON.stringify($payload.dataset));
      Object.keys(dataSet).filter(key => /^v./.test(key)).forEach(key => {
        const attrData = dataItem[key.replace(/^v/, '').toLowerCase()];
        $payload.dataset[key] = attrData;
      });

      onRender($payload, dataItem);
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
