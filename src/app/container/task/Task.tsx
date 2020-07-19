import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

interface Props {
  drawerToggle?: JSX.Element;
}

const Task = ({ drawerToggle }: Props) => (
  <>

    <AppBar position="static">
      <Toolbar>
        {drawerToggle}
        <Typography component="h1" variant="h6">
          Task
        </Typography>
      </Toolbar>
    </AppBar>

    <main>
      Task
    </main>

  </>
);

export default Task;
