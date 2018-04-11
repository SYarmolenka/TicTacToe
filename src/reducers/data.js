import {CHANGE_DATA} from '../actions/game';

const initState = {
  rooms: false,
  name: '',
  conversation: false
};

export const data = (state = initState, action) => {
  if (action.type === CHANGE_DATA) return {...state, [action.name]: action.value};
  return state;
};
