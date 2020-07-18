import { Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as R from '../../../routes';
import gapi from '../../../services/gapi';
import { TaskResource } from '../../../services/gapi/TaskResource';
import { deleteTaskList } from '../../../store/actions';
import { useDispatch } from '../../../store/dispatch';
import { getTaskLists } from '../../../store/selectors';

import CreateTask from './createTask/CreateTask';
import Task from './task/Task';

const TaskList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const taskLists = useSelector(getTaskLists);
  const [areTasksLoaded, setAreTasksLoaded] = React.useState(false);
  const [tasks, setTasks] = React.useState<TaskResource[]>([]);
  const { id } = useParams();

  React.useEffect(() => {
    setAreTasksLoaded(false);

    gapi.getTasks(id)
      .then(tasks => {
        setAreTasksLoaded(true);
        setTasks(tasks);
      });
  }, [id]);

  const handleDelete = async () => {
    await dispatch(deleteTaskList(id));
    history.push(R.HOME);
  };

  const handleTaskCreate = (task: TaskResource) => {
    setTasks(tasks.concat([task]));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const taskList = taskLists.find(taskList => taskList.id === id);

  if (!taskList) {
    return <strong>Not found</strong>;
  }

  return (
    <>
      <b>{taskList.title}</b>
      <Button onClick={handleDelete} variant="contained">Delete</Button>

      {areTasksLoaded ? (
        <>
          <CreateTask
            onCreate={handleTaskCreate}
            taskListId={taskList.id}
          />

          {tasks.map(task => (
            <Task
              key={task.id}
              onDelete={handleTaskDelete}
              task={task}
              taskList={taskList}
            />
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default TaskList;
