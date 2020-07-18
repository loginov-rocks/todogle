import { TaskListResource } from '../services/gapi/TaskListResource';
import { TaskResource } from '../services/gapi/TaskResource';

import { Action } from './Action';
import * as T from './types';

export const taskListsFetched = (taskLists: TaskListResource[]): Action => ({
  payload: taskLists,
  type: T.TASK_LISTS_FETCHED,
});

export const taskListCreated = (taskList: TaskListResource): Action => ({
  payload: taskList,
  type: T.TASK_LIST_CREATED,
});

export const taskListDeleted = (id: string): Action => ({
  payload: id,
  type: T.TASK_LIST_DELETED,
});

export const tasksFetched = (
  taskListId: string, tasks: TaskResource[]): Action => ({
  payload: {
    taskListId,
    tasks,
  },
  type: T.TASKS_FETCHED,
});

export const taskCreated = (
  taskListId: string, task: TaskResource): Action => ({
  payload: {
    taskListId,
    task,
  },
  type: T.TASK_CREATED,
});

export const taskDeleted = (taskListId: string, id: string): Action => ({
  payload: {
    taskListId,
    id,
  },
  type: T.TASK_DELETED,
});
