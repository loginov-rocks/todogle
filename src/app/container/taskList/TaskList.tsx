import { Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import gapi from '../../../services/gapi';
import { TaskListResource } from '../../../services/gapi/TaskListResource';
import { TaskResource } from '../../../services/gapi/TaskResource';

import CreateTask from './createTask/CreateTask';
import Task from './task/Task';

interface Props {
  onDelete: (id: string) => void;
  taskLists: TaskListResource[];
}

const TaskList = ({ onDelete, taskLists }: Props) => {
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

  const handleDelete = () => {
    gapi.deleteTaskList(id)
      .then(() => onDelete(id));
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
