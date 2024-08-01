import React from "react";
import AddFriendRequestCard from "./AddFriendRequestCard";
import { v4 as uuidv4 } from "uuid";

function FriendRequestsFoundComponent({ friends }) {
  const uniqueId = uuidv4();

  return (
    <div className="contactsFoundDiv">
      {friends.length > 0 ? (
        friends.map((contact) => {
          return (
            <AddFriendRequestCard
              key={`${uniqueId}-${Math.random() * 1e5}`}
              contact={contact}
            />
          );
        })
      ) : (
        <div className="contact">No users found</div>
      )}
    </div>
  );
}

export default FriendRequestsFoundComponent;
