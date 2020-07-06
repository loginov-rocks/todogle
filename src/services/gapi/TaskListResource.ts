export interface TaskListData {
  title: string;
}

export interface TaskListResource extends TaskListData {
  kind: 'tasks#taskLis';
  id: string;
  etag: string;
  updated: string;
  selfLink: string;
}
