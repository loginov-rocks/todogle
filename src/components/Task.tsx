import * as React from 'react';

import gapi from '../services/gapi';
import { TaskListResource } from '../services/gapi/TaskListResource';
import { TaskResource } from '../services/gapi/TaskResource';

interface Props {
  onDelete: (id: string) => void;
  task: TaskResource;
  taskList: TaskListResource;
}

export default class Task extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { onDelete, task, taskList } = this.props;

    gapi.deleteTask(taskList.id, task.id)
      .then(() => onDelete(task.id));
  }

  render() {
    const { task } = this.props;

    return (
      <div>
        <i>{task.title}</i>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
