import { ThunkAction } from 'redux-thunk';

import gapi from '../services/gapi';
import {
  TaskListData, TaskListResource,
} from '../services/gapi/TaskListResource';

import { Action } from './Action';
import {
  taskListCreated, taskListDeleted, taskListsFetched,
} from './actionCreators';
import { State } from './State';

export const fetchTaskLists = (): ThunkAction<Promise<TaskListResource[]>, State, unknown, Action> => async dispatch => {
  const taskLists = await gapi.getTaskLists();
  dispatch(taskListsFetched(taskLists));

  return taskLists;
};

export const createTaskList = (data: TaskListData): ThunkAction<Promise<TaskListResource>, State, unknown, Action> => async dispatch => {
  const taskList = await gapi.createTaskList(data);
  dispatch(taskListCreated(taskList));

  return taskList;
};

export const deleteTaskList = (id: string): ThunkAction<Promise<void>, State, unknown, Action> => async dispatch => {
  await gapi.deleteTaskList(id);
  dispatch(taskListDeleted(id));
};
