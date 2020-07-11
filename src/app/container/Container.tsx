import {
  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import * as React from 'react';

import gapi from '../../services/gapi';
import { TaskListResource } from '../../services/gapi/TaskListResource';

import CreateTaskList from './createTaskList/CreateTaskList';
import TaskList from './taskList/TaskList';
import TaskLists from './taskLists/TaskLists';

import styles from './Container.module.css';

const Container = () => {
  const [areTaskListsLoaded, setAreTaskListsLoaded] = React.useState(false);
  const [taskLists, setTaskLists] = React.useState<TaskListResource[]>([]);
  const [selectedTaskListId, setSelectedTaskListId] = React.useState<string>(
    '');

  React.useEffect(() => {
    gapi.getTaskLists()
      .then(taskLists => {
        setAreTaskListsLoaded(true);
        setTaskLists(taskLists);
        if (taskLists.length > 0) {
          setSelectedTaskListId(taskLists[0].id);
        }
      });
  }, []);

  const handleTaskListCreate = (taskList: TaskListResource) => {
    setTaskLists(taskLists.concat([taskList]));
    setSelectedTaskListId(taskList.id);
  };

  const handleTaskListDelete = (taskListId: string) => {
    // TODO: Drop selectedTaskListId if it was deleted.
    setTaskLists(taskLists.filter(taskList => taskList.id !== taskListId));
  };

  const handleTaskListSelect = (taskListId: string) => {
    setSelectedTaskListId(taskListId);
  };

  const handleSignOutClick = () => {
    gapi.signOut();
  };

  const selectedTaskList = taskLists
    .find(taskList => taskList.id === selectedTaskListId);

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
        <TaskLists
          areLoaded={areTaskListsLoaded}
          onClick={handleTaskListSelect}
          taskLists={taskLists}
        />
        <Divider />
        <List>
          <ListItem button onClick={handleSignOutClick}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <main className={styles.main}>
        {selectedTaskList && (
          <>
            <TaskList
              taskList={selectedTaskList}
              onDelete={handleTaskListDelete}
            />
            <Divider />
          </>
        )}
        <CreateTaskList onCreate={handleTaskListCreate} />
      </main>
    </>
  );
};

export default Container;
