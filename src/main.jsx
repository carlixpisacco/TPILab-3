import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/authentication/Authentication.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthenticationContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthenticationContextProvider>,
)
