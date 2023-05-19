import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import BooksContextProvider from './contexts/BooksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <BooksContextProvider>
          <App />
        </BooksContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
