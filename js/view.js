export function render({ $el, $template, data }) {
  $el.innerHTML = JSON.stringify(data);
}
