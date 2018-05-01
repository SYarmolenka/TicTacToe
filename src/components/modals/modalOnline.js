import React, {Component} from 'react';
import {Modal, Button, Divider, List, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {changeData} from '../../actions/game';
import firebase from 'firebase';
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
    const key = elem.closest('.item').getAttribute('folder'); // получаем key пользователя, по которому кликнули
    const ownKey = this.props.mainUser.uid; // получаем собственный key
    const fb = firebase.database();
    Promise.all([ // запрос данных с сервера
      new Promise(resolve => {fb.ref(`users/${key}`).once('value', data => resolve(data.val()))}),
      new Promise(resolve => {fb.ref(`users/${ownKey}`).once('value', data => resolve(data.val()))}),
    ]).then(arr => {
      const connect = arr[0].online.connect || {}; // заходим в папку connect или создаем
      if (!(ownKey in connect)) connect[ownKey] = arr[1]; // добавляем в connect данные по подключаемому user
      fb.ref(`users/${key}/online/connect`).set(connect); // отправляем connect на сервер
      fb.ref(`users/${key}/online`).on('value', data => { // подписываемся на изменение данных
        data = data.val();
        if (data.players[1]) { // если админ комнаты согласен, то
          this.props.changeData('signObserver', key); // записываем ключ для подписки на изменение данных на сервере 
          this.props.setMode('online', this.props.mainUser.uid); // 
          window.location.hash = 'game';
        } else {
          //khgjhgjkhjkkgkjhgkjhgjkhgkjhghjjjjjjjjj
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
      <Modal size='mini' className='register' open={this.props.open} onClose={this.props.close}>
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
