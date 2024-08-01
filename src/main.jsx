import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";
import ChatsContextProvider from "./contexts/chatsContext.jsx";
import FriendsContextProvider from "./contexts/FriendsContext.jsx";
import URLContextProvider from "./contexts/URLContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <URLContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FriendsContextProvider>
            <ChatsContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChatsContextProvider>
          </FriendsContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </URLContextProvider>
  </>
);
