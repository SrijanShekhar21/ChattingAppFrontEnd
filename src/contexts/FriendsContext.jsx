import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const friendsContext = createContext();

const FriendsContextProvider = ({ children }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  const FriendsContextValue = useMemo(
    () => ({
      allFriends,
      setAllFriends,
      myFriends,
      setMyFriends,
      friendRequests,
      setFriendRequests,
      sentFriendRequests,
      setSentFriendRequests,
    }),
    [
      allFriends,
      setAllFriends,
      myFriends,
      setMyFriends,
      friendRequests,
      setFriendRequests,
      sentFriendRequests,
      setSentFriendRequests,
    ]
  );

  return (
    <friendsContext.Provider value={FriendsContextValue}>
      {children}
    </friendsContext.Provider>
  );
};

export const useFriends = () => {
  return useContext(friendsContext);
};

export default FriendsContextProvider;
