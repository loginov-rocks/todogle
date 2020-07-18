import { Action } from './Action';
import { State } from './State';
import * as T from './types';

const initialState: State = {
  taskLists: [],
  taskListsLoaded: false,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case T.TASK_LISTS_FETCHED:
      return {
        ...state,
        taskLists: action.payload,
        taskListsLoaded: true,
      };

    case T.TASK_LIST_CREATED:
      return {
        ...state,
        taskLists: [...state.taskLists, action.payload],
      };

    case T.TASK_LIST_DELETED:
      return {
        ...state,
        taskLists: state.taskLists
          .filter(taskList => taskList.id !== action.payload),
      };

    default:
      return state;
  }
}
