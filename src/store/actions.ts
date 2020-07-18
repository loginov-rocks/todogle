import { ThunkAction } from 'redux-thunk';

import gapi from '../services/gapi';
import {
  TaskListData, TaskListResource,
} from '../services/gapi/TaskListResource';
import { TaskData, TaskResource } from '../services/gapi/TaskResource';

import { Action } from './Action';
import {
  taskListCreated, taskListDeleted, taskListsFetched,
  taskCreated, taskDeleted, tasksFetched,
} from './actionCreators';
import { State } from './State';

export const fetchTaskLists = (): ThunkAction<Promise<TaskListResource[]>, State, unknown, Action> => async dispatch => {
  const taskLists = await gapi.getTaskLists();
  dispatch(taskListsFetched(taskLists));

  return taskLists;
};

export const createTaskList = (
  data: TaskListData,
): ThunkAction<Promise<TaskListResource>, State, unknown, Action> => async dispatch => {
  const taskList = await gapi.createTaskList(data);
  dispatch(taskListCreated(taskList));

  return taskList;
};

export const deleteTaskList = (
  id: string,
): ThunkAction<Promise<void>, State, unknown, Action> => async dispatch => {
  await gapi.deleteTaskList(id);
  dispatch(taskListDeleted(id));
};

export const fetchTasks = (
  taskListId: string,
): ThunkAction<Promise<TaskResource[]>, State, unknown, Action> => async dispatch => {
  const tasks = await gapi.getTasks(taskListId);
  dispatch(tasksFetched(taskListId, tasks));

  return tasks;
};

export const createTask = (
  taskListId: string, data: TaskData,
): ThunkAction<Promise<TaskResource>, State, unknown, Action> => async dispatch => {
  const task = await gapi.createTask(taskListId, data);
  dispatch(taskCreated(taskListId, task));

  return task;
};

export const deleteTask = (
  taskListId: string, id: string,
): ThunkAction<Promise<void>, State, unknown, Action> => async dispatch => {
  await gapi.deleteTask(taskListId, id);
  dispatch(taskDeleted(taskListId, id));
};
