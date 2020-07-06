import * as React from 'react';

import CreateTask from './CreateTask';
import Loading from './Loading';
import gapi from '../services/gapi';
import { TaskListResource } from '../services/gapi/TaskListResource';
import { TaskResource } from '../services/gapi/TaskResource';
import Task from './Task';

interface Props {
  onDelete: (id: string) => void;
  taskList: TaskListResource;
}

interface State {
  isFetched: boolean,
  tasks: TaskResource[];
}

export default class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFetched: false,
      tasks: [],
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
  }

  componentDidMount() {
    const { taskList } = this.props;

    gapi.getTasks(taskList.id)
      .then(tasks => {
        this.setState({
          isFetched: true,
          tasks,
        });
      });
  }

  handleCreate(task: TaskResource) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.concat([task]),
    });
  }

  handleDelete() {
    const { onDelete, taskList } = this.props;

    gapi.deleteTaskList(taskList.id)
      .then(() => onDelete(taskList.id));
  }

  handleTaskDelete(taskId: string) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.filter(task => task.id !== taskId),
    });
  }

  render() {
    const { taskList } = this.props;
    const { isFetched, tasks } = this.state;

    return (
      <>
        <div>
          <b>{taskList.title}</b>
          <button onClick={this.handleDelete}>Delete</button>
        </div>

        {!isFetched && (
          <div>
            <Loading />
          </div>
        )}

        <div>
          <CreateTask onCreate={this.handleCreate} taskListId={taskList.id} />
        </div>

        {isFetched && tasks.map(task => (
          <Task
            key={task.id}
            onDelete={this.handleTaskDelete}
            task={task}
            taskList={taskList}
          />
        ))}
      </>
    );
  }
}
