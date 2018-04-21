import {MENU} from '../actions/menu';

export const menu = (state = {}, action) => {
  if (action.type === MENU) return {...state, [action.modal]: action.bool};
  return state;
};
