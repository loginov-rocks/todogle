import React from 'react';

import gapi from '../services/gapi';
import SignOutButton from './SignOutButton';

export default class TaskLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetched: false,
      taskLists: null,
    };
  }

  componentDidMount() {
    gapi.getTaskLists()
      .then((taskLists) => {
        this.setState({
          isFetched: true,
          taskLists,
        });
      });
  }

  render() {
    const { isFetched, tasksLists } = this.state;

    return (
      <>
        <SignOutButton />
        {isFetched && (
          <pre>
            {JSON.stringify(tasksLists, null, 2)}
          </pre>
        )}
      </>
    );
  }
}
