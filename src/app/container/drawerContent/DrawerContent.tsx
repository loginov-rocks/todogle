import {
  CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText,
  ListSubheader, makeStyles,
} from '@material-ui/core';
import { Add, ExitToApp, Inbox } from '@material-ui/icons';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as R from '../../../routes';
import gapi from '../../../services/gapi';
import { getTaskListsLoaded } from '../../../store/selectors';

import TaskLists from './taskLists/TaskLists';

const useStyles = makeStyles(theme => ({
  toolbarMock: theme.mixins.toolbar,
}));

interface Props {
  onMenuItemClick?: () => void;
}

const DrawerContent = ({ onMenuItemClick }: Props) => {
  const history = useHistory();
  const taskListsLoaded = useSelector(getTaskListsLoaded);
  const dynamicStyles = useStyles();

  const handleHomeClick = () => {
    history.push(R.HOME);
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  };

  const handleCreateTaskListClick = () => {
    history.push(R.CREATE_TASK_LIST);
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  };

  const handleSignOutClick = () => {
    gapi.signOut();
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  };

  return (
    <>

      <div className={dynamicStyles.toolbarMock} />

      <Divider />

      <List dense>
        <ListItem button onClick={handleHomeClick}>
          <ListItemIcon><Inbox /></ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>

      <Divider />

      {taskListsLoaded ? (
        <>
          <List dense subheader={<ListSubheader>Task Lists</ListSubheader>}>
            <ListItem button onClick={handleCreateTaskListClick}>
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText primary="Create New" />
            </ListItem>
            <TaskLists onTaskListClick={onMenuItemClick} />
          </List>
        </>
      ) : (
        <CircularProgress />
      )}

      <Divider />

      <List dense>
        <ListItem button onClick={handleSignOutClick}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>

    </>
  );
};

export default DrawerContent;
