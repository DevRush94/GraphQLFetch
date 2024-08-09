import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApolloProvider from './ApolloProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
