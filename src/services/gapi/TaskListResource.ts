export interface TaskListData {
  title: string;
}

export interface TaskListResource extends TaskListData {
  kind: string;
  id: string;
  etag: string;
  updated: string;
  selfLink: string;
}
