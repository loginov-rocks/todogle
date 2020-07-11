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

interface State {
  areTasksLoaded: boolean,
  tasks: TaskResource[];
}

export default class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      areTasksLoaded: false,
      tasks: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
  }

  componentDidMount() {
    this.updateTasks();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { taskList } = this.props;

    if (taskList.id !== prevProps.taskList.id) {
      this.setState({
        areTasksLoaded: false,
      });

      this.updateTasks();
    }
  }

  updateTasks() {
    const { taskList } = this.props;

    gapi.getTasks(taskList.id)
      .then(tasks => {
        this.setState({
          areTasksLoaded: true,
          tasks,
        });
      });
  }

  handleDelete() {
    const { onDelete, taskList } = this.props;

    gapi.deleteTaskList(taskList.id)
      .then(() => onDelete(taskList.id));
  }

  handleTaskCreate(task: TaskResource) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.concat([task]),
    });
  }

  handleTaskDelete(taskId: string) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.filter(task => task.id !== taskId),
    });
  }

  render() {
    const { taskList } = this.props;
    const { areTasksLoaded, tasks } = this.state;

    return (
      <>
        <b>{taskList.title}</b>
        <Button onClick={this.handleDelete} variant="contained">Delete</Button>

        {areTasksLoaded ? (
          <>
            <CreateTask
              onCreate={this.handleTaskCreate}
              taskListId={taskList.id}
            />

            {tasks.map(task => (
              <Task
                key={task.id}
                onDelete={this.handleTaskDelete}
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
  }
}
