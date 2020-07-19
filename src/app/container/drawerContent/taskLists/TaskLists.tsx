import { ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as R from '../../../../routes';
import { getTaskListsArray } from '../../../../store/selectors';

interface Props {
  onTaskListClick?: () => void;
}

const TaskLists = ({ onTaskListClick }: Props) => {
  const history = useHistory();
  const taskLists = useSelector(getTaskListsArray);

  return (
    <>
      {taskLists.map(taskList => (
        <ListItem
          button
          key={taskList.id}
          onClick={() => {
            history.push(R.toTaskList(taskList.id));
            if (onTaskListClick) {
              onTaskListClick();
            }
          }}
        >
          <ListItemText primary={taskList.title} />
        </ListItem>
      ))}
    </>
  );
};

export default TaskLists;
