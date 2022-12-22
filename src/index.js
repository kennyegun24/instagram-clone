import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatContextProvider } from './context/chatsContext';
import { AuthContextProvider } from './context/context';
import { UserContextProvider } from './context/searchUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UserContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

