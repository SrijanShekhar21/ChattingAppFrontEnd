import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import close from "../assets/close.png";
import { useFriends } from "../contexts/FriendsContext";
import { v4 as uuidv4 } from "uuid";
import UsersFoundComponent from "./UsersFoundComponent";
import FriendRequestsFoundComponent from "./FriendRequestsFoundComponent";
import { useChats } from "../contexts/chatsContext";

function FindUsers() {
  const uniqueId = uuidv4();
  const { user, contacts, setContacts } = useUser();
  const { chattingWith } = useUser();
  const { friends, setFriends } = useUser();
  const { findUsers, setFindUsers } = useUser();
  const [searchUser, setSearchUser] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [tabNumber, setTabNumber] = useState(0);
  const { myFriends, setMyFriends } = useFriends();
  const { friendRequests, setFriendRequests } = useFriends();
  const [filteredFriendReqs, setFilteredFriendReqs] = useState(friendRequests);
  const { sentFriendRequests, setSentFriendRequests } = useFriends();
  const { allFriends, setAllFriends } = useFriends();

  const userName = JSON.parse(user).name;
  const userEmail = JSON.parse(user).email;
  const chattingWithName = chattingWith.friendname;
  const chattingWithEmail = chattingWith.friendemail;
  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name &&
          contact.name.toLowerCase().includes(searchUser.toLowerCase())
      )
    );
    setFilteredFriendReqs(
      allFriends
        .filter((friend) => friend.status === 1)
        .filter(
          (contact) =>
            contact.friendname &&
            contact.friendname.toLowerCase().includes(searchUser.toLowerCase())
        )
    );
  }, [searchUser, allFriends, contacts]);

  return (
    <div className="findUsersDiv">
      <div className="closeFindUsers">
        <img
          onClick={() => {
            setFindUsers(false);
          }}
          src={close}
          alt="close"
        />
      </div>
      <div className="addFriendsTabs">
        <div
          onClick={() => {
            setTabNumber(0);
          }}
          style={
            tabNumber === 0
              ? {
                  borderBottom: "1px solid hsl(0, 0%, 0%)",
                }
              : null
          }
          className="addFriendEachTab"
        >
          Search Users
        </div>
        <div
          onClick={() => {
            setTabNumber(1);
          }}
          style={
            tabNumber === 1
              ? {
                  borderBottom: "1px solid hsl(0, 0%, 0%)",
                }
              : null
          }
          className="addFriendEachTab friendReqTab"
        >
          Friend Requests
          {allFriends.filter((friend) => friend.status === 1).length > 0 && (
            <p className="requestsLengthAddPlus">
              {allFriends.filter((friend) => friend.status === 1).length}
            </p>
          )}
        </div>
      </div>
      <div className="findUsersInput">
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setSearchUser(e.target.value);
          }}
          value={searchUser}
          type="text"
          placeholder="Search for users..."
        />
      </div>
      {tabNumber === 0 ? (
        <UsersFoundComponent contacts={filteredContacts} />
      ) : (
        <FriendRequestsFoundComponent friends={filteredFriendReqs} />
      )}
    </div>
  );
}

export default FindUsers;
