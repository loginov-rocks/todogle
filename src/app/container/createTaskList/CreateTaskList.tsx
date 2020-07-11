import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import useInput from '../../../hooks/useInput';

import gapi from '../../../services/gapi';
import { TaskListResource } from '../../../services/gapi/TaskListResource';

interface Props {
  onCreate: (taskList: TaskListResource) => void;
}

const CreateTaskList = ({ onCreate }: Props) => {
  const { value, bindProps, reset } = useInput('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    gapi.createTaskList({ title: value })
      .then(taskList => {
        onCreate(taskList);
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField required {...bindProps} />
      <Button type="submit" variant="contained">Create Task List</Button>
    </form>
  );
};

export default CreateTaskList;
