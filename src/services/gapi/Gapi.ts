import { TaskListCreateData, TaskListResource } from './TaskListResource';
import { TaskCreateData, TaskResource, TaskUpdateData } from './TaskResource';

// Array of API discovery doc URLs for APIs used by the quickstart.
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
];

// Authorization scopes required by the API; multiple scopes can be included,
// separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks';

type AuthHandler = (isAuthenticated: boolean) => void;

interface ConstructorOptions {
  apiKey: string;
  clientId: string;
}

/**
 * @see https://developers.google.com/tasks/v1/reference/tasks/list#parameters
 */
interface GetTasksOptions {
  /**
   * Flag indicating whether completed tasks are returned in the result.
   * Optional. The default is True.
   */
  showCompleted?: boolean;

  /**
   * Flag indicating whether deleted tasks are returned in the result. Optional.
   * The default is False.
   */
  showDeleted?: boolean;

  /**
   * Flag indicating whether hidden tasks are returned in the result. Optional.
   * The default is False.
   */
  showHidden?: boolean;
}

export default class Gapi {
  protected readonly apiKey: string;
  protected readonly clientId: string;
  protected readonly lib: any;

  protected authListeners: { [name: string]: AuthHandler } = {};

  constructor(lib: any, { apiKey, clientId }: ConstructorOptions) {
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.lib = lib;

    this.updateAuth = this.updateAuth.bind(this);
  }

  addAuthListener(name: string, callback: AuthHandler) {
    this.authListeners[name] = callback;
  }

  removeAuthListener(name: string) {
    delete this.authListeners[name];
  }

  getAuth() {
    return this.lib.auth2.getAuthInstance().isSignedIn.get();
  }

  updateAuth(isAuthenticated: boolean) {
    Object.values(this.authListeners).forEach(callback => {
      callback(isAuthenticated);
    });
  }

  signIn() {
    this.lib.auth2.getAuthInstance().signIn();
  }

  signOut() {
    this.lib.auth2.getAuthInstance().signOut();
  }

  init() {
    this.lib.load('client:auth2', async () => {
      await this.lib.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      // Listen for sign-in state changes.
      this.lib.auth2.getAuthInstance().isSignedIn.listen(this.updateAuth);

      // Handle the initial sign-in state.
      this.updateAuth(this.getAuth());
    });
  }

  /**
   * Returns all the authenticated user's task lists.
   * @see https://developers.google.com/tasks/v1/reference/tasklists/list
   */
  async getTaskLists(): Promise<TaskListResource[]> {
    const response = await this.lib.client.tasks.tasklists.list();

    return response.result.items || [];
  }

  /**
   * Creates a new task list and adds it to the authenticated user's task lists.
   * Fails with HTTP code 403 or 429 after reaching the storage limit of 2,000
   * lists.
   * @see https://developers.google.com/tasks/v1/reference/tasklists/insert
   */
  async createTaskList(data: TaskListCreateData): Promise<TaskListResource> {
    const response = await this.lib.client.tasks.tasklists.insert(data);

    return response.result;
  }

  /**
   * Deletes the authenticated user's specified task list.
   * @see https://developers.google.com/tasks/v1/reference/tasklists/delete
   */
  async deleteTaskList(taskListId: string): Promise<void> {
    await this.lib.client.tasks.tasklists.delete({ tasklist: taskListId });
  }

  /**
   * Returns all tasks in the specified task list.
   * @see https://developers.google.com/tasks/v1/reference/tasks/list
   */
  async getTasks(
    taskListId: string, options?: GetTasksOptions,
  ): Promise<TaskResource[]> {
    const response = await this.lib.client.tasks.tasks.list({
      ...options,
      tasklist: taskListId,
    });

    return response.result.items || [];
  }

  /**
   * Creates a new task on the specified task list. Fails with HTTP code 403 or
   * 429 after reaching the storage limit of 100,000 tasks per account.
   * @see https://developers.google.com/tasks/v1/reference/tasks/insert
   */
  async createTask(
    taskListId: string, data: TaskCreateData,
  ): Promise<TaskResource> {
    const response = await this.lib.client.tasks.tasks.insert({
      ...data,
      tasklist: taskListId,
    });

    return response.result;
  }

  /**
   * Updates the specified task. This method supports patch semantics.
   * @see https://developers.google.com/tasks/v1/reference/tasks/patch
   */
  async updateTask(
    taskListId: string, id: string, data: TaskUpdateData,
  ): Promise<TaskResource> {
    const response = await this.lib.client.tasks.tasks.patch({
      ...data,
      task: id,
      tasklist: taskListId,
    });

    return response.result;
  }

  /**
   * Deletes the specified task from the task list.
   * @see https://developers.google.com/tasks/v1/reference/tasks/delete
   */
  async deleteTask(taskListId: string, taskId: string): Promise<void> {
    await this.lib.client.tasks.tasks.delete({
      task: taskId,
      tasklist: taskListId,
    });
  }
}
