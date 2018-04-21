import {PLAYER_STEP, SET_MODE, UPDATE} from '../actions/game';
import {judge} from '../game/judge';
import {improveArray} from '../game/changeArray';
import local from '../game/local';

const initState = {
  field: new Array(5).fill(0).map(elem => new Array(5).fill(0)),
  cell: 30,
  lastCell: new Array(2),
  currentFigure: 'X',
  gameOver: false,
  offsetField: [0, 0],
  player1: false,
  player2: false,
  AI1: false,
  AI2: false,
  online: false,
  level: false,
  names: new Array(2)
};

export const game = (state = initState, action) => {
  if (action.type === PLAYER_STEP) {
    let arr, offsetField, lastCell;
    let currentFigure = state.currentFigure;
    if (!action.field) {
      arr = JSON.parse(JSON.stringify(state.field));
      arr[action.y][action.x] = currentFigure;
    } else {
      arr = action.field;
    }
    const gameOver = judge(action.x, action.y, currentFigure, arr);
    if (gameOver) {
      lastCell = new Array(2);
      offsetField = [0, 0];
    } else {
      offsetField = improveArray(action.x, action.y, arr, true);
      lastCell = [action.x + offsetField[0], action.y + offsetField[1]];
      currentFigure = currentFigure === 'O' ? 'X' : 'O';
    };
    const total = {...state, field: arr, lastCell, offsetField, gameOver, currentFigure};
    // local('tictactoe', total);
    // local('tictactoe_history', arr, true);
    return total;
  };
  if (action.type === UPDATE) return action.payload;
  if (action.type === SET_MODE) return {...state, [action.name]: action.value};
  return state;
};
