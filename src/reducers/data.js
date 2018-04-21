import {CHANGE_DATA} from '../actions/game';

export const data = (state = {}, action) => {
  if (action.type === CHANGE_DATA) return {...state, [action.name]: action.value};
  return state;
};
