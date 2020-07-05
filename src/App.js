import React from 'react';

import gapi from './services/gapi';

// Client ID and API key from the Developer Console.
const CLIENT_ID = '884831595421-slf1p0ps96t0mm10c0pe6dtnsn4e0prf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD-cdKDxvXPvwxjf9HdfxF7K4ADxZt7JeA';

// Array of API discovery doc URLs for APIs used by the quickstart.
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
];

// Authorization scopes required by the API; multiple scopes can be included,
// separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areTasksListsFetched: false,
      error: null,
      isAuthenticated: false,
      tasksLists: null,
    };

    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
  }

  /**
   * On load, called to load the auth2 library and API client library.
   */
  componentDidMount() {
    gapi.load('client:auth2', this.initClient);
  }

  /**
   * Initializes the API client library and sets up sign-in state listeners.
   */
  initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).
      then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).
      catch((error) => {
        this.setState({ error });
      });
  }

  /**
   * Called when the signed in status changes, to update the UI appropriately.
   * After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({ isAuthenticated: true });
      this.listTaskLists();
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  /**
   * Sign in the user upon button click.
   */
  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   * Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();

    this.setState({
      areTasksListsFetched: false,
      error: null,
      tasksLists: null,
    });
  }

  /**
   * Print task lists.
   */
  listTaskLists() {
    gapi.client.tasks.tasklists.list({
      'maxResults': 10,
    }).
      then((response) => {
        this.setState({
          areTasksListsFetched: true,
          error: null,
          tasksLists: response.result.items,
        });
      });
  }

  render() {
    const {
      areTasksListsFetched, error, isAuthenticated, tasksLists,
    } = this.state;

    return (
      <div>

        {isAuthenticated ?
          <button onClick={this.handleSignoutClick}>Sign Out</button> :
          <button onClick={this.handleAuthClick}>Authorize</button>}

        {error && (
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {areTasksListsFetched && (
          <pre>
            {JSON.stringify(tasksLists, null, 2)}
          </pre>
        )}

      </div>
    );
  }
}

export default App;
