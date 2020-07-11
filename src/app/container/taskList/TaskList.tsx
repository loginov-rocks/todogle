import { Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';

import gapi from '../../../services/gapi';
import { TaskListResource } from '../../../services/gapi/TaskListResource';
import { TaskResource } from '../../../services/gapi/TaskResource';

import CreateTask from './createTask/CreateTask';
import Task from './task/Task';

interface Props {
  onDelete: (id: string) => void;
  taskList: TaskListResource;
}

const TaskList = ({ onDelete, taskList }: Props) => {
  const [areTasksLoaded, setAreTasksLoaded] = React.useState(false);
  const [tasks, setTasks] = React.useState<TaskResource[]>([]);

  React.useEffect(() => {
    setAreTasksLoaded(false);

    gapi.getTasks(taskList.id)
      .then(tasks => {
        setAreTasksLoaded(true);
        setTasks(tasks);
      });
  }, [taskList.id]);

  const handleDelete = () => {
    gapi.deleteTaskList(taskList.id)
      .then(() => onDelete(taskList.id));
  };

  const handleTaskCreate = (task: TaskResource) => {
    setTasks(tasks.concat([task]));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

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
