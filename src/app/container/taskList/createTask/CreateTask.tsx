import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

import gapi from '../../../../services/gapi';
import { TaskResource } from '../../../../services/gapi/TaskResource';

interface Props {
  onCreate: (task: TaskResource) => void;
  taskListId: string;
}

interface State {
  title: string;
}

export default class CreateTask extends React.Component<Props, State> {
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

    const { onCreate, taskListId } = this.props;
    const { title } = this.state;

    gapi.createTask(taskListId, { title })
      .then(task => {
        onCreate(task);
        this.setState({ title: '' });
      });
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField onChange={this.handleChange} required value={title} />
        <Button type="submit" variant="contained">Create Task</Button>
      </form>
    );
  }
}
