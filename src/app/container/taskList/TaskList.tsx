import {
  AppBar, Button, CircularProgress, Toolbar, Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as R from '../../../routes';
import { deleteTaskList, fetchTasks } from '../../../store/actions';
import { useDispatch } from '../../../store/dispatch';
import {
  getTaskList, getTasksArray, getTasksLoaded,
} from '../../../store/selectors';

import CreateTask from './createTask/CreateTask';
import Task from './task/Task';

interface Props {
  drawerToggle?: JSX.Element;
}

const TaskList = ({ drawerToggle }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const taskList = useSelector(getTaskList(id));
  const tasks = useSelector(getTasksArray(id));
  const tasksLoaded = useSelector(getTasksLoaded(id));

  React.useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deleteTaskList(id));
    history.push(R.HOME);
  };

  if (!taskList) {
    return <strong>Not found</strong>;
  }

  return (
    <>

      <AppBar position="static">
        <Toolbar>
          {drawerToggle}
          <Typography component="h1" variant="h6">
            {taskList.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Button onClick={handleDelete} variant="contained">Delete</Button>

        {tasksLoaded ? (
          <>
            <CreateTask taskListId={id} />

            {tasks.map(task => (
              <Task key={task.id} task={task} taskListId={id} />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </main>

    </>
  );
};

export default TaskList;
