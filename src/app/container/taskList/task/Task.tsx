import { Button } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import * as R from '../../../../routes';
import gapi from '../../../../services/gapi';
import { TaskListResource } from '../../../../services/gapi/TaskListResource';
import { TaskResource } from '../../../../services/gapi/TaskResource';

interface Props {
  onDelete: (id: string) => void;
  task: TaskResource;
  taskList: TaskListResource;
}

const Task = ({ onDelete, task, taskList }: Props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(R.toTask(taskList.id, task.id));
  };

  const handleDelete = () => {
    gapi.deleteTask(taskList.id, task.id)
      .then(() => onDelete(task.id));
  };

  return (
    <div>
      <i onClick={handleClick}>{task.title}</i>
      <Button onClick={handleDelete} variant="contained">Delete</Button>
    </div>
  );
};

export default Task;
