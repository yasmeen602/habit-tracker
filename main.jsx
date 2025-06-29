
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // Optional: Custom CSS for your app

// Mount the React app into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
