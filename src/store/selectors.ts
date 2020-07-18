import { State } from './State';

export const getTaskLists = (state: State) => state.taskLists;

export const getTaskListsLoaded = (state: State) => state.taskListsLoaded;

export const getTaskList = (id: string) => (state: State) => getTaskLists(state)
  .find(taskList => taskList.id === id);
