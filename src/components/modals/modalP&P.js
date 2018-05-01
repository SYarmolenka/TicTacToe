import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimmer, Form, Divider, Label, Button, } from 'semantic-ui-react';
import {setMode} from '../../actions/game';
import './style.css';

class ModalPlPl extends Component {
  componentWillReceiveProps (props) {
    if (props.open) {
      this.props.setMode('player1', 'X');
      this.props.setMode('player2', 'O');
    };
  };
  startGame = () => {
    if (!this.props.name1 || !this.props.name2) return;
    window.location.hash = 'game';
  };
  closeModal = () => {
    this.props.setMode('player1', false);
    this.props.setMode('player2', false);
  };
  render () {
    return (
      <div>
        <Dimmer active={this.props.open} onClickOutside={this.props.close} page>
          <Form className='modalPP'>
            <Form.Field inline>
              <Label className='labelName' basic color='black' pointing='right'>First Player X:</Label>
              <input className='inputName' type='text' placeholder='First name...' onChange={(e) => this.props.setMode('names', [e.target.value, this.props.name2])} />
            </Form.Field>
            <Divider />
            <Form.Field inline>
              <Label className='labelName' basic color='black' pointing='right'>Second Player O:</Label>
              <input className='inputName' type='text' placeholder='Second name...' onChange={(e) => this.props.setMode('names', [this.props.name1, e.target.value])} />
            </Form.Field>
            <Button fluid size='big' color='green' onClick={this.startGame}>Play</Button>
          </Form>
        </Dimmer>
      </div>
    );
  };
};

export default connect(
  state => ({
    name1: state.game.names[0],
    name2: state.game.names[1],
  }),
  dispatch => ({
    setMode (...args) {dispatch(setMode(...args))}
  })
)(ModalPlPl);
