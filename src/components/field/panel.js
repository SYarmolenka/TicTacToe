import React, {Component} from 'react';
import {connect} from 'react-redux'
import './style.css';
import firebase from 'firebase';
import {Label, Icon} from 'semantic-ui-react';

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

  }
  clickEvents = (elem) => {
    if (elem.closest('.userConnect')) {
      const key = elem.closest('.userConnect').getAttribute('user');
      if (elem.matches('.delete')) {
        firebase.database().ref('rooms/' + this.props.currentUser.uid + '/connect' + key).remove();
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
            <Icon name='delete' />
          </Label>
        );
      }
      return <div> Users want connect to your game:<br/>{arr}</div>;
    };
    return null;
  };
  render () {
    const {
      width,
      height,
      top,
      left
    } = this.props;
    return (
      <div className='panel'
        style={{width: width + 'px', height: height + 'px', top: top + 'px', left: left + 'px'}}>
        {this.listOfUsers()}
      </div>
    );
  };
};

export default connect(
  state => ({
    currentUser: state.register.user,
    usersWantConnect: state.data.usersWantConnect,
    field: state.game.field,
    signObserver: state.data.signObserver
  }),
  {}
)(Panel);
