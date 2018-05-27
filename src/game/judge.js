export const judge = (x, y, player, arr) => {
  const result = [[``], [``], [``], [``]];
  let coincidence;
  for (let i = -4; i < 5; i++) {
    if (arr[y] !== undefined && arr[y][x + i] !== undefined) {
      result[0].push([y, x + i]);
      result[0][0] += arr[y][x + i];
    };
    if (arr[y + i] !== undefined && arr[y + i][x] !== undefined) {
      result[1].push([y + i, x]);
      result[1][0] += arr[y + i][x];
    };
    if (arr[y - i] !== undefined && arr[y - i][x + i] !== undefined) {
      result[2].push([y - i, x + i]);
      result[2][0] += arr[y - i][x + i];
    };
    if (arr[y - i] !== undefined && arr[y - i][x - i] !== undefined) {
      result[3].push([y - i, x - i]);
      result[3][0] += arr[y - i][x - i];
    };
  };
  result.forEach(direction => {
    const index = direction[0].indexOf(`${new Array(5).fill(player).join(``)}`);
    if (index >= 0) {
      direction[0] = index;
      coincidence = direction;
    };
  });
  if (coincidence) {
    const newArr = [];
    for (let i = coincidence[0]; i < coincidence[0] + 5; i++) {
      newArr.push(coincidence[i + 1]);
    };
    coincidence = newArr;
  }
  return coincidence;
};
