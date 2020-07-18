import { State } from './State';

export const getTaskLists = (
  state: State,
) => state.taskLists;

export const getTaskListsArray = (
  state: State,
) => Object.values(getTaskLists(state));

export const getTaskListsLoaded = (
  state: State,
) => state.taskListsLoaded;

export const getTaskList = (id: string) => (
  state: State,
) => getTaskLists(state)[id];

export const getTasks = (taskListId: string) => (
  state: State,
) => state.tasks[taskListId] || {};

export const getTasksArray = (taskListId: string) => (
  state: State,
) => Object.values(getTasks(taskListId)(state));

export const getTasksLoaded = (taskListId: string) => (
  state: State,
) => state.tasksLoaded[taskListId];

export const getTask = (taskListId: string, id: string) => (
  state: State,
) => getTasks(taskListId)(state)[id];
