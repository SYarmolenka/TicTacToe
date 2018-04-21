import React, {Component} from 'react';
import {HeaderApp} from '../header/headerApp';
import './style.css';
import image from './tictactoe.png';
import {FlyButton} from '../flyButton/flyButton';
import {connect} from 'react-redux';
import {setMode} from '../../actions/game';
import CornerMenu from './cornerMenu/cornerMenu';
import Register from '../modals/modalRegister';
import Online from '../modals/modalOnline';
import {openModal} from '../../actions/menu';
import local from '../../game/local';

class MainMenu extends Component {
  clearStorage () {
    // local('tictactoe', {});
    local('tictactoe_history', {});
  }
  eventClick = (mode) => {
    switch (mode) {
      case 'PL_AI':
        this.clearStorage();
        window.location.hash = 'modalpa';
        break;
      case 'AI_AI':
        this.clearStorage();
        this.props.setMode('AI1', 'X');
        this.props.setMode('AI2', 'O');
        this.props.setMode('level', 'hard');
        window.location.hash = 'game';
        break;
      case 'PL_PL':
        this.clearStorage();
        window.location.hash = 'modalpp';
        break;
      case 'ONLINE':
        this.clearStorage();
        this.props.user ? this.props.openModal('online', true) : alert(`Please SignIn for continue!`);
        break;
      case 'Sign':
        this.props.openModal('register', true);
        break;
    };
  };
  render () {
    return (
      <div className='wrapperMenu'>
        <CornerMenu position='up-left' />
        <CornerMenu user={this.props.user} position='up-right' click2={_ => this.eventClick('Sign')}/>
        <CornerMenu position='down-left' />
        <CornerMenu position='down-right' />
        <div className='flyButtons'>
          <FlyButton cb={_ => this.eventClick('PL_AI')} name='With AI' initPosition={{top: 100, left: 100}} timing='.20, 0, .80, 1' />
          <FlyButton cb={_ => this.eventClick('PL_PL')} name='With Player' initPosition={{top: 100, left: 300}} timing='.40, .05 .40, .95' />
          <FlyButton cb={_ => this.eventClick('AI_AI')} name='AI & AI' initPosition={{top: 100, left: 500}} timing='.60, .10, .40, .90' />
          <FlyButton cb={_ => this.eventClick('ONLINE')} name='Network' initPosition={{top: 100, left: 700}} timing='.30, .15, .70, .85' />
        </div>
        <Register open={this.props.openRegister} close={_ => this.props.openModal('register', false)} />
        <Online open={this.props.openOnline} close={_ => this.props.openModal('online', false)} />
      </div>
    )
  };
};

MainMenu = connect(
  state => ({
    user: state.register.user,
    openRegister: state.menu.register,
    openOnline: state.menu.online
  }),
  {setMode, openModal}
)(MainMenu);

export {MainMenu};