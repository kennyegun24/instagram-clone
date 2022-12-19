import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatContextProvider } from './context/chatsContext';
import { AuthContextProvider } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);

