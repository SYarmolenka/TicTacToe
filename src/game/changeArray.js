export const improveArray = (x, y, arr, changeArray) => {
  const down = arr.length - y - 1;
  const right = arr[0].length - x - 1;
  const left = x;
  const top = y;
  const offset = [0, 0];
  if (left < 4) {
    iterate(_ => {
      if (changeArray) {
        arr.forEach(elem => {
          elem.unshift(0);
        });
      };
      x++;
    }, 3 - left);
    offset[0] = x - left;
  };
  if (right < 4) {
    iterate(_ => {
      if (changeArray) {
        arr.forEach(elem => {
          elem.push(0);
        });
      };
    }, 3 - right);
  };
  if (top < 4) {
    iterate(_ => {
      if (changeArray) {
        const newArr = new Array(arr[0].length).fill(0);
        arr.unshift(newArr);
      };
      y++;
    }, 3 - top);
    offset[1] = y - top;
  };
  if (down < 4) {
    iterate(_ => {
      if (changeArray) {
        const newArr = new Array(arr[0].length).fill(0);
        arr.push(newArr);
      };
    }, 3 - down);
  };
  return offset;
};

const iterate = (cb, limit) => {
  for (let i = 0; i <= limit; i++) {
    cb();
  };
};
