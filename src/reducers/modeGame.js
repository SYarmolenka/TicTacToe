import {CHANGE_MODE, CHANGE_USE_DATA, UPDATE} from '../actions/modeGame';
import local from '../game/local';

const initState = {
  playerAI: false,
  playersOff: false,
  playersOn: false,
  AI_AI: false,
  userFigure: 'X',
  userName: undefined,
  level: 'easy',
  step: 0
};

export const mode_game = (state = initState, action) => {
  if (action.type === CHANGE_MODE) {
    const total = {...state, [action.payload]: true};
    local('mode', total);
    return total;
  };
  if (action.type === CHANGE_USE_DATA) {
    const total = {...state, [action.name]: action.value};
    local('mode', total);
    return total;
  };
  if (action.type === UPDATE) return Object.assign({}, state, action.payload);
  return state;
};
