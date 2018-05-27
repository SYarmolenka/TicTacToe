import React, {Component} from 'react';
import {Dimmer, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

class GameOver extends Component {
  render () {
    return (
      <Dimmer active={true} onClickOutside={this.handleClose} page>
        <div>Winner: {this.props.currentFigure}</div>
        <div>Steps: {this.props.step}</div>
        <Button>Main Menu</Button>
        <Button>Watch The Game</Button>
        <Button>Winners</Button>
      </Dimmer>
    );
  };
};

export default connect(
  state => ({
    currentFigure: state.game.currentFigure,
    step: state.mode_game.step
  }),
  dispatch => ({})
)(GameOver);
