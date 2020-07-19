import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

interface Props {
  drawerToggle?: JSX.Element;
}

const Home = ({ drawerToggle }: Props) => (
  <>

    <AppBar position="static">
      <Toolbar>
        {drawerToggle}
        <Typography component="h1" variant="h6">
          Inbox
        </Typography>
      </Toolbar>
    </AppBar>

    <main>
      Home
    </main>

  </>
);

export default Home;
