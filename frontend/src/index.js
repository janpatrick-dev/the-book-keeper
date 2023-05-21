import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import BooksContextProvider from './contexts/BooksContext';
import RedirectContextProvider from './contexts/RedirectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RedirectContextProvider>
          <BooksContextProvider>
            <App />
          </BooksContextProvider>
        </RedirectContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
