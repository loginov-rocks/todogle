/**
 * @see https://developers.google.com/tasks/v1/reference/tasklists
 */
export interface TaskListResource {
  /**
   * Type of the resource. This is always "tasks#taskList".
   */
  kind: 'tasks#taskList';

  /**
   * Task list identifier.
   */
  id: string;

  /**
   * ETag of the resource.
   */
  etag: string;

  /**
   * Title of the task list.
   */
  title: string;

  /**
   * URL pointing to this task list. Used to retrieve, update, or delete this
   * task list.
   */
  selfLink: string;

  /**
   * Last modification time of the task list (as a RFC 3339 timestamp).
   */
  updated: string;
}

export interface TaskListCreateData {
  title: string;
}
