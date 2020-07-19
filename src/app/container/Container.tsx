import {
  AppBar, Drawer, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as R from '../../routes';
import { fetchTaskLists } from '../../store/actions';
import { useDispatch } from '../../store/dispatch';

import CreateTaskList from './createTaskList/CreateTaskList';
import DrawerContent from './drawerContent/DrawerContent';
import Home from './home/Home';
import Task from './task/Task';
import TaskList from './taskList/TaskList';

import styles from './Container.module.css';

const Container = () => {
  const dispatch = useDispatch();
  const [isOpenOnMobile, setIsOpenOnMobile] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchTaskLists());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setIsOpenOnMobile(!isOpenOnMobile);
  };

  return (
    <>

      <nav>

        <Drawer
          classes={{
            paper: styles.drawerPaper,
          }}
          className={styles.drawerMobile}
          onClose={handleDrawerToggle}
          open={isOpenOnMobile}
          variant="temporary"
        >
          <DrawerContent onMenuItemClick={handleDrawerToggle} />
        </Drawer>

        <Drawer
          classes={{
            paper: styles.drawerPaper,
          }}
          className={styles.drawerDesktop}
          open
          variant="permanent"
        >
          <DrawerContent />
        </Drawer>

      </nav>

      <div className={styles.wrapper}>

        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={styles.drawerToggle}
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <Typography component="h1" variant="h6">
              Todogle
            </Typography>
          </Toolbar>
        </AppBar>

        <main>
          <Switch>
            <Route path={R.CREATE_TASK_LIST}>
              <CreateTaskList />
            </Route>
            <Route path={R.TASK}>
              <Task />
            </Route>
            <Route path={R.TASK_LIST}>
              <TaskList />
            </Route>
            <Route path={R.HOME}>
              <Home />
            </Route>
          </Switch>
        </main>

      </div>

    </>
  );
};

export default Container;
