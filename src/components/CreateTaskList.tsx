import * as React from 'react';

import gapi from '../services/gapi';
import { TaskListResource } from '../services/gapi/TaskListResource';

interface Props {
  onCreate: (taskList: TaskListResource) => void;
}

interface State {
  title: string;
}

export default class CreateTaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const { onCreate } = this.props;
    const { title } = this.state;

    gapi.createTaskList({ title })
      .then(taskList => {
        onCreate(taskList);
        this.setState({ title: '' });
      });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={title} />
        <button type="submit">Create Task List</button>
      </form>
    );
  }
}
