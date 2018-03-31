const defineBestPosition = (mine, enemy, arr) => {

  const getRandomNumber = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  const countDirections = (arr, x, y) => {
    const horizontal = [mine];
    const vertical = [mine];
    const leftRight = [mine];
    const rightLeft = [mine];
    let a, b, c, d, e, f, j, g;
    for (let i = 1; i < 5; i++) {
      if ((x - i) >= 0 && arr[y][x - i] !== enemy && !a) {
        horizontal.unshift(arr[y][x - i]);
      } else a = 1;
      if ((x + i) < arr[y].length && arr[y][x + i] !== enemy && !b) {
        horizontal.push(arr[y][x + i]);
      } else b = 1;
      if ((y - i) >= 0 && arr[y - i][x] !== enemy && !c) {
        vertical.unshift(arr[y - i][x]);
      } else c = 1;
      if ((y + i) < arr.length && arr[y + i][x] !== enemy && !d) {
        vertical.push(arr[y + i][x]);
      } else d = 1;
      if ((y - i) >= 0 && (x - i) >= 0 && arr[y - i][x - i] !== enemy && !e) {
        leftRight.unshift(arr[y - i][x - i]);
      } else e = 1;
      if ((y + i) < arr.length && (x + i) < arr[y + i].length && arr[y + i][x + i] !== enemy && !f) {
        leftRight.push(arr[y + i][x + i]);
      } else f = 1;
      if ((y - i) >= 0 && (x + i) < arr[y - i].length && arr[y - i][x + i] !== enemy && !j) {
        rightLeft.unshift(arr[y - i][x + i]);
      } else j = 1;
      if ((y + i) < arr.length && (x - i) >= 0 && arr[y + i][x - i] !== enemy && !g) {
        rightLeft.push(arr[y + i][x - i]);
      } else g = 1;
    };
    return {cell: [x, y], horizontal, vertical, leftRight, rightLeft};
  };

  const checkAround = (arr, x, y) => {
    let result = [];
    for (let i = x - 1; i <= x + 1; i++) {
      if (arr[y - 1] && i < arr[y - 1].length && i >= 0 && arr[y - 1][i] !== enemy && arr[y - 1][i] !== mine) {
        result.push(countDirections(arr, i, y - 1));
      };
    };
    if (x + 1 < arr[y].length && arr[y][x + 1] !== enemy && arr[y][x + 1] !== mine) {
      result.push(countDirections(arr, x + 1, y));
    };
    for (let i = x + 1; i >= x - 1; i--) {
      if (arr[y + 1] && i < arr[y + 1].length && i >= 0 && arr[y + 1][i] !== enemy && arr[y + 1][i] !== mine) {
        result.push(countDirections(arr, i, y + 1));
      };
    };
    if (x - 1 >= 0 && arr[y][x - 1] !== enemy && arr[y][x - 1] !== mine) {
      result.push(countDirections(arr, x - 1, y));
    };
    return result;
  };

  const mainArray = (arr) => {
    let main = [];
    arr.forEach((elem, i) => {
      elem.forEach((cell, j) => {
        if (cell === mine) {
          main = [...main, ...checkAround(arr, j, i)];
        };
      });
    });
    return main.filter((obj, i, main) => {
      for (let j = i + 1; j < main.length; j++) {
        if (obj.cell.toLocaleString() === main[j].cell.toLocaleString()) return false;
      };
      return true;
    });
  };

  const arraysAnalyze = (smallArray) => {
    let rating = 0;
    const first = smallArray.findIndex(elem => elem === mine);
    const last = smallArray.length - 1 - smallArray.slice().reverse().findIndex(elem => elem === mine);
    if (last - first < 5) {
      const after = smallArray.length - 1 - last;
      if (last + after < 4) return rating;
      rating += smallArray.filter((el) => el === mine).length;
      if (rating === 3 && first >= 1 && after >= 1) rating += 0.5;
      if (rating === 4 && first >= 1 && after >= 1) rating += 0.5;
      return rating;
    } else {
      const res1 = arraysAnalyze(smallArray.slice(first + 1));
      const res2 = arraysAnalyze(smallArray.splice(0, last));
      return res1 >= res2 ? res1 : res2;
    }
  };

  const defineRatingEveryCell = (obj) => {
    let rating = [];
    for (let key in obj) {
      if (key !== `cell`) {
        rating.push(arraysAnalyze(obj[key]));
      };
    };
    rating = rating.sort((a, b) => b - a).filter((el, i, arr) => el === arr[0] ? 1 : 0);
    // hard level
    if (rating.length >= 2 && rating[0] === 3.5) {
      rating = 4.4;
    } else if (rating.length >= 2 && rating[0] === 4.5) {
      rating = 4.6;
    } else {
      rating = rating[getRandomNumber(0, rating.length - 1)];
    };
    // light level
    // rating = rating[getRandomNumber(0, rating.length - 1)];
    //
    obj.rating = rating;
    return obj;
  };

  const totalArray = mainArray(arr).map(defineRatingEveryCell).sort((a, b) => b.rating - a.rating).filter((el, i, arr) => el.rating === arr[0].rating ? 1 : 0);

  const result = totalArray[getRandomNumber(0, totalArray.length - 1)];

  return result ? {x: result.cell[0], y: result.cell[1], rating: result.rating} : {x: getRandomNumber(arr[0].length / 4, arr[0].length * 3 / 4), y: getRandomNumber(arr.length / 4, arr.length * 3 / 4), rating: 0};
};

export const doChoose = (mine, enemy, arr) => {
  const bestMine = defineBestPosition(mine, enemy, arr);
  const bestEnemy = defineBestPosition(enemy, mine, arr);
  if (bestMine.rating === 0) return bestEnemy;
  if (bestMine.rating === 5) return bestMine;
  if (bestEnemy.rating === 5 && bestMine.rating !== 5) return bestEnemy;
  if (bestEnemy.rating >= 4.5 && bestMine.rating < 4.5) return bestEnemy;
  if (bestEnemy.rating > 4 && bestEnemy.rating < 4.5 && bestMine.rating < 4.5) return bestEnemy;
  return bestMine;
};

// import field from './canvas';
// field.createArray(50, 25);
// field.createCanvasField();
