import { CssBaseline } from '@material-ui/core';
import * as React from 'react';

import gapi from '../services/gapi';

import Container from './container/Container';
import Guest from './guest/Guest';
import Splash from './splash/Splash';

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

    let component = null;

    if (isLoaded && isAuthenticated) {
      component = <Container />;
    } else if (isLoaded && !isAuthenticated) {
      component = <Guest />;
    } else {
      component = <Splash />;
    }

    return (
      <>
        <CssBaseline />
        {component}
      </>
    );
  }
}
