import { TaskListResource } from '../services/gapi/TaskListResource';
import { TaskResource } from '../services/gapi/TaskResource';

export interface State {
  readonly taskLists: Readonly<{
    [taskListId: string]: TaskListResource
  }>;

  readonly taskListsLoaded: boolean;

  readonly tasks: Readonly<{
    [taskListId: string]: Readonly<{
      [taskId: string]: TaskResource;
    }>;
  }>;

  readonly tasksLoaded: Readonly<{
    [taskListId: string]: boolean;
  }>;
}
