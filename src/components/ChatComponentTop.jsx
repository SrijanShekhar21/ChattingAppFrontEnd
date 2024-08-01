import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import backArrow from "../assets/left-arrow.png";
import chatUserDP from "../../chatUserDP.jpg";
import { useFriends } from "../contexts/FriendsContext";
import { useChats } from "../contexts/chatsContext";

function ChatComponentTop() {
  const { setSelContactMobile } = useUser();
  const { activeUsers } = useUser();
  const { user } = useUser();
  const { chattingWith } = useUser();
  const { typingUsers } = useUser();
  const { myFriends } = useFriends();

  // const chattingWithName = chattingWith.friendname;
  // const chattingWithEmail = chattingWith.friendemail;
  // const chattingWithActive = chattingWith.friendactive;

  const [chattingWithName, setChattingWithName] = useState(
    chattingWith.friendname
  );
  const [chattingWithEmail, setChattingWithEmail] = useState(
    chattingWith.friendemail
  );
  const [chattingWithActive, setChattingWithActive] = useState(
    chattingWith.friendactive
  );

  useEffect(() => {
    console.log("chattingWith comp top: ", chattingWith);
    setChattingWithName(chattingWith.friendname);
    setChattingWithEmail(chattingWith.friendemail);
    setChattingWithActive(chattingWith.friendactive);
  }, [chattingWith]);

  const userEmail = JSON.parse(user).email;

  return (
    <div className="chatComponentTop">
      <div className="imgDp">
        <img
          onClick={() => {
            setSelContactMobile(true);
          }}
          className="backArrow"
          src={backArrow}
          alt=""
        />
        <img className="chatUserDP" src={chatUserDP} alt="" />
        <div
          className={`activeDot ${
            activeUsers.find((user) => user.email === chattingWithEmail)
              ? "active"
              : "notActive"
          }`}
        ></div>
      </div>
      <div className="chattinWithNameDiv">
        <h3>{chattingWithName}</h3>
        {typingUsers.find((user) => user.email === chattingWithEmail) ? (
          <p className="isTyping">typing...</p>
        ) : chattingWith.friendactive ? (
          <p className="online">Online</p>
        ) : (
          <p className="offline">
            Last seen{" "}
            {myFriends.find(
              (friend) => friend.friendemail === chattingWithEmail
            ).lastseen || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatComponentTop;
