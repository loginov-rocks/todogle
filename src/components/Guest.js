import React from 'react';

import gapi from '../services/gapi';

export default class Guest extends React.Component {
  handleClick() {
    gapi.signIn();
  }

  render() {
    return <button onClick={this.handleClick}>Sign In</button>;
  }
}
