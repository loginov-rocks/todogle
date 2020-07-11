import { Button } from '@material-ui/core';
import * as React from 'react';

import gapi from '../../services/gapi';

export default class Guest extends React.Component {
  handleClick() {
    gapi.signIn();
  }

  render() {
    return (
      <Button onClick={this.handleClick} variant="contained">Sign In</Button>
    );
  }
}
