export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function eventDelegate($listener, eventName, targetClass, cb) {
  $listener.addEventListener(eventName, e => {
    if (e.target.classList.contains(targetClass)) {
      cb(e);
    }
  });
}

export function times(n, fn) {
  Array(n).fill().forEach(fn);
}
