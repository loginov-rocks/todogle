import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import useInput from '../../../../hooks/useInput';

import gapi from '../../../../services/gapi';
import { TaskResource } from '../../../../services/gapi/TaskResource';

interface Props {
  onCreate: (task: TaskResource) => void;
  taskListId: string;
}

const CreateTask = ({ onCreate, taskListId }: Props) => {
  const { value, bindProps, reset } = useInput('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    gapi.createTask(taskListId, { title: value })
      .then(task => {
        onCreate(task);
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField required {...bindProps} />
      <Button type="submit" variant="contained">Create Task</Button>
    </form>
  );
};

export default CreateTask;
