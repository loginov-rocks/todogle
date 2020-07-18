import { TaskListResource } from '../services/gapi/TaskListResource';

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
