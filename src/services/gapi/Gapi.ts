import TaskList from './TaskList';

// Array of API discovery doc URLs for APIs used by the quickstart.
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
];

// Authorization scopes required by the API; multiple scopes can be included,
// separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly';

type AuthHandler = (isAuthenticated: boolean) => void;

interface ConstructorOptions {
  apiKey: string;
  clientId: string;
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

  /**
   * Called when the signed in status changes, to update the UI appropriately.
   * After a sign-in, the API is called.
   */
  updateAuth(isAuthenticated: boolean) {
    Object.values(this.authListeners).forEach(callback => {
      callback(isAuthenticated);
    });
  }

  /**
   * Sign in the user upon button click.
   */
  signIn() {
    this.lib.auth2.getAuthInstance().signIn();
  }

  /**
   * Sign out the user upon button click.
   */
  signOut() {
    this.lib.auth2.getAuthInstance().signOut();
  }

  /**
   * On load, called to load the auth2 library and API client library.
   * Initializes the API client library and sets up sign-in state listeners.
   */
  init() {
    this.lib.load('client:auth2', () => {
      this.lib.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
        .then(() => {
          // Listen for sign-in state changes.
          this.lib.auth2.getAuthInstance().isSignedIn.listen(this.updateAuth);

          // Handle the initial sign-in state.
          this.updateAuth(this.getAuth());
        });
    });
  }

  /**
   * Print task lists.
   */
  getTaskLists(): Promise<TaskList[]> {
    return this.lib.client.tasks.tasklists.list()
      .then((response: any) => response.result.items);
  }
}
