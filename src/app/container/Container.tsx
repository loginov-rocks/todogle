import {
  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Add, ExitToApp, Inbox } from '@material-ui/icons';
import * as React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import * as R from '../../routes';
import gapi from '../../services/gapi';
import { TaskListResource } from '../../services/gapi/TaskListResource';

import CreateTaskList from './createTaskList/CreateTaskList';
import Home from './home/Home';
import Task from './task/Task';
import TaskList from './taskList/TaskList';
import TaskLists from './taskLists/TaskLists';

import styles from './Container.module.css';

const Container = () => {
  const [areTaskListsLoaded, setAreTaskListsLoaded] = React.useState(false);
  const [taskLists, setTaskLists] = React.useState<TaskListResource[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    gapi.getTaskLists()
      .then(taskLists => {
        setAreTaskListsLoaded(true);
        setTaskLists(taskLists);
      });
  }, []);

  const handleHomeClick = () => {
    history.push(R.HOME);
  };

  const handleCreateTaskListClick = () => {
    history.push(R.CREATE_TASK_LIST);
  };

  const handleSignOutClick = () => {
    gapi.signOut();
  };

  const handleTaskListCreate = (taskList: TaskListResource) => {
    setTaskLists(taskLists.concat([taskList]));
    history.push(R.toTaskList(taskList.id));
  };

  const handleTaskListDelete = (taskListId: string) => {
    // TODO: Navigate to another task list if current has been deleted.
    setTaskLists(taskLists.filter(taskList => taskList.id !== taskListId));
    handleHomeClick();
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
        <TaskLists areLoaded={areTaskListsLoaded} taskLists={taskLists} />
        {areTaskListsLoaded && (
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
            <CreateTaskList onCreate={handleTaskListCreate} />
          </Route>
          <Route path={R.TASK}>
            <Task />
          </Route>
          <Route path={R.TASK_LIST}>
            <TaskList taskLists={taskLists} onDelete={handleTaskListDelete} />
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
