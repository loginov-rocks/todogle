import {
  addToCollection, convertArrayToCollection, deleteFromCollection,
} from '../utils/collections';

import { Action } from './Action';
import { State } from './State';
import * as T from './types';

const initialState: State = {
  taskLists: {},
  taskListsLoaded: false,
  tasks: {},
  tasksLoaded: {},
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case T.TASK_LISTS_FETCHED:
      return {
        ...state,
        taskLists: convertArrayToCollection(action.payload, 'id'),
        taskListsLoaded: true,
      };

    case T.TASK_LIST_CREATED:
      return {
        ...state,
        taskLists: addToCollection(state.taskLists, action.payload),
      };

    case T.TASK_LIST_DELETED:
      return {
        ...state,
        taskLists: deleteFromCollection(state.taskLists, action.payload),
      };

    case T.TASKS_FETCHED:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.taskListId]: convertArrayToCollection(
            action.payload.tasks, 'id'),
        },
        tasksLoaded: {
          ...state.tasksLoaded,
          [action.payload.taskListId]: true,
        },
      };

    case T.TASK_CREATED:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.taskListId]: addToCollection(
            state.tasks[action.payload.taskListId], action.payload.task),
        },
      };

    case T.TASK_DELETED:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.taskListId]: deleteFromCollection(
            state.tasks[action.payload.taskListId], action.payload.id),
        },
      };

    default:
      return state;
  }
}
