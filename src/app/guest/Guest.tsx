import { Box, Button } from '@material-ui/core';
import * as React from 'react';

import Logo from '../../components/logo/Logo';
import gapi from '../../services/gapi';

import googleIcons from './google.svg';
import styles from './Guest.module.css';

const Guest = () => {
  const handleClick = () => {
    gapi.signIn();
  };

  return (
    <div className={styles.root}>
      <Box mb={3}>
        <Logo />
      </Box>
      <Button
        onClick={handleClick}
        size="large"
        startIcon={<img src={googleIcons} alt="Google" />}
        variant="outlined"
      >
        Sign In
      </Button>
    </div>
  );
};

export default Guest;
