export default (fun, delay) => {
  let timer, args;
  return function (...arr) {
    args = arr;
    if (timer) return;
    fun(...args);
    args = false;
    timer = setInterval(_ => {
      if (!args) {
        clearInterval(timer);
        timer = 0;
      } else {
        fun(...args);
        args = false;
      };
    }, delay);
  };
};
