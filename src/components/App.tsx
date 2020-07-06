import * as React from 'react';

import Dashboard from './Dashboard';
import Guest from './Guest';
import Loading from './Loading';
import gapi from '../services/gapi';

interface State {
  isAuthenticated: boolean;
  isLoaded: boolean;
}

export default class App extends React.Component<{}, State> {
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
      return <Dashboard />;
    }

    if (isLoaded && !isAuthenticated) {
      return <Guest />;
    }

    return (
      <div>
        <Loading />
      </div>
    );
  }
}
