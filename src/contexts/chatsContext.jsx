import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const chatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chattingWith, setChattingWith] = useState({});
  const [minimize, setMinimize] = useState(false);

  const ChatsContextValue = useMemo(
    () => ({
      messages,
      setMessages,
      minimize,
      setMinimize,
      chattingWith,
      setChattingWith,
    }),
    [
      messages,
      setMessages,
      minimize,
      setMinimize,
      chattingWith,
      setChattingWith,
    ]
  );

  return (
    <chatsContext.Provider value={ChatsContextValue}>
      {children}
    </chatsContext.Provider>
  );
};

export const useChats = () => {
  return useContext(chatsContext);
};

export default ChatsContextProvider;
