import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import chatUserDP from "../../chatUserDP.jpg";
import { socket } from "../socket";
import { useFriends } from "../contexts/FriendsContext";
import { useChats } from "../contexts/chatsContext";

function ContactCard({ friend }) {
  const { user } = useUser();
  const { chattingWith, setChattingWith } = useUser();
  const { selContactMobile, setSelContactMobile } = useUser();
  const { setMyFriends } = useFriends();

  const userEmail = JSON.parse(user).email;
  const chattingWithEmail = chattingWith.friendemail;

  // setChattingWith(
  //   JSON.stringify({
  //     email: user1,
  //     name: user1name,
  //   })
  // );

  async function handleClick(clickedFriend) {
    console.log("Clicked on ", clickedFriend);
    setChattingWith(clickedFriend);
    setSelContactMobile(false);
  }

  return (
    <div
      style={{
        cursor: "pointer",
        //bg color yellow if selected
        backgroundColor: chattingWithEmail === friend.friendemail && "#e6e6e6",
      }}
      onClick={() => {
        handleClick(friend);
      }}
      //class contact to all and active to only active users
      className="contact"
    >
      <div className="imgDp">
        <img src={chatUserDP} alt="" />
        <div
          className={`activeDot ${
            friend.friendactive ? "active" : "notActive"
          }`}
        ></div>
      </div>

      <h3>
        {friend.friendname}
        {friend.typing && <span className="typing">Typing...</span>}
      </h3>
      <div className="underline"></div>
    </div>
  );
}

export default ContactCard;
