function debounce(func, timeout) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(context, args);
      clearTimeout(timer);
    }, timeout);
    return timer;
  };
}

export { debounce };
