import React, {Component} from 'react';
import {Modal, Input, Button, Divider, List, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {change} from '../../actions/register';
import firebase from 'firebase';

class Online extends Component {
  constructor (props) {
    super(props)
    const database = firebase.database();
    // function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/').set([1,2,3,4,5,6,7]);
      firebase.database().once()
    // }
  }
  getData () {
    const database = firebase.database();
    return;
  }
  createRoomList () {
    return (
    <List selection verticalAlign='middle'>
      <List.Item>
        <Image avatar src='/assets/images/avatar/small/helen.jpg' />
        <List.Content>
          <List.Header>Helen</List.Header>
        </List.Content>
      </List.Item>
    </List>
    )
  };
  render () {
    return (
      <Modal size='mini' className='register' open={true} onClose={_ => {}}>
        <Modal.Header>
          Choose room
        </Modal.Header>
        <Modal.Content>
          <Divider horizontal>Connect to</Divider>
          {this.createRoomList()}
          <Button fluid color='green' onClick={this.registerEmail}>Refresh/Sign In</Button>
          <Divider horizontal>Or</Divider>
          <Input fluid type='text' value={this.props.name} placeholder='Name...' onChange={e => this.props.change('name', e.target.value)} />
          <Button color='red' fluid onClick={this.signInWithGoogle}>Sign in with Google+</Button>
        </Modal.Content>
      </Modal>
    );
  };
};


export default connect(
  state => ({
    email: state.register.email,
    password: state.register.password,
    name: state.register.name
  }),
  {change}
)(Online);