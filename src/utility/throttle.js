function throttle(func, timeout) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    func(...args);
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

export { throttle };
