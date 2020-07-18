import {
  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Add, ExitToApp, Inbox } from '@material-ui/icons';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import * as R from '../../routes';
import gapi from '../../services/gapi';
import { fetchTaskLists } from '../../store/actions';
import { useDispatch } from '../../store/dispatch';
import { getTaskListsLoaded } from '../../store/selectors';

import CreateTaskList from './createTaskList/CreateTaskList';
import Home from './home/Home';
import Task from './task/Task';
import TaskList from './taskList/TaskList';
import TaskLists from './taskLists/TaskLists';

import styles from './Container.module.css';

const Container = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const taskListsLoaded = useSelector(getTaskListsLoaded);

  React.useEffect(() => {
    dispatch(fetchTaskLists());
  }, [dispatch]);

  const handleHomeClick = () => {
    history.push(R.HOME);
  };

  const handleCreateTaskListClick = () => {
    history.push(R.CREATE_TASK_LIST);
  };

  const handleSignOutClick = () => {
    gapi.signOut();
  };

  return (
    <>
      <Drawer
        anchor="left"
        className={styles.drawer}
        classes={{
          paper: styles.drawerPaper,
        }}
        variant="permanent"
      >
        <List>
          <ListItem button onClick={handleHomeClick}>
            <ListItemIcon><Inbox /></ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
        <Divider />
        <TaskLists />
        {taskListsLoaded && (
          <List>
            <ListItem button onClick={handleCreateTaskListClick}>
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText primary="Create Task List" />
            </ListItem>
          </List>
        )}
        <Divider />
        <List>
          <ListItem button onClick={handleSignOutClick}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <main className={styles.main}>
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
    </>
  );
};

export default Container;
