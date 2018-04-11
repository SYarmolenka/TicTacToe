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

class GameField extends Component {
  constructor (props) {
    super(props);
    const {player1, player2, AI1, AI2, online} = this.props;
    if (player1 || player2 || AI1 || AI2 || online) {
      this.startGame();
    } else {
      local('tictactoe').then(local => {
        if (local.gameOver) return window.location.hash = '/';
        if (local.player1) {
          this.start = 1;
        }
        this.props.updateGame(local);
        if (local.AI1 && local.AI2) this.startGame();
      }).catch(_ => { window.location.hash = '/'; });
    };
    if (this.props.online) {
      firebase.database().ref('rooms/' + this.props.online).on('value', data => {
        (data.val() && data.val().conversation) ? this.props.changeData('conversation', true) : 0;
      });
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
  };
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
  denied = () => {
    firebase.database().ref().update({[`rooms/${this.props.online}/conversation`]: false});
  };
  conversation () {
    return (
      <Modal open={this.props.conversation && this.props.conversation !== this.props.currentUser.uid} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.denied}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  };
  render () {
    let show;
    show = this.start ? <Canvas clickHandler={this.clickHandler}/> : <p>spinner...</p>
    return (
      <div
        id='wrapper'
        style={{
          width: `${document.documentElement.clientWidth}px`,
          height: `${document.documentElement.clientHeight - 5}px`
        }} >
        {this.conversation()}
        {/* <header><header> */}
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
    conversation: state.data.conversation,
    currentUser: state.register.user,
    online: state.game.online
  }),
  { playerStep, updateGame, changeData })(GameField);
