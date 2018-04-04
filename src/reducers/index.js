import {combineReducers} from 'redux';
import {game} from './game';
import {register} from './register';

export default combineReducers({
  game,
  register
});
