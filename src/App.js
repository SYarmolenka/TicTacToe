import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {MainMenu} from './components/mainMenu/mainMenu';
import {About} from './components/about';
import GameField from './components/field/gameField';
import ModalPlayerAI from './components/modals/modalPlayerAI';
import GameOver from './components/modals/gameOver';
import ModalPlPl from './components/modals/modalP&P';
import firebase from 'firebase';
import Register from './components/modals/modalRegister';
import {change as setUser} from './actions/register';
import {connect} from 'react-redux';
import Online from './components/modals/modalOnline';

class App extends Component {
  constructor (props) {
    super(props);
    const config = {
      apiKey: "AIzaSyAyKqRH2TjBtft8sIVpEcvvEXO9fhCT3Ag",
      authDomain: "tictactoe-32a88.firebaseapp.com",
      databaseURL: "https://tictactoe-32a88.firebaseio.com",
      projectId: "tictactoe-32a88",
      storageBucket: "tictactoe-32a88.appspot.com",
      messagingSenderId: "477675755906"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => this.props.setUser('user', user));
  };
  render () {
    return (
      <div>
        <Route exact path='/' component={MainMenu} />
        <Route path='/about' component={About} />
        <Route path='/game' component={GameField} />
        <Route path='/modalpa' component={ModalPlayerAI} />
        <Route path='/over' component={GameOver} />
        <Route path='/modalpp' component={ModalPlPl} />
        <Route path='/modalreg' component={Register} />
        <Route path='/modalonline' component={Online} />
      </div>
    );
  };
};

export default connect(state => ({user: state.register.user}), {setUser})(App);
