import React, {Component} from 'react';
// import {Header, Image, Button, Container} from 'semantic-ui-react';
import {HeaderApp} from '../header/headerApp';
import './style.css';
import image from './tictactoe.png';
import {FlyButton} from '../flyButton/flyButton';
import {connect} from 'react-redux';
import {setMode} from '../../actions/game';

class MainMenu extends Component {
  eventClick = (mode) => {
    if (mode === 'PL_AI') {
      window.location.hash = 'modalpa';
    };
    if (mode === 'AI_AI') {
      this.props.setMode('AI1', 'X');
      this.props.setMode('AI2', 'O');
      this.props.setMode('level', 'hard');
      window.location.hash = 'game';
    };
    if (mode === 'PL_PL') {
      window.location.hash = 'modalpp';
    };
  };
  render () {
    return (
      <div>
        <div>
          <FlyButton cb={_ => this.eventClick('PL_AI')} name='With AI' initPosition={{top: 100, left: 100}} timing='.20, 0, .80, 1' />
          <FlyButton cb={_ => this.eventClick('PL_PL')} name='With Player' initPosition={{top: 100, left: 300}} timing='.40, .05 .40, .95' />
          <FlyButton cb={_ => this.eventClick('AI_AI')} name='AI & AI' initPosition={{top: 100, left: 500}} timing='.60, .10, .40, .90' />
          <FlyButton name='Network' initPosition={{top: 100, left: 700}} timing='.30, .15, .70, .85' />
        </div>
      </div>
    )
  };
};

MainMenu = connect(
  state => ({}),
  dispatch => ({
    setMode (...args) {dispatch(setMode(...args))}
  })
)(MainMenu);

export {MainMenu};

//<HeaderApp />
        {/* <Image className='bigImage' src={image} width='80%' /> */}

//<Button basic className='menuButtons' color='teal' size='huge'>Player vs. AI</Button>
//          <Button basic className='menuButtons' color='teal' size='huge'>Player vs. Player on this device</Button>
//          <Button basic className='menuButtons' color='teal' size='huge'>Player vs. Player by the network</Button>
//          <Button basic className='menuButtons' color='teal' size='huge'>Great Battle (AI vs.AI)</Button>