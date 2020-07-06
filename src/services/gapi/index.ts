import Gapi from './Gapi';

// Client ID and API key from the Developer Console.
const CLIENT_ID = '884831595421-slf1p0ps96t0mm10c0pe6dtnsn4e0prf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD-cdKDxvXPvwxjf9HdfxF7K4ADxZt7JeA';

const gapi = new Gapi((window as any).gapi, {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
});

export default gapi;
