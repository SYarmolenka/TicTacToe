import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {MainMenu} from './components/mainMenu/mainMenu';
import {About} from './components/about';
import GameField from './components/field/gameField';
import ModalPlayerAI from './components/modals/modalPlayerAI';
import GameOver from './components/modals/gameOver';
import ModalPlPl from './components/modals/modalP&P';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={MainMenu} />
        <Route path='/about' component={About} />
        <Route path='/game' component={GameField} />
        <Route path='/modalpa' component={ModalPlayerAI} />
        <Route path='/over' component={GameOver} />
        <Route path='/modalpp' component={ModalPlPl} />
      </div>
    );
  };
};
