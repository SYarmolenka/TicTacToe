import {combineReducers} from 'redux';
import {game} from './game';
import {mode_game} from './modeGame';

export default combineReducers({
  game,
  mode_game
});
