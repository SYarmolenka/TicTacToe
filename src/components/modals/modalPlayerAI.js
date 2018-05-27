import React, { Component } from "react";
import {Form, Checkbox, Button, Dimmer, Input, Divider} from "semantic-ui-react";
import {connect} from 'react-redux';
import './style.css';
import {setMode} from '../../actions/game';

class ModalPlayerAI extends Component {
  componentWillReceiveProps (props) {
    if (props.open && !props.player) {
      this.props.setMode('player1', 'X');
      this.props.setMode('AI1', 'O');
    };
    if (props.open && !props.level) {
      this.props.setMode('level', 'easy');
    };
  };
  startGame = () => {
    if (this.props.name) {
      window.location.hash = 'game';
    };
  };
  closeModal = () => {
    this.props.setMode('player1', false);
    this.props.setMode('AI1', false);
    this.props.setMode('level', false);
    this.props.close();
  }
  render() {
    return (
      <Dimmer active={this.props.open} onClickOutside={this.closeModal} page>
        <Form className='modalPlayerAI'>
          <Divider horizontal>Choose your figure</Divider>
          <Form.Field>
            <Checkbox
              className='modalCheckbox'
              label='X'
              radio
              name="checkboxRadioGroup"
              checked={this.props.player === 'X'}
              onChange={_ => {
                this.props.setMode('player1', 'X');
                this.props.setMode('AI1', 'O');
              }}
            />
            <Checkbox
              className='modalCheckbox'
              label='O'
              radio
              name="checkboxRadioGroup"
              checked={this.props.player === 'O'}
              onChange={_ => {
                this.props.setMode('player1', 'O');
                this.props.setMode('AI1', 'X');
              }}
            />
            <Divider horizontal>Enter your name</Divider>
            <Input className='inputName'
              type='text' size='big'
              placeholder='Player name..'
              onChange={(e) => this.props.setMode('names', [e.target.value,''])}/>
            <Divider horizontal>Choose level</Divider>
            <Checkbox
              className='modalCheckbox'
              radio
              label='Easy'
              name="checkboxRadioGroup"
              checked={this.props.level === 'easy'}
              onChange={_ => this.props.setMode('level', 'easy')}
            />
            <Checkbox
              className='modalCheckbox'
              radio
              label='Hard'
              name="checkboxRadioGroup"
              checked={this.props.level === 'hard'}
              onChange={_ => this.props.setMode('level', 'hard')}
            />
          </Form.Field>
          <Button fluid size='big' color='green' onClick={this.startGame}>Play</Button>
        </Form>
      </Dimmer>
    );
  };
};

export default connect(
  state => ({
    player: state.game.player1,
    level: state.game.level,
    name: state.game.names[0]
  }),
  dispatch => ({
    setMode (...args) { dispatch(setMode(...args)); }
  })
)(ModalPlayerAI);
