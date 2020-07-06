import * as React from 'react';

import gapi from '../services/gapi';
import TaskList from '../services/gapi/TaskList';
import SignOutButton from './SignOutButton';

interface State {
  isFetched: boolean,
  taskLists: TaskList[],
}

export default class TaskLists extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isFetched: false,
      taskLists: [],
    };
  }

  componentDidMount() {
    gapi.getTaskLists()
      .then(taskLists => {
        this.setState({
          isFetched: true,
          taskLists,
        });
      });
  }

  render() {
    const { isFetched, taskLists } = this.state;

    return (
      <>
        <SignOutButton />
        {isFetched && (
          <pre>
            {JSON.stringify(taskLists, null, 2)}
          </pre>
        )}
      </>
    );
  }
}
