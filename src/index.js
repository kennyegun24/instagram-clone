import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatContextProvider } from './context/chatsContext';
import { AuthContextProvider } from './context/context';
import { UserContextProvider } from './context/searchUser';
import { DischargeContextProvider } from './context/discharge';
import { UpdateFollowing } from './context/updateFollow';
import { PostCountContextProvider } from './context/postsCounts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UserContextProvider>
        <DischargeContextProvider>
          <UpdateFollowing>
            <PostCountContextProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </PostCountContextProvider>
          </UpdateFollowing>
        </DischargeContextProvider>
      </UserContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

