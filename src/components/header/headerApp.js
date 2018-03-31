import React, {Component} from 'react';
import {Header, Image, Button} from 'semantic-ui-react';
import './style.css';

export class HeaderApp extends Component {
  render () {
    return (
      <Header className='mainHead'>
        <div className='user'></div>
        <Button.Group className='buttonGroup'>
          <Button inverted basic size='huge' onClick={_ => window.location.hash = '/'}>Menu</Button>
          <Button inverted basic size='huge'>Winners</Button>
          <Button inverted basic size='huge' onClick={_ => window.location.hash = 'about'}>About</Button>
        </Button.Group>
        <div className='user'>
          <a href='/' color='white'>Sign In</a>
          {/* <Button>Sign In</Button> */}
          {/* <Button>Sign Out</Button> */}
          <Image className='ava' src='http://www.free-icons-download.net/images/user-icon-32327.png' size='mini' />
        </div>
      </Header>
    )
  }
};
