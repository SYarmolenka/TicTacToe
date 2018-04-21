import firebase from 'firebase';


class OnlineGame {
  connectUsers (bool) {
    // if (bool) {

    // }
    firebase.database().ref('rooms/' + this.props.online).on('value', data => {
      (data.val() && data.val().conversation) ? this.props.changeData('conversation', true) : 0;
    });
  }
};
