import { Button } from '@material-ui/core';
import * as React from 'react';

import gapi from '../../services/gapi';

const Guest = () => {
  const handleClick = () => {
    gapi.signIn();
  };

  return <Button onClick={handleClick} variant="contained">Sign In</Button>;
};

export default Guest;
