import * as React from 'react';

import Guest from './components/Guest';
import Loading from './components/Loading';
import TaskLists from './components/TaskLists';
import gapi from './services/gapi';

interface State {
  isAuthenticated: boolean;
  isLoaded: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isLoaded: false,
    };

    this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    gapi.addAuthListener('root', this.authHandler);
    gapi.init();
  }

  componentWillUnmount() {
    gapi.removeAuthListener('root');
  }

  authHandler(isAuthenticated: boolean) {
    this.setState({
      isAuthenticated,
      isLoaded: true,
    });
  }

  render() {
    const { isAuthenticated, isLoaded } = this.state;

    if (isLoaded && isAuthenticated) {
      return <TaskLists />;
    }

    if (isLoaded && !isAuthenticated) {
      return <Guest />;
    }

    return <Loading />;
  }
}

export default App;
