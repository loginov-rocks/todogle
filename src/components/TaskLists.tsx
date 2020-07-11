import {
  CircularProgress, List, ListItem, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import { TaskListResource } from '../services/gapi/TaskListResource';

interface Props {
  areLoaded: boolean;
  onClick: (taskListId: string) => void;
  taskLists: TaskListResource[];
}

export default ({ areLoaded, onClick, taskLists }: Props) => {
  if (!areLoaded) {
    return <CircularProgress />;
  }

  return (
    <List>
      {taskLists.map(taskList => (
        <ListItem
          button
          key={taskList.id}
          onClick={() => onClick(taskList.id)}
        >
          <ListItemText primary={taskList.title} />
        </ListItem>
      ))}
    </List>
  );
}
