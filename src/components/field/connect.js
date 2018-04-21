import React from 'react';
import {Header, Modal, Button, Icon, List, Image} from 'semantic-ui-react';

const Connect = (props) => {
  const {
    rooms,
    user
  } = props;
  if (rooms && user && rooms[user].connect) {
    return (
      <Modal open={rooms[user].connect.length > 0} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          The user want to connect to your game!
          {(_ => {
            return rooms[user].connect.map((elem, i) => {
              return (<List.Item key={i} onClick={e => this.connectUser(e.target)}>
                <Image avatar src={rooms[user].photo} />
                <List.Content>
                  <List.Header>{rooms[user].name}</List.Header>
                </List.Content>
              </List.Item>);
            });
          })()}
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.denied}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
  return null;
};

export default Connect;
