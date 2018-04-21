import React, {Component} from 'react';
import {Modal, Input, Button, Divider, List, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {changeData} from '../../actions/game';
import firebase from 'firebase';
import mark from '../../userPhoto/mark.png';
import {setMode} from '../../actions/game';

class Online extends Component {
  constructor (props) {
    super(props);
    firebase.database().ref('users/').on('value', data => {
      this.dataReady = 1;
      this.props.changeData('usersOnline', this.filterUsers(data.val()) || 'No active rooms');
    });
  };
  filterUsers (users) {
    const result = {};
    for (let key in users) {
      if (key !== this.props.mainUser.uid && users[key].online) result[key] = users[key];
    };
    return result;
  };
  createRoomList () {
    const list = [];
    for (let key in this.props.users) {
      list.push(
        <List.Item key={key} folder={key} onClick={e => this.connectUser(e.target)}>
          <Image avatar src={this.props.users[key].photoURL} />
          <List.Content>
            <List.Header>{this.props.users[key].name}</List.Header>
          </List.Content>
        </List.Item>
      )
    };
    return (
      <List selection verticalAlign='middle'>
        {list.reverse()}
      </List>
    );
  };
  connectUser = (elem) => {
    const key = elem.closest('.item').getAttribute('folder');
    const ownKey = this.props.mainUser.uid;
    const fb = firebase.database();
    const usersData = Promise.all([
      new Promise(resolve => {fb.ref(`users/${key}`).once('value', data => resolve(data.val()))}),
      new Promise(resolve => {fb.ref(`users/${ownKey}`).once('value', data => resolve(data.val()))}),
    ]).then(arr => {
      const connect = arr[0].online.connect || {};
      if (!(ownKey in connect)) connect[ownKey] = arr[1];
      fb.ref(`users/${key}/online/connect`).set(connect);
      fb.ref(`users/${key}/online`).on('value', data => {
        data = data.val();
        if (data.players[1]) {
          this.props.changeData('signObserver', key);
          this.props.setMode('online', this.props.mainUser.uid);
          window.location.hash = 'game';
        } else {
          //khgjhgjkhjkkgkjhgkjhgjkhgkjhghjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        };
      });
    });
    this.props.changeData('connecting', true);
    this.dataReady = 0;
  };
  createRoom = () => {
    if (!this.dataReady) return;
    firebase.database().ref('users/' + this.props.mainUser.uid).once('value', data => {
      data = data.val();
      data.online = {players: [data.name, 0]};
      firebase.database().ref('users/' + this.props.mainUser.uid).set(data).then(_ => {
        firebase.database().ref(`users/${this.props.mainUser.uid}/online/connect`).on('value', data => {
          this.props.changeData('usersWantConnect', data.val());
        });
      });
    });
    this.props.setMode('online', this.props.mainUser.uid);
    window.location.hash = 'game';
  };
  render () {
    if (!this.props.mainUser) return null;
    return (
      <Modal size='mini' className='register' open={this.props.open} onClose={_ => {}}>
        <Modal.Header>
          Choose room
        </Modal.Header>
        <Modal.Content>
          <Divider horizontal>connect to room</Divider>
          {(_ => {return this.dataReady ? this.createRoomList() : <p>...Spinner</p> })()}
          <Divider horizontal>or create room</Divider>
          {/* <Input fluid type='text' value={this.props.name} placeholder='Name of room...' onChange={e => this.props.changeData('name', e.target.value)} /> */}
          <Button disabled={this.props.connecting} color='green' fluid onClick={this.createRoom}>Create Room</Button>
        </Modal.Content>
      </Modal>
    );
  };
};

export default connect(
  state => ({
    connecting: state.data.connecting,
    users: state.data.usersOnline,
    mainUser: state.register.user
  }),
  {changeData, setMode}
)(Online);
