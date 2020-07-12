import {
  CircularProgress, List, ListItem, ListItemText,
} from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import * as R from '../../../routes';
import { TaskListResource } from '../../../services/gapi/TaskListResource';

interface Props {
  areLoaded: boolean;
  taskLists: TaskListResource[];
}

const TaskLists = ({ areLoaded, taskLists }: Props) => {
  const history = useHistory();

  if (!areLoaded) {
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
