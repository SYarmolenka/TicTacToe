import React, {Component} from 'react';
import {connect} from 'react-redux'
import './style.css';
import firebase from 'firebase';
import {Label, Icon} from 'semantic-ui-react';
import {Cross} from './cross';
import {Null} from './null';
import {changeData} from '../../actions/game';

class Panel extends Component {
  componentDidMount () {
    if (this.props.signObserver) {
      this.props.start();
      firebase.database().ref(`users/${this.props.signObserver}/online/${this.props.signObserver}`).on('value', obj => {
        obj.val() ? this.props.observer(obj.val().step, obj.val().field) : null;
      });
    }
  }
  connectUser (ownKey, key) {
    const db = firebase.database();
    db.ref().off();
    db.ref(`users/${ownKey}`).once('value', data => {
      data = data.val();
      data.online.players[1] = data.online.connect[key].name;
      data.online[ownKey] = new Array(2);
      data.online[key] = new Array(2);
      db.ref(`users/${ownKey}`).set(data).then(_ => {
        this.props.start();
        db.ref(`users/${ownKey}/online/${key}`).on('value', obj => {
          obj.val() ? this.props.observer(obj.val().step, obj.val().field) : null;
        });
      });
    });
  };
  deleteUserFromLst (key) {
    const users = this.props.usersWantConnect;
    delete users[key];
    changeData('usersWantConnect', users);
  }
  clickEvents = (elem) => {
    if (elem.closest('.userConnect')) {
      const key = elem.closest('.userConnect').getAttribute('user');
      if (elem.matches('.delete')) {
        firebase.database().ref('users/' + this.props.currentUser.uid + '/online/connect/' + key).remove();
        this.deleteUserFromLst(key);
      };
      if (elem.matches('img')) this.connectUser(this.props.currentUser.uid, key);
    };
  };
  listOfUsers () {
    const users = this.props.usersWantConnect;
    if (users) {
      const arr = [];
      for (let key in users) {
        arr.push(
          <Label className='userConnect' key={key} user={key} onClick={e =>this.clickEvents(e.target)} image>
            <img src={users[key].photoURL} />
            {users[key].name}
            <Icon className='delete' name='delete' />
          </Label>
        );
      }
      return <div> Users want connect to your game:<br/>{arr}</div>;
    };
    return null;
  };
  stepUserName () {
    if (this.props.online) {
      const key = this.props.uid;
    }
    if (this.props.pl1 === this.props.currentFigure) return this.props.names[0];
    if (this.props.pl2 === this.props.currentFigure) return this.props.names[1];
    if (this.props.AI1 === this.props.currentFigure || this.props.AI2 === this.props.currentFigure) return 'AI';
  }
  render () {
    const {
      width,
      height,
      top,
      left,
      currentFigure
    } = this.props;
    const figure = _ => {
      if (currentFigure === 'X') return <Cross />;
      if (currentFigure === 'O') return <Null />;
    }
    return (
      <div className='panel'
        style={{width: width + 'px', height: height + 'px', top: top + 'px', left: left + 'px'}}>
        {figure()}
        <div>Level: {this.props.level}</div>
        <div>Step of {this.stepUserName()}</div>
        <div>{this.listOfUsers()}</div>
      </div>
    );
  };
};

export default connect(
  state => ({
    currentUser: state.register.user,
    currentFigure: state.game.currentFigure,
    usersWantConnect: state.data.usersWantConnect,
    field: state.game.field,
    signObserver: state.data.signObserver,
    pl1: state.game.player1,
    AI1: state.game.AI1,
    AI2: state.game.AI2,
    pl2: state.game.player2,
    online: state.game.online,
    level: state.game.level,
    names: state.game.names,
    uid: state.register
  }),
  {changeData}
)(Panel);

458.40  