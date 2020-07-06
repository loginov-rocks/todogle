import * as React from 'react';

import CreateTaskList from './CreateTaskList';
import Loading from './Loading';
import gapi from '../services/gapi';
import { TaskListResource } from '../services/gapi/TaskListResource';
import SignOutButton from './SignOutButton';
import TaskList from './TaskList';

interface State {
  isFetched: boolean,
  taskLists: TaskListResource[],
}

export default class Dashboard extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isFetched: false,
      taskLists: [],
    };

    this.handleTaskListCreate = this.handleTaskListCreate.bind(this);
    this.handleTaskListDelete = this.handleTaskListDelete.bind(this);
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

  handleTaskListCreate(taskList: TaskListResource) {
    const { taskLists } = this.state;

    this.setState({
      taskLists: taskLists.concat([taskList]),
    });
  }

  handleTaskListDelete(taskListId: string) {
    const { taskLists } = this.state;

    this.setState({
      taskLists: taskLists.filter(taskList => taskList.id !== taskListId),
    });
  }

  render() {
    const { isFetched, taskLists } = this.state;

    return (
      <>
        <div>
          <SignOutButton />
        </div>

        {!isFetched && (
          <div>
            <Loading />
          </div>
        )}

        {isFetched && taskLists.map(taskList => (
          <TaskList
            key={taskList.id}
            onDelete={this.handleTaskListDelete}
            taskList={taskList}
          />
        ))}

        <div>
          <CreateTaskList onCreate={this.handleTaskListCreate} />
        </div>
      </>
    );
  }
}
