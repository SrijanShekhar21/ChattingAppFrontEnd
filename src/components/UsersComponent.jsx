import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { socket } from "../socket";
import ContactCard from "./ContactCard";
import { useNavigate } from "react-router";
import DP from "../../DP.jpg";
import { useFriends } from "../contexts/FriendsContext";
import { useURL } from "../contexts/URLContext";
import { useChats } from "../contexts/chatsContext";

function UsersComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { setToken } = useAuth();
  const { myFriends, setMyFriends } = useFriends();
  const { chattingWith, setChattingWith } = useUser();

  const userName = JSON.parse(user).name;

  const [editName, setEditName] = useState(userName);
  const { editProfile, setEditProfile } = useUser();

  const userEmail = JSON.parse(user).email;

  //GET all active users from the server
  useEffect(() => {
    socket.on("active-users-updated", (user) => {
      console.log(user.email, " ", chattingWith.friendemail);
      //update myFriends according to user data
      setMyFriends((prev) => {
        return prev.map((friend) => {
          if (friend.friendemail === user.email) {
            return {
              ...friend,
              friendactive: user.active,
              lastseen: user.lastseen,
            };
          }
          return friend;
        });
      });

      //update chattingWith if the user is chatting with the active user
      if (user.email === chattingWith.friendemail) {
        console.log("updating chattingWith: ", user);
        setChattingWith((prev) => {
          return {
            ...prev,
            friendactive: user.active,
            lastseen: user.lastseen,
          };
        });
      }
    });
  }, [socket]);

  const { _URL } = useURL();

  async function handleSave() {
    try {
      const result = await axios.post(
        `${_URL}/editProfile?userEmail=${userEmail}&newName=${editName}`
      );
      console.log("Profile edited:", result.data);
      setUser(JSON.stringify(result.data));
      setEditProfile(false);
    } catch (error) {
      console.error("Error during saving:", error);
    }
  }

  function handleLogout() {
    console.log(userEmail, "disconnected");
    //get current time
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    console.log("time: ", time);
    socket.emit("user-disconnect", {
      email: userEmail,
      time: time,
    });
    socket.disconnect();
    setChattingWith({});
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("logged out");
    setEditProfile(false);
    navigate("/");
  }

  return (
    <div className="UsersComponentDiv">
      {editProfile && (
        <div className="editProfile">
          <h3>Edit Profile</h3>
          <img src={DP} alt="" />
          <label htmlFor="EditName" className="editNameLabel">
            Your name{"  "}
            <span
              style={{
                cursor: "pointer",
                color: "grey",
                filter: "grayscale(85%)",
              }}
            >
              ✏️
            </span>
          </label>
          <div className="inputEditDiv">
            <input
              onChange={(e) => {
                setEditName(e.target.value);
              }}
              value={editName}
              type="text"
              placeholder="Edit Name..."
              id="EditName"
            />
          </div>

          <div className="editButtonsDiv">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </div>
        </div>
      )}{" "}
      {
        <div className="UsersComponent">
          {myFriends.length > 0 ? (
            myFriends.map((friend) => {
              // console.log("Contact: ", contact);
              return (
                <ContactCard
                  key={`${friend.useremail}-${friend.friendemail}`}
                  friend={friend}
                />
              );
            })
          ) : (
            <div className="contact">You have no friends to talk with</div>
          )}
        </div>
      }
    </div>
  );
}

export default UsersComponent;
