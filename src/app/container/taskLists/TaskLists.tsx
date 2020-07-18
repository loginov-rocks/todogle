import {
  CircularProgress, List, ListItem, ListItemText,
} from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as R from '../../../routes';
import {
  getTaskListsArray, getTaskListsLoaded,
} from '../../../store/selectors';

const TaskLists = () => {
  const history = useHistory();
  const taskLists = useSelector(getTaskListsArray);
  const taskListsLoaded = useSelector(getTaskListsLoaded);

  if (!taskListsLoaded) {
    return <CircularProgress />;
  }

  return (
    <List>
      {taskLists.map(taskList => (
        <ListItem
          button
          key={taskList.id}
          onClick={() => history.push(R.toTaskList(taskList.id))}
        >
          <ListItemText primary={taskList.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskLists;
