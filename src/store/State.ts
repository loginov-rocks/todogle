import { TaskListResource } from '../services/gapi/TaskListResource';

export interface State {
  readonly taskLists: ReadonlyArray<TaskListResource>;
  readonly taskListsLoaded: boolean;
}
