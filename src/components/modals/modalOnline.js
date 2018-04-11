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
    firebase.database().ref('rooms/').on('value', data => {
      this.dataReady = 1;
      this.props.changeData('rooms', data.val() || 'No active rooms');
    });
  };
  createRoomList () {
    if (typeof this.props.rooms === 'string') return <p>{this.props.rooms}</p>
    const list = [];
    for (let key in this.props.rooms) {
      list.push(
        <List.Item key={key} folder={key} onClick={e => this.connectUser(e.target)}>
          <Image avatar src={this.props.rooms[key].photo} />
          <List.Content>
            <List.Header>{this.props.rooms[key].name}</List.Header>
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
    firebase.database().ref().update({[`rooms/${key}/conversation`]: true});
  };
  createRoom = () => {
    const key = firebase.database().ref().child('rooms').push().key;
    const data = {
      name: this.props.name,
      field: this.props.field,
      photo: this.props.mainUser.photoURL || mark
    };
    this.props.changeData('name', '');
    firebase.database().ref('rooms/' + this.props.mainUser.uid).set(data);
    firebase.database().ref('rooms/' + this.props.online).on('value', data => {
      (data.val() && data.val().conversation) ? this.props.changeData('conversation', this.props.mainUser.uid) : 0;
    });
    this.props.setMode('online', this.props.mainUser.uid);
    window.location.hash = 'game';
  };
  render () {
    return (
      <Modal size='mini' className='register' open={true} onClose={_ => {}}>
        <Modal.Header>
          Choose room
        </Modal.Header>
        <Modal.Content>
          <Divider horizontal>connect to room</Divider>
          {(_ => {return this.dataReady ? this.createRoomList() : <p>...Spinner</p> })()}
          <Divider horizontal>or create room</Divider>
          <Input fluid type='text' value={this.props.name} placeholder='Name of room...' onChange={e => this.props.changeData('name', e.target.value)} />
          <Button color='green' fluid onClick={this.createRoom}>Create Room</Button>
        </Modal.Content>
      </Modal>
    );
  };
};

export default connect(
  state => ({
    rooms: state.data.rooms,
    name: state.data.name,
    mainUser: state.register.user,
    field: state.game.field
  }),
  {changeData, setMode}
)(Online);
