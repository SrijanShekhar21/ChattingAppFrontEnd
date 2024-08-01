import React, { useEffect, useState } from "react";
import chatUserDP from "../../chatUserDP.jpg";
import plus from "../assets/plus.png";
import check from "../assets/check.png";
import cross from "../assets/cross.png";
import { socket } from "../socket";
import { useUser } from "../contexts/UserContext";
import { useFriends } from "../contexts/FriendsContext";

function AddFriendRequestCard({ contact }) {
  const { user } = useUser();
  // console.log("user: ", user);
  const userEmail = JSON.parse(user).email;
  const userName = JSON.parse(user).name;

  function acceptRequest() {
    console.log("accept request: ", contact);
    socket.emit("accept-friend-request", {
      useremail: userEmail,
      username: userName,
      friendemail: contact.friendemail,
      friendname: contact.friendname,
    });
  }
  function rejectRequest() {
    console.log("reject request: ", contact);
  }

  return (
    <div className="addContactCard">
      <div className="addContactCardImg">
        <img src={chatUserDP} alt="" />
      </div>

      <p className="addUserName">{contact.friendname}</p>
      <div className="addPlus">
        <div className="tickCross">
          <img
            onClick={acceptRequest}
            className="check"
            src={check}
            alt="Accept"
          />
          <img
            onClick={rejectRequest}
            className="cross"
            src={cross}
            alt="Reject"
          />
        </div>
      </div>
    </div>
  );
}

export default AddFriendRequestCard;
