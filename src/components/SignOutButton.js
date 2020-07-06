import React from 'react';

import gapi from '../services/gapi';

export default class SignOutButton extends React.Component {
  handleClick() {
    gapi.signOut();
  }

  render() {
    return <button onClick={this.handleClick}>Sign Out</button>;
  }
}
