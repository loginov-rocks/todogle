import { TaskListResource } from '../services/gapi/TaskListResource';

export interface State {
  readonly taskLists: Readonly<{ [id: string]: TaskListResource }>;
  readonly taskListsLoaded: boolean;
}
