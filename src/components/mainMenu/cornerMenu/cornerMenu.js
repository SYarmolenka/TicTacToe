import React from 'react';
import './style.css';
import {Icon, Image} from 'semantic-ui-react';
import defaultPhoto from '../../../userPhoto/rachel.png'
// import unknownUser from '../../../unknownUser.png';

const CornerMenu = (props) => {
  const {
    position,
    user
  } = props;
  return (
    <div className={`cornerMenu ${position}`}>
      <button><Icon size='big' name='list layout' /></button>
      <button><Icon loading size='big' name='setting' /></button>
      <button onClick={props.click2} >{(_ => {
        return user ? <Image size='mini' avatar src={user.photoURL || defaultPhoto} lowsrc={defaultPhoto} /> : <Icon size='big' name='add user' />
      })()}</button>
      <button><Icon size='big' name='info circle' /></button>
    </div>
  );
};

export default CornerMenu;
