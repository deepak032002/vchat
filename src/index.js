import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from './VideoContext'
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
