import {CHANGE_REG} from '../actions/register';

const initState ={
  name: '',
  email: '',
  password: '',
  user: false
};

export const register = (state = initState, action) => {
  if (action.type === CHANGE_REG) return {...state, [action.name]: action.value};
  return state;
};
