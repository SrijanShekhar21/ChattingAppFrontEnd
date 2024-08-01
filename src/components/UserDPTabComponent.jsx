import React, { useEffect, useReducer, useState } from "react";
import dp from "../../DP.jpg";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import addUser from "../assets/add-user.png";
import FindUsers from "./FindUsers";
import { socket } from "../socket";
import { useFriends } from "../contexts/FriendsContext";
import { useURL } from "../contexts/URLContext";

function UserDPTabComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { setToken } = useAuth();
  const { findUsers, setFindUsers } = useUser();
  const { contacts, setContacts } = useUser();
  const { myFriends, setMyFriends } = useFriends();
  const { friendRequests, setFriendRequests } = useFriends();
  const { sentFriendRequests, setSentFriendRequests } = useFriends();
  const { allFriends, setAllFriends } = useFriends();

  const userName = JSON.parse(user).name;
  const userEmail = JSON.parse(user).email;

  const { editProfile, setEditProfile } = useUser();

  function handleClick() {
    setEditProfile(!editProfile);
  }

  // const _URL = "https://chattingappbackend-zkbx.onrender.com";
  // const _URL = "http://localhost:3000";

  const { _URL } = useURL();

  //GET only accepted friends and friend requests of this user from server
  async function getFriends() {
    try {
      const response = await axios.get(`${_URL}/get-friends?email=${userEmail}`);
      // console.log("Contacts: ", response.data);
      setAllFriends(response.data);
      response.data &&
        setMyFriends(response.data.filter((friend) => friend.status === 0));
    } catch (error) {
      console.error("Error fetching friend requests: ", error);
    }
  }

  async function getContacts() {
    try {
      const response = await axios.get(
        `${_URL}/get-contacts?email=${userEmail}`
      );
      // console.log("Contacts: ", response.data);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    }
  }

  useEffect(() => {
    getFriends();
    getContacts();
  }, []);

  useEffect(() => {
    socket.on("send-friend-request", (request) => {
      console.log(("socket log: ", request));
      //update add this to allFriends
      setAllFriends((prev) => [...prev, ...request]);
    });
    socket.on("incoming-friend-request", (request) => {
      console.log(("socket log: ", request));
      //update add this to allFriends
      setAllFriends((prev) => [...prev, ...request]);
    });
    socket.on("friend-request-accepted", (request) => {
      setAllFriends(request);
      setMyFriends(request.filter((friend) => friend.status === 0));
    });
  }, [socket]);

  function handleFindUsers() {
    setFindUsers(true);
  }

  return (
    <div className="UserDPTabComponentDiv">
      <div className="UserDPTabComponent">
        <img
          className="userDPTopImg"
          style={{
            cursor: "pointer",
          }}
          onClick={handleClick}
          src={dp}
          alt="dp"
        />
        <div className="name">
          <p>Welcome</p>
          <h2>{userName}</h2>
        </div>
        <div className="addUsers">
          <img onClick={handleFindUsers} src={addUser} alt="addUsers" />
          {allFriends.filter((friend) => friend.status === 1).length > 0 && (
            <p className="requestsLength">
              {allFriends.filter((friend) => friend.status === 1).length}
            </p>
          )}
        </div>
      </div>
      {findUsers && (
        <div className="findUsersBlanket">
          <FindUsers />
        </div>
      )}
    </div>
  );
}

export default UserDPTabComponent;
