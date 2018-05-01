import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {MainMenu} from './components/mainMenu/mainMenu';
import {About} from './components/about';
import GameField from './components/field/gameField';
import GameOver from './components/modals/gameOver';
import firebase from 'firebase';
import {change as setUser} from './actions/register';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
        <Route path='/over' component={GameOver} />
      </div>
    );
  };
};

export default withRouter(connect(_ => ({}), {setUser})(App));
