import React, {Component} from 'react';
import {Modal, Input, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {change} from '../../actions/register';
import firebase from 'firebase';
import {openModal} from '../../actions/menu';
import defaultPhoto from '../../userPhoto/molly.png';

class Register extends Component {
  writeData (user) {
    firebase.database().ref('users/' + user.uid).set({
      name: this.props.name,
      email: user.email || this.props.email,
      online: false,
      photoURL: user.photoURL || defaultPhoto
    });
    this.props.change(`name`, '');
    this.props.change(`password`, '');
    this.props.close();
  };
  registerEmail = () => {
    const email = this.props.email;
    const password = this.props.password;
    const signIn = () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => this.writeData(user))
        .catch(function(error) {
          alert(`Mistake!
          Your name of email or password have mistake
          or
          The user with such email is already exist
          or
          You sign in with password, but you have already registered without the password early`
          );
      });
    };
    if (!this.props.name.trim()) return;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => this.writeData(user))
      .catch(signIn);
  };
  signInWithGoogle = () => {
    if (!this.props.name.trim()) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      this.writeData(result.user, result.user);
    }).catch(function(error) {
      alert(`Mistake!
      Your name of email or password have mistake
      or
      A user with such email is already exist
      or
      You sign in with password, but you have already registered without the password early`
      );
    });
  };
  signOut = () => {
    firebase.auth().signOut();
    this.props.close();
  };
  render () {
    return (
      <Modal size='mini' className='register' open={this.props.open} onClose={_ => {}}>
        <Modal.Header>
          Registration
        </Modal.Header>
        <Modal.Content>
          <Input fluid type='text' value={this.props.name} placeholder='Name...' onChange={e => this.props.change('name', e.target.value)} />
          <Divider horizontal></Divider>
          <Input fluid type='text' value={this.props.email} placeholder='E-mail...' onChange={e => this.props.change('email', e.target.value)} />
          <Input fluid type='password' value={this.props.password} placeholder='Password...' onChange={e => this.props.change('password', e.target.value)} />
          <Button fluid color='green' onClick={this.registerEmail}>Register/Sign In</Button>
          <Divider horizontal>Or</Divider>
          <Button color='green' fluid onClick={this.signInWithGoogle}>Sign in with Google+</Button>
          <Divider horizontal>Or</Divider>
          <Button color='red' fluid onClick={this.signOut}>SignOut</Button>
        </Modal.Content>
      </Modal>
    );
  };
};

export default connect(
  state => ({
    email: state.register.email,
    password: state.register.password,
    name: state.register.name,
    user: state.register.user
  }),
  {change}
)(Register);