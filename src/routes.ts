export const HOME = '/';
export const CREATE_TASK_LIST = '/create-task-list';
export const TASK_LIST = '/task-list/:id';
export const TASK = '/task-list/:taskListId/task/:id';

export const toTaskList = (id: string) => `/task-list/${id}`;
export const toTask = (
  taskListId: string,
  id: string,
) => `/task-list/${taskListId}/task/${id}`;
