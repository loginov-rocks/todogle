import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import useInput from '../../../../hooks/useInput';
import { createTask } from '../../../../store/actions';
import { useDispatch } from '../../../../store/dispatch';

interface Props {
  taskListId: string;
}

const CreateTask = ({ taskListId }: Props) => {
  const dispatch = useDispatch();
  const { value, bindProps, reset } = useInput('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await dispatch(createTask(taskListId, { title: value }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField required {...bindProps} />
      <Button type="submit" variant="contained">Create Task</Button>
    </form>
  );
};

export default CreateTask;
