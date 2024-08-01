import React, { useEffect, useState } from "react";
import chatUserDP from "../../chatUserDP.jpg";
import plus from "../assets/plus.png";
import check from "../assets/check.png";
import cross from "../assets/cross.png";
import { socket } from "../socket";
import { useUser } from "../contexts/UserContext";
import { useFriends } from "../contexts/FriendsContext";

function AddContactCard({ contact }) {
  const { user } = useUser();
  const { allFriends, setAllFriends } = useFriends();
  const [reqStatus, setReqStatus] = useState(contact.reqStatus);

  useEffect(() => {
    allFriends.map((friend) => {
      if (friend.friendemail === contact.email) {
        if (friend.status === 0) {
          contact.reqStatus = "alreadyFriends";
          setReqStatus("alreadyFriends");
        } else if (friend.status === 1) {
          contact.reqStatus = "tick/cross";
          setReqStatus("tick/cross");
        } else if (friend.status === 2) {
          contact.reqStatus = "requestSent";
          setReqStatus("requestSent");
        }
      }
    });
  }, []);

  // console.log("user: ", user);
  const userEmail = JSON.parse(user).email;
  const userName = JSON.parse(user).name;

  function acceptRequest() {
    console.log("accept request: ", contact);
    socket.emit("accept-friend-request", {
      useremail: userEmail,
      username: userName,
      friendemail: contact.email,
      friendname: contact.name,
    });
  }
  function rejectRequest() {
    console.log("reject request: ", contact);
  }
  function sendRequest() {
    // console.log("req send to: ", contact);
    setReqStatus("requestSent");
    socket.emit("send-friend-request", {
      useremail: userEmail,
      username: userName,
      friendemail: contact.email,
      friendname: contact.name,
    });
  }

  return (
    <div className="addContactCard">
      <div className="addContactCardImg">
        <img src={chatUserDP} alt="" />
      </div>

      <p className="addUserName">{contact.name}</p>
      <div className="addPlus">
        {reqStatus === "alreadyFriends" ? (
          <p>Already Friends</p>
        ) : reqStatus === "tick/cross" ? (
          <div className="tickCross">
            <img
              onClick={acceptRequest}
              src={check}
              className="check"
              alt="Accept"
            />
            <img
              onClick={rejectRequest}
              src={cross}
              className="cross"
              alt="Reject"
            />
          </div>
        ) : reqStatus === "requestSent" ? (
          <p>Request Sent</p>
        ) : (
          <img
            onClick={sendRequest}
            className="sendRequest"
            src={plus}
            alt="plus"
          />
        )}
      </div>
    </div>
  );
}

export default AddContactCard;
