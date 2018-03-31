import React, {Component} from 'react';
import {connect} from 'react-redux';
import {playerStep} from '../../actions/game';
import {improveArray} from '../../game/changeArray';
import {doChoose} from '../../game/AILogic';
import {Cross} from './cross';
import {Null} from './null';
import './style.css';
import {userData} from '../../actions/modeGame';
import GameOver from '../modals/gameOver';
import local from '../../game/local';
import {updateMode} from '../../actions/modeGame';
import {updateGame} from '../../actions/game';
import Canvas from './canvas';
import {Header} from 'semantic-ui-react';

class GameField extends Component {
  constructor (props) {
    super(props);  
    const {player1, player2, AI1, AI2} = this.props;
    if (player1 || player2 || AI1 || AI2) {
      this.startGame();
    } else {
      window.location.hash = '/';
    };
    return;
    Promise.all([local('mode'), local('game')]).then(local => {
      // this.props.setMode(local[0]);
      // this.props.setGame(local[1]);

      // this.componentDidMount();
      // this.start = 1;
      // this.ctx = this.refs.canvas.getContext('2d');
      // this.drawCanvas();
      // this.refs.canvas.onclick = e => this.canvasClick(e);
      this.startGame();
    }).catch(_ => { window.location.hash = '/'; });
  };
  // componentDidMount () {
  //   if (this.props.field) {
  //     this.ctx = this.refs.canvas.getContext('2d');
  //     this.drawCanvas();
  //     this.startGame();
  //     console.log(`mount`, this.refs.canvas)
  //     this.refs.canvas.onclick = e => this.canvasClick(e);
  //   };
  // };
  // componentDidUpdate () {
  //   if (this.props.field) this.drawCanvas();
  // };
  clickHandler = (x, y) => {
    if (this.start && this.props.player1) {
      this.props.playerStep(x, y);
      if (this.props.AI1) this.stepAI();
    };
  };
  stepAI () {
    const mine = this.props.currentFigure;
    const enemy = mine === 'X' ? 'O' : 'X';
    const step = doChoose(mine, enemy, this.props.field);
    this.props.playerStep(step.x, step.y);
  };
  greatBattle () {
    this.repeat = true;
    let count = 0;
    this.timer = setInterval(_ => {
      console.log(this.props.currentFigure)
      this.stepAI();
      count++;
      if (this.props.stop || count > 1000) {
        clearInterval(this.timer);
      }
    }, 500);
  };
  gameOver () {
    if (!this.props.stop) return false;
    this.repeat = false;
    this.start = 0;
  };
  startGame () {
    if (this.start) return false;
    if (this.props.player1 && this.props.AI1 === 'X') {
      this.stepAI();
    }
    if (this.props.AI1 && this.props.AI2) {
      this.greatBattle();
    };
    this.start = 1;
  };
  render () {
    return (
      <div
        id='wrapper'
        style={{
          width: `${document.documentElement.clientWidth}px`,
          height: `${document.documentElement.clientHeight - 5}px`
        }} >
        {/* <header><header> */}
        <Canvas clickHandler={this.clickHandler}/>
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
    mode: state.mode_game
  }),
  dispatch => ({
    playerStep (...args) { dispatch(playerStep(...args)); },
    countStep (...args) { dispatch(userData(...args)); },
    setMode (obj) {dispatch(updateMode(obj)); },
    setGame (obj) {dispatch(updateGame(obj)); }
  }))(GameField);


  // if (!this.props.field) return <div />;
  // const width = 1 + this.props.field[0].length * (this.props.cell + 1);
  // const height = 1 + this.props.field.length * (this.props.cell + 1);
  // this.width = width;
  // this.height = height;
  // if (this.offsetX === undefined) { this.offsetX = (document.documentElement.clientWidth - width) / 2; };
  // if (this.offsetY === undefined) { this.offsetY = (document.documentElement.clientHeight - height) / 2; };
  // return (
 