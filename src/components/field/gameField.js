import React, {Component} from 'react';
import {connect} from 'react-redux';
import {playerStep} from '../../actions/game';
import {improveArray} from '../../game/changeArray';
import {doChoose} from '../../game/AILogic';
import {Cross} from './cross';
import {Null} from './null';
import './style.css';
import GameOver from '../modals/gameOver';
import local from '../../game/local';
import {updateGame} from '../../actions/game';
import Canvas from './canvas';
import {Header, Modal, Button, Icon} from 'semantic-ui-react';
import {changeData} from '../../actions/game';
import firebase from 'firebase';
import throttle from '../../game/throttle';
import Connect from './connect';
import Panel from './panel';

class GameField extends Component {
  constructor (props) {
    super(props);
    this.onlineStep = true;
    const {player1, player2, AI1, AI2, online} = this.props;
    if (player1 || player2 || AI1 || AI2 || online) {
      this.startGame();
    } else {
      local('tictactoe').then(local => {
        if (local.gameOver || Object.keys(local).length === 0) return window.location.hash = '/';
        if (local.player1) {
          this.start = 1;
        }
        this.props.updateGame(local);
        if (local.AI1 && local.AI2) this.startGame();
      }).catch(_ => { window.location.hash = '/'; });
    };
  };
  clickHandler = (x, y) => {
    if (this.props.field[y][x] || this.props.stop) return;
    if (this.start && this.props.player1) {
      this.props.playerStep(x, y);
      if (this.props.AI1) {
        this.stepAI();
      };
    };
    if (this.start && this.props.online && this.onlineStep) {
      this.props.playerStep(x, y);
      this.onlineStep = false;
      if (this.props.signObserver) {
        firebase.database().ref(`users/${this.props.signObserver}/online/${this.props.currentUser.uid}`).set({step: [x, y], field: this.props.field});
      } else {
        firebase.database().ref(`users/${this.props.currentUser.uid}/online/${this.props.currentUser.uid}`).set({step: [x, y], field: this.props.field});
      };
    };
  };
  onlineObserver = (step, field) => {
    this.onlineStep = true;
    this.props.playerStep(step[0], step[1], field);
  }
  stepAI () {
    const mine = this.props.currentFigure;
    const enemy = mine === 'X' ? 'O' : 'X';
    const step = doChoose(mine, enemy, this.props.field);
    this.props.playerStep(step.x, step.y);
  };
  greatBattle () {
    let count = 0;
    this.timer = setInterval(_ => {
      this.stepAI();
      count++;
      if (this.props.stop || count > 1000) {
        clearInterval(this.timer);
      }
    }, 1000);
  };
  gameOver () {
    if (!this.props.stop) return false;
    this.start = 0;
  };
  startGame () {
    if (this.start) return false;
    this.start = 1;
    if (this.props.player1 && this.props.AI1 === 'X' && this.props.currentFigure === 'X') {
      this.stepAI();
    }
    if (this.props.AI1 && this.props.AI2) {
      this.greatBattle();
    };
  };
  render () {
    let show, connectUser;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    show = this.start ? <Canvas clickHandler={this.clickHandler} screenWidth={width * 0.8} screenHeight={height}/> : <p>spinner...</p>;
    return (
      <div
        id='wrapper'
        style={{
          display: 'block',
          width: `${width * 0.8}px`,
          height: `${height}px`,
          border: '1px solid red',
          overflow: 'hidden'
        }} >
        <Panel
          observer={this.onlineObserver}
          start={this.startGame}
          width={width * 0.2}
          height={height}
          left={width * 0.8}
          top='0' />
        {show}
      </div>
    );
  };
};

export default connect(
  state => ({
    field: state.game.field,
    cell: state.game.cell,
    stop: state.game.gameOver,
    offset: state.game.offset,
    player1: state.game.player1,
    player2: state.game.player2,
    AI1: state.game.AI1,
    AI2: state.game.AI2,
    currentFigure: state.game.currentFigure,
    data: state.game,
    currentUser: state.register.user,
    online: state.game.online,
    signObserver: state.data.signObserver
  }),
  { playerStep, updateGame, changeData })(GameField);
