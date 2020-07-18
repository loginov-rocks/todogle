import { TaskListResource } from '../services/gapi/TaskListResource';
import { TaskResource } from '../services/gapi/TaskResource';

import * as T from './types';

interface TaskListsFetched {
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

interface TasksFetched {
  type: typeof T.TASKS_FETCHED;
  payload: {
    taskListId: string;
    tasks: TaskResource[];
  };
}

interface TaskCreated {
  type: typeof T.TASK_CREATED;
  payload: {
    taskListId: string;
    task: TaskResource;
  };
}

interface TaskDeleted {
  type: typeof T.TASK_DELETED;
  payload: {
    taskListId: string;
    id: string;
  }
}

export type Action =
  TaskListsFetched
  | TaskListCreated
  | TaskListDeleted
  | TasksFetched
  | TaskCreated
  | TaskDeleted;
