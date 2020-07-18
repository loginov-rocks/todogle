import { TaskListResource } from '../services/gapi/TaskListResource';

import * as T from './types';

interface TaskListFetched {
  type: typeof T.TASK_LISTS_FETCHED;
  payload: TaskListResource[];
}

interface TaskListCreated {
  type: typeof T.TASK_LIST_CREATED;
  payload: TaskListResource;
}

interface TaskListDeleted {
  type: typeof T.TASK_LIST_DELETED;
  payload: string;
}

export type Action = TaskListFetched | TaskListCreated | TaskListDeleted;
