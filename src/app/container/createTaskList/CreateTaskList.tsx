import {
  AppBar, Button, TextField, Toolbar, Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import useInput from '../../../hooks/useInput';
import * as R from '../../../routes';
import { createTaskList } from '../../../store/actions';
import { useDispatch } from '../../../store/dispatch';

interface Props {
  drawerToggle?: JSX.Element;
}

const CreateTaskList = ({ drawerToggle }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { value, bindProps, reset } = useInput('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const taskList = await dispatch(createTaskList({ title: value }));
    reset();
    history.push(R.toTaskList(taskList.id));
  };

  return (
    <>

      <AppBar position="static">
        <Toolbar>
          {drawerToggle}
          <Typography component="h1" variant="h6">
            Create Task List
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <form onSubmit={handleSubmit}>
          <TextField required {...bindProps} />
          <Button type="submit" variant="contained">Create Task List</Button>
        </form>
      </main>

    </>
  );
};

export default CreateTaskList;
