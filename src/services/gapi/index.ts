import Gapi from './Gapi';

const gapi = new Gapi((window as any).gapi, {
  apiKey: (process.env.REACT_APP_GAPI_API_KEY as string),
  clientId: (process.env.REACT_APP_GAPI_CLIENT_ID as string),
});

export default gapi;
