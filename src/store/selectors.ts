import { State } from './State';

export const getTaskLists = (state: State) => state.taskLists;

export const getTaskListsLoaded = (state: State) => state.taskListsLoaded;
