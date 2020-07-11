import {
  Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import * as React from 'react';

import CreateTaskList from './CreateTaskList';
import './Dashboard.css';
import gapi from '../services/gapi';
import { TaskListResource } from '../services/gapi/TaskListResource';
import TaskList from './TaskList';
import TaskLists from './TaskLists';

interface State {
  areTaskListsLoaded: boolean,
  selectedTaskListId: string;
  taskLists: TaskListResource[],
}

export default class Dashboard extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      areTaskListsLoaded: false,
      selectedTaskListId: '',
      taskLists: [],
    };

    this.handleTaskListCreate = this.handleTaskListCreate.bind(this);
    this.handleTaskListDelete = this.handleTaskListDelete.bind(this);
    this.handleTaskListSelect = this.handleTaskListSelect.bind(this);
  }

  componentDidMount() {
    gapi.getTaskLists()
      .then(taskLists => {
        const selectedTaskListId = taskLists.length > 0 ? taskLists[0].id : '';

        this.setState({
          areTaskListsLoaded: true,
          selectedTaskListId,
          taskLists,
        });
      });
  }

  handleSignOutClick() {
    gapi.signOut();
  }

  handleTaskListCreate(taskList: TaskListResource) {
    const { taskLists } = this.state;

    this.setState({
      selectedTaskListId: taskList.id,
      taskLists: taskLists.concat([taskList]),
    });
  }

  handleTaskListDelete(taskListId: string) {
    // TODO: Drop selectedTaskListId if it was deleted.
    const { taskLists } = this.state;

    this.setState({
      taskLists: taskLists.filter(taskList => taskList.id !== taskListId),
    });
  }

  handleTaskListSelect(taskListId: string) {
    this.setState({
      selectedTaskListId: taskListId,
    });
  }

  render() {
    const { areTaskListsLoaded, selectedTaskListId, taskLists } = this.state;
    const selectedTaskList = taskLists
      .find(taskList => taskList.id === selectedTaskListId);

    return (
      <>
        <Drawer
          anchor="left"
          className="container__drawer"
          classes={{
            paper: 'container__drawer-paper',
          }}
          variant="permanent"
        >
          <TaskLists
            areLoaded={areTaskListsLoaded}
            onClick={this.handleTaskListSelect}
            taskLists={taskLists}
          />
          <Divider />
          <List>
            <ListItem button onClick={this.handleSignOutClick}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Drawer>
        <main className="container__main">
          {selectedTaskList && (
            <>
              <TaskList
                taskList={selectedTaskList}
                onDelete={this.handleTaskListDelete}
              />
              <Divider />
            </>
          )}
          <CreateTaskList onCreate={this.handleTaskListCreate} />
        </main>
      </>
    );
  }
}
