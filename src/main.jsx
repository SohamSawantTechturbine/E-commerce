import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
const domain = 'dev-3wbzf21r44b6in4r.us.auth0.com';
const clientId = 'Io0wG2IkEh5Te7Dl7RYNoLb1uLnh7oeu';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  </React.StrictMode>,
)
