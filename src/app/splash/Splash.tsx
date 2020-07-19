import { Box, CircularProgress } from '@material-ui/core';
import * as React from 'react';

import Logo from '../../components/logo/Logo';

import styles from './Splash.module.css';

const Splash = () => (
  <div className={styles.root}>
    <Box mb={3}>
      <Logo />
    </Box>
    <CircularProgress />
  </div>
);

export default Splash;
