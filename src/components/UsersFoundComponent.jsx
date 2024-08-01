import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import AddContactCard from "./AddContactCard";
import { v4 as uuidv4 } from "uuid";
import { useFriends } from "../contexts/FriendsContext";

function UsersFoundComponent({ contacts }) {
  const uniqueId = uuidv4();

  return (
    <div className="contactsFoundDiv">
      {contacts.length > 0 ? (
        contacts.map((contact) => {
          return (
            <AddContactCard
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

export default UsersFoundComponent;
