import {combineReducers} from 'redux';
import {game} from './game';
import {register} from './register';
import {data} from './data';

export default combineReducers({
  game,
  register,
  data
});
