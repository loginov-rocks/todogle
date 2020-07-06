interface TaskLink {
  type: string;
  description: string;
  link: string;
}

export interface TaskData {
  title: string;
}

export interface TaskResource extends TaskData {
  kind: 'tasks#task';
  id: string;
  etag: string;
  updated: string;
  selfLink: string;
  parent: string;
  position: string;
  notes: string;
  status: string;
  due: string;
  completed: string;
  deleted: boolean;
  hidden: boolean;
  links: TaskLink[];
}
