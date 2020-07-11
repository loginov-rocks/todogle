import { CssBaseline } from '@material-ui/core';
import * as React from 'react';

import gapi from '../services/gapi';

import Container from './container/Container';
import Guest from './guest/Guest';
import Splash from './splash/Splash';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const authHandler = (result: boolean) => {
      setIsAuthenticated(result);
      setIsLoaded(true);
    };

    gapi.addAuthListener('root', authHandler);
    gapi.init();

    return () => {
      gapi.removeAuthListener('root');
    };
  }, []);

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
};

export default App;
