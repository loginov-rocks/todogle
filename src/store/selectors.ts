import { State } from './State';

export const getTaskLists = (state: State) => state.taskLists;

export const getTaskListsArray = (
  state: State,
) => Object.values(getTaskLists(state));

export const getTaskListsLoaded = (
  state: State,
) => state.taskListsLoaded;

export const getTaskList = (id: string) => (
  state: State,
) => getTaskLists(state)[id];
