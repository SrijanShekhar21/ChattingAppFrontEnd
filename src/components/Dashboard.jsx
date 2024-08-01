import React from "react";
import ChatComponent from "./ChatComponent";
import UsersComponent from "./UsersComponent";
import UserDPTabComponent from "./UserDPTabComponent";
import { useUser } from "../contexts/UserContext";
import { Navigate } from "react-router";

function Dashboard() {
  const { user } = useUser();
  const { selContactMobile } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard">
      <div className={`dashLeft ${selContactMobile && "sideMenu"}`}>
        <UserDPTabComponent />
        <UsersComponent />
      </div>
      <div className={`dashRight ${!selContactMobile && "chatBar"}`}>
        <ChatComponent />
      </div>
    </div>
  );
}

export default Dashboard;
