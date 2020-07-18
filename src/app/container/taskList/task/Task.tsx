import { Button, Checkbox } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import * as R from '../../../../routes';
import { TaskResource } from '../../../../services/gapi/TaskResource';
import { deleteTask, updateTask } from '../../../../store/actions';
import { useDispatch } from '../../../../store/dispatch';

interface Props {
  task: TaskResource;
  taskListId: string;
}

const Task = ({ task, taskListId }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCheckboxClick = async () => {
    await dispatch(updateTask(taskListId, task.id, {
      status: task.status === 'completed' ? 'needsAction' : 'completed',
    }));
  };

  const handleClick = () => {
    history.push(R.toTask(taskListId, task.id));
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(taskListId, task.id));
  };

  return (
    <div>
      <Checkbox
        checked={task.status === 'completed'}
        onClick={handleCheckboxClick}
      />
      <i onClick={handleClick}>{task.title}</i>
      <Button onClick={handleDelete} variant="contained">Delete</Button>
    </div>
  );
};

export default Task;
