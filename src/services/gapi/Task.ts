import TaskLink from './TaskLink';

export default interface Task {
  kind: 'tasks#task';
  id: string;
  etag: string;
  title: string;
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
